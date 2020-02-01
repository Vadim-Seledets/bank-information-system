import { Stateful, action } from 'reactronic'
import { Api } from './Api'
import { CustomerInfo } from './CustomerInfo'
import { Customer, ICustomerFullName } from './entities/Customer'

export class Tab extends Stateful{
  constructor(
    public caption: string,
    public icon: string) {
    super()
  }
}

export class App extends Stateful {
  api = new Api('https://localhost:5001')
  selectedCustomer?: Customer = undefined
  customers = new Array<Customer>()
  tabs = new Array<Tab>(
    new Tab('Customers', 'las la-address-book'),
    new Tab('Deposits', 'las la-percent'),
    new Tab('Loans', 'las la-credit-card'),
    new Tab('ATM', 'las la-money-check'),
  )
  currentTab?: Tab = this.tabs[0]
  customerInfo = new CustomerInfo(this)

  constructor() {
    super()
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
  async getAllCustomersInShortInfoModel(): Promise<void> {
    const json = await fetch(`https://localhost:5001/customers`)
      .then(response => response.json())
    const customerFullNames = json as ICustomerFullName[]
    this.customers = customerFullNames.map(cfn => new Customer(cfn))
  }
}
