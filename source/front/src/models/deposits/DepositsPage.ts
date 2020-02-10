import { Stateful, action, trigger, isolated, cached } from 'reactronic'
import { App } from '../App'
import { DepositShortInfoModel, Deposit } from './Deposit'
import { DepositCreationPage } from './DepositCreationPage'

export class DepositsPage extends Stateful {
  app: App
  deposits: Array<Deposit>
  filteredDeposits: Array<Deposit>
  selectedDeposit?: Deposit
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
    this.depositCreationPage = new DepositCreationPage(this)
  }

  @action
  setSelectedDeposit(deposit?: Deposit): void {
    this.selectedDeposit = deposit
    this.hoveredRowNumber = 0
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

  // @action
  // showCustomerInfo(customer: Customer): void {
  //   if (customer.id && !customer.isFullInfoModelLoaded) {
  //     customer.getFullInfoModel()
  //   }
  //   this.setSelectedCustomer(customer)
  //   this.app.setCurrentPageName('CustomerInfoPage')
  // }

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

  // @action
  // async editOrPublishCustomer(): Promise<void> {
  //   if (this.selectedCustomer) {
  //     if (this.selectedCustomer.id) {
  //       await this.editCustomerInfoRequest(this.selectedCustomer)
  //     } else {
  //       await this.publishNewCustomerRequest(this.selectedCustomer)
  //     }
  //     if (!this.selectedCustomer.infoErrors.hasAnyErrors) {
  //       this.app.setCurrentPageName('CustomersListPage')
  //     }
  //   }
  // }

  // @action
  // async deleteCustomerRequest(customer?: Customer): Promise<void> {
  //   if (customer) {
  //     if (customer.id) {
  //       const response = await this.app.httpClient.delete<any, ICustomerInfoErrors>(
  //         `https://localhost:5001/customers/${customer.id}`)
  //       if (response.successful) {
  //         customer.infoErrors.setHasErrors(false)
  //       } else if (!response.successful && response.errorData) {
  //         customer.infoErrors.initialize(response.errorData)
  //         customer.infoErrors.setHasErrors(true)
  //       }
  //     }
  //     const start = this.deposits.indexOf(customer)
  //     this.deposits.splice(start, 1)
  //     if (customer === this.selectedCustomer) {
  //       this.setSelectedCustomer(undefined)
  //     }
  //   }
  // }

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
