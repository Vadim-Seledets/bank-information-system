import { Stateful, action, trigger } from 'reactronic'
import { Tab } from './Tab'
import { HttpClient } from './HttpClient'
import { CustomersPage } from './customers/CustomersPage'
import { Auxiliary } from './Auxiliary'

export type PageName = 'CustomersListPage' | 'EditCustomerPage' | 'CustomerInfoPage'

export class App extends Stateful {
  httpClient = new HttpClient()
  tabs: Array<Tab>
  currentTab?: Tab
  currentPageName: PageName /* TO BE REPLACED with '*Page' models */
  customersPage: CustomersPage
  auxiliary: Auxiliary

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
    this.auxiliary = new Auxiliary()
  }

  @trigger
  init(): void {
    this.initializeBankAccounts()
    this.getAuxiliaryInfo()
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
  async initializeBankAccounts(): Promise<void> {
    await this.httpClient.get<void, void>(`https://localhost:5001/accounts/bank-funds/initialize`)
  }

  @action
  async getAuxiliaryInfo(): Promise<void> {
    const response = await this.httpClient.get<Auxiliary, void>(`https://localhost:5001/operations/auxiliary`)
    if (response.successful && response.data) {
      this.auxiliary = response.data
    }
  }
}
