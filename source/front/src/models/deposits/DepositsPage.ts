import { Stateful, action, trigger, isolated } from 'reactronic'
import { App } from '../App'
import { ProgramContractShortInfoModel, Deposit, DepositFullInfoModel, DepositDetails } from './Deposit'
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
    const deposits = await this.app.httpClient.get<Array<ProgramContractShortInfoModel>>(`https://localhost:5001/deposits`)
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

  @action
  setRevokeIsRequested(value: boolean): void {
    this.revokeIsRequested = value
  }

  @trigger
  dropDeleteRequest(): void {
    this.selectedDeposit /* Sensetivity list item */
    this.revokeIsRequested = false
  }
}
