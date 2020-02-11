import { Stateful, action, trigger, isolated, cached } from 'reactronic'
import { App } from '../App'
import { DepositShortInfoModel, Deposit, DepositFullInfoModel, DepositDetails } from './Deposit'
import { DepositCreationPage } from './DepositCreationPage'
import { IInfoErrors } from '../Errors'

export class DepositsPage extends Stateful {
  app: App
  deposits: Array<Deposit>
  filteredDeposits: Array<Deposit>
  selectedDeposit?: Deposit
  depositDetailes?: DepositDetails
  depositCreationPage: DepositCreationPage

  filter = ''
  revokeIsRequested = false

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
    this.hoveredRowNumber = 0
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
  async obtainDepositsInShortInfoModel(): Promise<void> {
    const response = await this.app.httpClient.get<Array<DepositShortInfoModel>>(`https://localhost:5001/deposits`)
    if (response.successful && response.data) {
      const deposits = response.data.map(depositShortInfoModel => {
        const deposit = new Deposit(
          depositShortInfoModel.contractNumber,
          depositShortInfoModel.customer,
          depositShortInfoModel.programStartDate,
          depositShortInfoModel.programEndDate,
        )
        return deposit
      })
      deposits.forEach(nd => !this.deposits.some(d => d.contractNumber === nd.contractNumber) && this.deposits.push(nd))
    }
  }

  @action
  addNewDeposit(): void {
    this.depositCreationPage.createNewDeposit()
    this.app.currentTab?.setCurrentPageName('AddNewDepositPage')
  }

  @action
  showDepositDetails(deposit: Deposit): void {
    this.obtainDepositDetailsRequest(deposit.contractNumber)
    this.setSelectedDeposit(deposit)
    this.app.currentTab?.setCurrentPageName('DepositDetailsPage')
  }

  @trigger
  updateDepositDetails(): void {
    if (this.app.currentDate && this.depositDetailes) {
      this.obtainDepositDetailsRequest(this.depositDetailes.contractNumber)
    }
  }

  @action
  async obtainDepositDetailsRequest(contractNumber: string): Promise<void> {
    const response = await this.app.httpClient.get<DepositFullInfoModel>(`https://localhost:5001/deposits/${contractNumber}`)
    if (response.successful && response.data) {
      this.depositDetailes = new DepositDetails(
        response.data.isRevoked,
        response.data.depositTypeId,
        response.data.depositAccountNumber,
        response.data.contractNumber,
        response.data.programStartDate,
        response.data.programEndDate,
        response.data.validUntil,
        response.data.isCompleted,
        response.data.completedAt,
        response.data.rate,
        response.data.amount,
        response.data.currencyId,
        response.data.regularAccountNumber,
        response.data.customer,
        response.data.transactions,
      )
    }
  }

  @action
  async revokeDeposit(contractNumber: string): Promise<void> {
    const response = await this.app.httpClient.post<void, IInfoErrors>(`https://localhost:5001/deposits/${contractNumber}/revoke`)
    if (response.successful) {
      this.obtainDepositDetailsRequest(contractNumber)
    } else if (response.errorData) {
      console.log(response.errorData)
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
  dropDeleteRequest(): void {
    this.selectedDeposit /* Sensetivity list item */
    this.setRevokeIsRequested(false)
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
