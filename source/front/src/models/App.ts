import { Stateful, action } from 'reactronic'
import { Api } from './Api'
import { CustomerInfo } from './CustomerInfo'
import { Customer } from './entities/Customer'

export class Tab extends Stateful{
  constructor(
    public caption: string,
    public icon: string) {
    super()
  }
}

export class App extends Stateful {
  api = new Api('https://localhost:5001')
  selectedCustomer?: {firstName: string} = undefined
  customers = new Array<{firstName: string}>({firstName: 'Vadim'})
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
  setSelectedCustomer(customer: {firstName: string}): void {
    this.selectedCustomer = customer
  }

  @action
  setCurrentTab(tab: Tab): void {
    this.currentTab = tab
  }
}
