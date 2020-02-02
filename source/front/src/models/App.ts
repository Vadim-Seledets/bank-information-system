import { Stateful, action, trigger, cached } from 'reactronic'
import { Customer, ICustomerShortInfo } from './entities/Customer'
import { CustomerInfo } from './CustomerInfo'
import { Errors } from './Errors'

export class Tab extends Stateful{
  constructor(
    public caption: string,
    public icon: string) {
    super()
  }
}

export class App extends Stateful {
  customers: Array<Customer>
  selectedCustomer?: Customer
  tabs: Array<Tab>
  currentTab?: Tab
  customerInfo: CustomerInfo

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
      new Tab('Customers', 'las la-address-book'),
      new Tab('Deposits', 'las la-percent'),
      new Tab('Loans', 'las la-credit-card'),
      new Tab('ATM', 'las la-money-check'),
    )
    this.currentTab = this.tabs[0]
    this.customerInfo = new CustomerInfo(this)
  }

  @trigger
  init(): void {
    this.customerInfo.getAuxiliaryInfo()
    this.getAllCustomersInShortInfoModel()
  }

  @action
  setSelectedCustomer(customer?: Customer): void {
    this.selectedCustomer = customer
  }

  @action
  setCurrentTab(tab: Tab): void {
    this.currentTab = tab
  }

  @action
  addNewCustomer(): void {
    const newCustomer = new Customer()
    this.customers.push(newCustomer)
    this.selectedCustomer = newCustomer
  }

  @action
  async editOrPublishCustomer(): Promise<void> {
    if (this.selectedCustomer) {
      if (this.selectedCustomer.id) {
        await this.editCustomerInfo()
      } else {
        await this.publishNewCustomer()
      }
      if (this.selectedCustomer.errors === undefined) {
        this.setSelectedCustomer(undefined)
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
  async publishNewCustomer(): Promise<void> {
    const response = await fetch(`https://localhost:5001/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: this.selectedCustomer?.getJson(),
    })
    if (response.ok) {
      this.selectedCustomer?.setId(await response.text())
      this.selectedCustomer?.setErrors(undefined)
    } else {
      this.selectedCustomer?.setErrors(await response.json() as Errors)
    }
  }

  @action
  async editCustomerInfo(): Promise<void> {
    const response = await fetch(`https://localhost:5001/customers/${this.selectedCustomer?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: this.selectedCustomer?.getJson(),
    })
    if (response.ok) {
      this.selectedCustomer?.setErrors(undefined)
    } else {
      this.selectedCustomer?.setErrors(await response.json() as Errors)
    }
  }

  @action
  async deleteCustomer(customer: Customer): Promise<void> {
    if (customer.id) {
      const response = await fetch(`https://localhost:5001/customers/${customer.id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        customer.setErrors(undefined)
      } else {
        customer.setErrors(await response.json() as Errors)
      }
    } else {
      const start = this.customers.indexOf(customer)
      this.customers.splice(start, 1)
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

  isRowHovered(row: number): boolean {
    return (this.isRowWithCustomerHovered
      || this.isGenderHovered
      || this.isFullNameHovered
      || this.isEmailHovered
      || this.isActionsHovered
    ) && this.hoveredRowNumber === row
  }
}
