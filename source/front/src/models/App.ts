import { Stateful, action } from 'reactronic'
import { Tab } from './Tab'
import { HttpClient } from './HttpClient'
import { CustomersPage } from './CustomersPage'

export type PageName = 'CustomersListPage' | 'EditCustomerPage' | 'CustomerInfoPage'

export class App extends Stateful {
  httpClient = new HttpClient()
  tabs: Array<Tab>
  currentTab?: Tab
  currentPageName: PageName /* TO BE REPLACED with '*Page' models */
  customersPage: CustomersPage

  constructor() {
    super()
    this.tabs = new Array<Tab>(
      new Tab('customers', 'Customers', 'las la-address-book'),
      new Tab('deposits', 'Deposits', 'las la-percent'),
      new Tab('loans', 'Loans', 'las la-credit-card'),
      new Tab('atm', 'ATM', 'las la-money-check'),
    )
    this.currentTab = this.tabs[0]
    this.currentPageName = 'CustomersListPage'
    this.customersPage = new CustomersPage(this)
  }

  @action
  setCurrentTab(tab: Tab): void {
    this.currentTab = tab
  }

  @action
  setCurrentPageName(pageName: PageName): void {
    this.currentPageName = pageName
  }
}
