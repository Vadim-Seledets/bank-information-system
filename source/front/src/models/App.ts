import { Stateful, action, trigger, isolated, cached } from 'reactronic'
import { Tab } from './Tab'
import { HttpClient } from './HttpClient'
import { Auxiliary, CloseBankDayData } from './BankOperations'
import { CustomersPage } from './customers/CustomersPage'
import { DepositsPage } from './deposits/DepositsPage'

export type PageName = 'CustomersListPage' | 'EditCustomerPage' | 'CustomerInfoPage'
  | 'DepositsListPage' | 'AddNewDepositPage' | 'DepositDetailsPage'
  | 'LoansListPage' | 'AtmPage'

export class App extends Stateful {
  httpClient = new HttpClient()
  auxiliary: Auxiliary
  tabs: Array<Tab>
  currentTab?: Tab
  // currentPageName: PageName /* TO BE REPLACED with '*Page' models */
  customersPage: CustomersPage
  depositsPage: DepositsPage
  
  closeBankDayData: CloseBankDayData
  utcOffset: string
  currentDate: number

  constructor() {
    super()
    this.auxiliary = new Auxiliary()
    this.closeBankDayData = new CloseBankDayData(1)
    this.utcOffset = ''
    this.tabs = new Array<Tab>(
      new Tab('customers', 'Customers', 'CustomersListPage', 'las la-address-book'),
      new Tab('deposits', 'Deposits', 'DepositsListPage', 'las la-percent'),
      new Tab('loans', 'Loans', 'LoansListPage', 'las la-credit-card'),
      new Tab('atm', 'ATM', 'AtmPage', 'las la-money-check'),
    )
    this.currentTab = this.tabs[0]
    this.customersPage = new CustomersPage(this)
    this.depositsPage = new DepositsPage(this)
    this.currentDate = Date.now()
  }

  @trigger
  init(): void {
    setInterval(() => this.setCurrentDate(), 1000)
    this.initializeBankAccounts()
    this.getAuxiliaryInfo()
  }

  @action
  setCurrentTab(tab: Tab): void {
    this.currentTab = tab
  }

  @action
  setCurrentDate(): void {
    this.currentDate = Date.now()
  }

  getCurrentDate(): number {
    return this.currentDate
  }

  @trigger
  obtainEssentialPageInfo(): void {
    switch (this.currentTab?.currentPage) {
      case 'CustomersListPage':
        this.customersPage.obtainAllCustomersInShortInfoModel()
        break
      case 'DepositsListPage':
        this.depositsPage.obtainDepositsInShortInfoModel()
        break
    }
  }

  @action
  async initializeBankAccounts(): Promise<void> {
    await this.httpClient.get<void, void>(`https://localhost:5001/accounts/bank-funds/initialize`)
  }
  
  @action
  async closeBankDayRequst(): Promise<void> {
    await this.httpClient.post<CloseBankDayData, void>(`https://localhost:5001/operations/commit`, JSON.stringify(this.closeBankDayData))
  }
  
  @action
  async obtainUtcOffsetRequest(): Promise<void> {
    const response = await this.httpClient.get<string, void>(`https://localhost:5001/environment/now`)
    if (response.successful && response.data) {
      this.utcOffset = response.data
    }
  }

  @action
  async getAuxiliaryInfo(): Promise<void> {
    const response = await this.httpClient.get<Auxiliary, void>(`https://localhost:5001/operations/auxiliary`)
    if (response.successful && response.data) {
      this.auxiliary = response.data
    }
  }
}
