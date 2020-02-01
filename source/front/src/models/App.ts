import { Stateful, action, trigger } from 'reactronic'
import { Customer, ICustomerShortInfo } from './entities/Customer'
import { CustomerInfo } from './CustomerInfo'

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
  async getAllCustomersInShortInfoModel(): Promise<void> {
    const customerFullNames = await fetch(`https://localhost:5001/customers`)
      .then(response => response.json()) as ICustomerShortInfo[]
    this.customers = customerFullNames.map(customerShortInfo => {
      const customer = new Customer()
      customer.setShortInfo(customerShortInfo)
      return customer
    })
  }
}
