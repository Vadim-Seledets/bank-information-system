import { Stateful, action, trigger, isolated, cached } from 'reactronic'
import { App } from '../App'
import { DepositShortInfoModel, Deposit, DepositFullInfoModel, DepositDetails } from './Deposit'
import { DepositCreationPage } from './DepositCreationPage'
import { IApiErrors } from '../ApiErrors'

export class DepositsPage extends Stateful {
  app: App
  deposits: Array<Deposit>
  filteredDeposits: Array<Deposit>
  selectedDeposit?: Deposit
  depositDetailes?: DepositDetails
  depositCreationPage: DepositCreationPage

  filter = ''
  revokeIsRequested = false

  // Below properties are used for styling

  isRowWithCustomerHovered = false
  isGenderHovered = false
  isFullNameHovered = false
  isEmailHovered = false
  isActionsHovered = false
  hoveredRowNumber = 0

  constructor(app: App) {
    super()
    this.app = app
    this.deposits = new Array<Deposit>()
    this.filteredDeposits = this.deposits
    this.selectedDeposit = undefined
    this.depositDetailes = undefined
    this.depositCreationPage = new DepositCreationPage(this)
  }

  @action
  setSelectedDeposit(deposit?: Deposit): void {
    this.selectedDeposit = deposit
  }

  @action
  toggleDepositSelection(deposit: Deposit): void {
    if (this.selectedDeposit === deposit) {
      this.setSelectedDeposit(undefined)
    } else {
      this.setSelectedDeposit(deposit)
    }
  }

  @action
  setFilter(value: string): void {
    this.filter = value
  }

  @trigger
  makeFilteredDeposits(): void {
    const filter = this.filter
    this.filteredDeposits = this.deposits.filter(d => {
      const fullName = `${d.customer.firstName} ${d.customer.middleName} ${d.customer.lastName}`
      const startIndex = fullName.toLowerCase().indexOf(filter.toLowerCase())
      isolated(() => d.setHighlightingRange({ start: startIndex, length: filter.length }))
      return startIndex !== -1
    })
  }

  @action
  addNewDeposit(): void {
    this.depositCreationPage.createNewDeposit()
    this.app.currentTab?.setCurrentPageName('AddNewDepositPage')
  }

  @action
  showDepositDetails(deposit: Deposit): void {
    this.getDepositDetailsRequest(deposit.contractNumber)
    this.setSelectedDeposit(deposit)
    this.app.currentTab?.setCurrentPageName('DepositDetailsPage')
  }

  @trigger
  updateDepositDetails(): void {
    if (this.app.currentDate && this.depositDetailes) {
      this.getDepositDetailsRequest(this.depositDetailes.contractNumber)
    }
  }

  // Http requests

  @action
  async getAllDepositsInShortInfoModelRequest(): Promise<void> {
    const deposits = await this.app.httpClient.get<Array<DepositShortInfoModel>>(`https://localhost:5001/deposits`)
    if (deposits) {
      this.deposits = deposits.map(depositShortInfoModel => {
        const deposit = new Deposit(
          depositShortInfoModel.contractNumber,
          depositShortInfoModel.customer,
          depositShortInfoModel.programStartDate,
          depositShortInfoModel.programEndDate,
        )
        return deposit
      })
    }
  }

  @action
  async getDepositDetailsRequest(contractNumber: string): Promise<void> {
    const depositDetails = await this.app.httpClient.get<DepositFullInfoModel>(`https://localhost:5001/deposits/${contractNumber}`)
    if (depositDetails) {
      this.depositDetailes = new DepositDetails(
        depositDetails.isRevoked,
        depositDetails.depositTypeId,
        depositDetails.depositAccountNumber,
        depositDetails.contractNumber,
        depositDetails.programStartDate,
        depositDetails.programEndDate,
        depositDetails.validUntil,
        depositDetails.isCompleted,
        depositDetails.completedAt,
        depositDetails.rate,
        depositDetails.amount,
        depositDetails.currencyId,
        depositDetails.regularAccountNumber,
        depositDetails.customer,
        depositDetails.transactions,
      )
    }
  }

  @action
  async revokeDeposit(contractNumber: string): Promise<void> {
    const url = `https://localhost:5001/deposits/${contractNumber}/revoke`
    await this.app.httpClient.post(url)
    const errors = this.app.httpClient.getAndDeleteLastError<IApiErrors>('POST', url)
    if (errors) {
      console.log(errors)
    } else {
      this.getDepositDetailsRequest(contractNumber)
    }
  }

  // Below methods are used for styling

  @action
  setIsRowWithCustomerHovered(value: boolean, row: number): void {
    this.hoveredRowNumber = row
    this.isRowWithCustomerHovered = value
  }

  @action
  setIsGenderHovered(value: boolean, row: number): void {
    this.hoveredRowNumber = row
    this.isGenderHovered = value
  }

  @action
  setIsFullNameHovered(value: boolean, row: number): void {
    this.hoveredRowNumber = row
    this.isFullNameHovered = value
  }

  @action
  setIsEmailHovered(value: boolean, row: number): void {
    this.hoveredRowNumber = row
    this.isFullNameHovered = value
  }

  @action
  setIsActionsHovered(value: boolean, row: number): void {
    this.hoveredRowNumber = row
    this.isActionsHovered = value
  }

  @action
  setRevokeIsRequested(value: boolean): void {
    this.revokeIsRequested = value
  }

  @trigger
  dropDeleteRequestAndResetHoverRowNumber(): void {
    this.selectedDeposit /* Sensetivity list item */
    this.revokeIsRequested = false
    this.hoveredRowNumber = 0
  }

  isRowHovered(row: number): boolean {
    return (this.isRowWithCustomerHovered
      || this.isGenderHovered
      || this.isFullNameHovered
      || this.isEmailHovered
      || this.isActionsHovered
    ) && this.hoveredRowNumber === row
  }
}
