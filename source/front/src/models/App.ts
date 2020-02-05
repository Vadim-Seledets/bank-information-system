import { Stateful, action, trigger } from 'reactronic'
import { Customer, ICustomerShortInfo } from './entities/Customer'
import { CustomerInfo } from './CustomerInfo'
import { ICustomerInfoErrors } from './Errors'
import { Tab } from './Tab'

export type PageName = 'CustomersListPage' | 'EditCustomerPage'

export class App extends Stateful {
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
  addOrEditCustomer(): void {
    if (this.selectedCustomer) {
      if (!this.selectedCustomer.isFullInfoModelLoaded) {
        this.selectedCustomer.getFullInfoModel()
      }
    } else {
      const newCustomer = new Customer()
      this.customers.push(newCustomer)
      this.selectedCustomer = newCustomer
    }
    this.setCurrentPageName('EditCustomerPage')
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
    const customerFullNames = await fetch(`https://localhost:5001/customers`)
      .then(response => response.json()) as ICustomerShortInfo[]
    this.customers = customerFullNames.map(customerShortInfo => {
      const customer = new Customer()
      customer.setShortInfo(customerShortInfo)
      return customer
    })
  }

  @action
  async publishNewCustomer(customer: Customer): Promise<void> {
    const response = await fetch(`https://localhost:5001/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: customer.getJson(),
    })
    if (response.ok) {
      customer.setId(await response.text())
      customer.infoErrors.setHasErrors(false)
    } else {
      customer.infoErrors.initialize(await response.json() as ICustomerInfoErrors)
      customer.infoErrors.setHasErrors(true)
    }
  }

  @action
  async editCustomerInfo(customer: Customer): Promise<void> {
    const response = await fetch(`https://localhost:5001/customers/${customer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: customer.getJson(),
    })
    if (response.ok) {
      customer.infoErrors.setHasErrors(false)
    } else {
      customer.infoErrors.initialize(await response.json() as ICustomerInfoErrors)
      customer.infoErrors.setHasErrors(true)
    }
  }

  @action
  async deleteCustomer(customer?: Customer): Promise<void> {
    if (customer) {
      if (customer.id) {
        const response = await fetch(`https://localhost:5001/customers/${customer.id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          this.selectedCustomer?.infoErrors.setHasErrors(false)
        } else {
          this.selectedCustomer?.infoErrors.initialize(await response.json() as ICustomerInfoErrors)
          this.selectedCustomer?.infoErrors.setHasErrors(true)
        }
      } else {
        const start = this.customers.indexOf(customer)
        this.customers.splice(start, 1)
      }
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
