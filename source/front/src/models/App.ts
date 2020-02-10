import { Stateful, action, trigger } from 'reactronic'
import { Tab } from './Tab'
import { HttpClient } from './HttpClient'
import { Auxiliary } from './Auxiliary'
import { CustomersPage } from './customers/CustomersPage'
import { DepositsPage } from './deposits/DepositsPage'

export type PageName = 'CustomersListPage' | 'EditCustomerPage' | 'CustomerInfoPage' | 'DepositsListPage'
  | 'LoansListPage' | 'AtmPage'

export class App extends Stateful {
  httpClient = new HttpClient()
  auxiliary: Auxiliary
  tabs: Array<Tab>
  currentTab?: Tab
  // currentPageName: PageName /* TO BE REPLACED with '*Page' models */
  customersPage: CustomersPage
  depositsPage: DepositsPage

  constructor() {
    super()
    this.auxiliary = new Auxiliary()
    this.tabs = new Array<Tab>(
      new Tab('customers', 'Customers', 'CustomersListPage', 'las la-address-book'),
      new Tab('deposits', 'Deposits', 'DepositsListPage', 'las la-percent'),
      new Tab('loans', 'Loans', 'LoansListPage', 'las la-credit-card'),
      new Tab('atm', 'ATM', 'AtmPage', 'las la-money-check'),
    )
    this.currentTab = this.tabs[0]
    this.customersPage = new CustomersPage(this)
    this.depositsPage = new DepositsPage(this)
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

  @trigger
  obtainEssentialPageInfo(): void {
    switch (this.currentTab?.currentPage) {
      case 'CustomersListPage':
        this.customersPage.getAllCustomersInShortInfoModelRequest()
        break
      case 'DepositsListPage':
        this.depositsPage.getAllDepositsInShortInfoModelRequest()
        break
    }
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
