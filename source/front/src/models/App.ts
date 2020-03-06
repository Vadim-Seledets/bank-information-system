import { Stateful, action, trigger } from 'reactronic'
import { Tab } from './Tab'
import { HttpClient } from './HttpClient'
import { Auxiliary, CloseBankDayData } from './BankMetaOperations'
import { CustomersPage } from './customers/CustomersPage'
import { DepositsPage } from './deposits/DepositsPage'
import { LoansPage } from './loans/LoansPage'
import { AtmPage } from './atm/AtmPage'

export const BASE_URL = 'https://localhost:5001'

export type PageName = 'CustomersListPage' | 'EditCustomerPage' | 'CustomerInfoPage'
  | 'DepositsListPage' | 'AddNewDepositPage' | 'DepositDetailsPage'
  | 'LoansListPage' | 'AddNewLoanPage' | 'LoanDetailsPage' | 'AtmPage'

export class App extends Stateful {
  httpClient = new HttpClient()
  auxiliary: Auxiliary
  tabs: Array<Tab>
  currentTab?: Tab
  customersPage: CustomersPage
  depositsPage: DepositsPage
  loansPage: LoansPage
  atmPage: AtmPage

  closeBankDayData: CloseBankDayData
  utcOffset: Date
  currentDate: Date

  constructor() {
    super()
    this.auxiliary = new Auxiliary()
    this.closeBankDayData = new CloseBankDayData(1)
    this.tabs = new Array<Tab>(
      new Tab('customers', 'Customers', 'CustomersListPage', 'las la-address-book'),
      new Tab('deposits', 'Deposits', 'DepositsListPage', 'las la-percent'),
      new Tab('loans', 'Loans', 'LoansListPage', 'las la-credit-card'),
      new Tab('atm', 'ATM', 'AtmPage', 'las la-money-check'),
    )
    this.currentTab = this.tabs[0]
    this.customersPage = new CustomersPage(this)
    this.depositsPage = new DepositsPage(this)
    this.loansPage = new LoansPage(this)
    this.atmPage = new AtmPage(this)
    this.currentDate = new Date()
    this.utcOffset = new Date()
  }

  @trigger
  init(): void {
    this.getCurrentDateRequest()
    this.initializeBankAccounts()
    this.getAuxiliaryInfo()
  }

  @action
  setCurrentTab(tab: Tab): void {
    this.currentTab = tab
  }

  getCurrentDate(): string {
    const month = this.currentDate.getMonth() + 1
    return `${this.currentDate.getFullYear()}-${month < 10 ? `0${month}` : month}-${this.currentDate.getDate()}`
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
      case 'LoansListPage':
        this.loansPage.getAllLoansInShortInfoModelRequest()
        break
    }
  }

  // Http requests

  @action
  async initializeBankAccounts(): Promise<void> {
    await this.httpClient.get(`${BASE_URL}/accounts/bank-funds/initialize`)
  }

  @action
  async closeBankDayAndGetNewDateRequst(): Promise<void> {
    await this.httpClient.post<CloseBankDayData>(`${BASE_URL}/meta-operations/commit`, JSON.stringify(this.closeBankDayData))
    this.getCurrentDateRequest()
  }

  @action
  async getCurrentDateRequest(): Promise<void> {
    const date = await this.httpClient.get<string>(`${BASE_URL}/environment/now`)
    if (date !== undefined) {
      this.currentDate = new Date(Date.parse(date))
    }
  }

  @action
  async getAuxiliaryInfo(): Promise<void> {
    const auxiliary = await this.httpClient.get<Auxiliary>(`${BASE_URL}/meta-operations/auxiliary`)
    if (auxiliary) {
      this.auxiliary = auxiliary
    }
  }
}
