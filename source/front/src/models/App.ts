import { Stateful, action } from 'reactronic'
import { Api } from './Api'
import { CustomerInfo } from './CustomerInfo'

export class Tab extends Stateful{
  constructor(public caption: string) {
    super()
  }
}

export class App extends Stateful {
  api = new Api('https://localhost:5001')
  selectedCustomer?: {firstName: string, lastName: string} = undefined
  customers = new Array<{firstName: string, lastName: string}>(
    {firstName: 'Vadim', lastName: 'Seledets'},
    {firstName: 'Arseni', lastName: 'Rynkevich'},
    {firstName: 'Eguni', lastName: 'Dunin'},
    {firstName: 'Max', lastName: 'Rock'},
  )
  currentTab?: Tab = undefined
  tabs = new Array<Tab>(
    new Tab('Customers'),
    new Tab('Add a new customer'),
  )
  customerInfo = new CustomerInfo()

  constructor() {
    super()
  }

  @action
  setSelectedCustomer(customer: {firstName: string, lastName: string}): void {
    this.selectedCustomer = customer
  }

  @action
  setCurrentTab(tab: Tab): void {
    this.currentTab = tab
  }
}
