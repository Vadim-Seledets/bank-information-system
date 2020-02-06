import { Stateful, action, trigger } from 'reactronic'
import { Customer, ICustomerShortInfo } from './entities/Customer'
import { CustomerInfo } from './CustomerInfo'
import { ICustomerInfoErrors } from './Errors'
import { Tab } from './Tab'
import { HttpClient } from './HttpClient'

export type PageName = 'CustomersListPage' | 'EditCustomerPage' | 'CustomerInfoPage'

export class App extends Stateful {
  httpClient = new HttpClient()
  customers: Array<Customer>
  selectedCustomer?: Customer
  tabs: Array<Tab>
  currentTab?: Tab
  customerInfo: CustomerInfo
  currentPageName: PageName

  deleteIsRequested = false
  
  isRowWithCustomerHovered = false
  isGenderHovered = false
  isFullNameHovered = false
  isEmailHovered = false
  isActionsHovered = false
  hoveredRowNumber = 0

  constructor() {
    super()
    this.customers = new Array<Customer>()
    this.selectedCustomer = undefined
    this.tabs = new Array<Tab>(
      new Tab('customers', 'Customers', 'las la-address-book'),
      new Tab('deposits', 'Deposits', 'las la-percent'),
      new Tab('loans', 'Loans', 'las la-credit-card'),
      new Tab('atm', 'ATM', 'las la-money-check'),
    )
    this.currentTab = this.tabs[0]
    this.customerInfo = new CustomerInfo(this)
    this.currentPageName = 'CustomersListPage'
  }

  @trigger
  init(): void {
    this.customerInfo.getAuxiliaryInfo()
    this.getAllCustomersInShortInfoModel()
  }

  @action
  setSelectedCustomer(customer?: Customer): void {
    this.selectedCustomer = customer
    this.hoveredRowNumber = 0
  }

  @action
  setCurrentTab(tab: Tab): void {
    this.currentTab = tab
  }

  @action
  setCurrentPageName(pageName: PageName): void {
    this.currentPageName = pageName
  }

  @action
  addNewCustomer(): void {
    const newCustomer = new Customer()
    this.customers.push(newCustomer)
    this.selectedCustomer = newCustomer
    this.setCurrentPageName('EditCustomerPage')
  }

  @action
  editCustomer(): void {
    if (this.selectedCustomer) {
      if (this.selectedCustomer.id && !this.selectedCustomer.isFullInfoModelLoaded) {
        this.selectedCustomer.getFullInfoModel()
      }
      this.setCurrentPageName('EditCustomerPage')
    }
  }

  @action
  async editOrPublishCustomer(): Promise<void> {
    if (this.selectedCustomer) {
      if (this.selectedCustomer.id) {
        await this.editCustomerInfo(this.selectedCustomer)
      } else {
        await this.publishNewCustomer(this.selectedCustomer)
      }
      if (!this.selectedCustomer.infoErrors.hasAnyErrors) {
        this.setCurrentPageName('CustomersListPage')
      }
    }
  }

  @action
  async getAllCustomersInShortInfoModel(): Promise<void> {
    const customersInfo = await this.httpClient.get<Array<ICustomerShortInfo>>(`https://localhost:5001/customers`)
    if (customersInfo.successful && customersInfo.data) {
      this.customers = this.customers.concat(
        customersInfo.data.map(customerShortInfo => {
          const customer = new Customer()
          customer.setShortInfo(customerShortInfo)
          return customer
        })
      )
    }
  }

  @action
  async publishNewCustomer(customer: Customer): Promise<void> {
    const response = await this.httpClient.post<string, ICustomerInfoErrors>(
      `https://localhost:5001/customers`, customer.getJson())
    if (response.successful && response.data) {
      customer.setId(response.data)
      customer.infoErrors.setHasErrors(false)
    } else if (!response.successful && response.errorData) {
      customer.infoErrors.initialize(response.errorData)
      customer.infoErrors.setHasErrors(true)
    }
  }

  @action
  async editCustomerInfo(customer: Customer): Promise<void> {
    const response = await this.httpClient.put<any, ICustomerInfoErrors>(
      `https://localhost:5001/customers/${customer.id}`, customer.getJson())
    if (response.successful) {
      customer.infoErrors.setHasErrors(false)
    } else if (!response.successful && response.errorData) {
      customer.infoErrors.initialize(response.errorData)
      customer.infoErrors.setHasErrors(true)
    }
  }

  @action
  async deleteCustomer(customer?: Customer): Promise<void> {
    if (customer) {
      if (customer.id) {
        const response = await this.httpClient.delete<any, ICustomerInfoErrors>(
          `https://localhost:5001/customers/${customer.id}`)
        if (response.successful) {
          customer.infoErrors.setHasErrors(false)
        } else if (!response.successful && response.errorData) {
          customer.infoErrors.initialize(response.errorData)
          customer.infoErrors.setHasErrors(true)
        }
      }
      const start = this.customers.indexOf(customer)
      this.customers.splice(start, 1)
      if (customer === this.selectedCustomer) {
        this.setSelectedCustomer(undefined)
      }
    }
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
  setDeleteIsRequested(value: boolean): void {
    this.deleteIsRequested = value
  }

  @trigger
  dropDeleteRequest(): void {
    this.selectedCustomer /* Sensetivity list item */
    this.setDeleteIsRequested(false)
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
