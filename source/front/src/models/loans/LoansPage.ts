import { Stateful, action, trigger, isolated } from 'reactronic'
import { App } from '../App'
import { LoanDetails, Loan, LoanFullInfoModel } from './Loan'
import { LoanCreationPage } from './LoanCreationPage'
import { ProgramContractShortInfoModel } from '../deposits/Deposit'

export class LoansPage extends Stateful {
  app: App
  loans: Array<Loan>
  filteredLoans: Array<Loan>
  selectedLoan?: Loan
  loanDetailes?: LoanDetails
  loanCreationPage: LoanCreationPage

  filter = ''
  revokeIsRequested = false

  // Below properties are used for styling (TODO: try to get rid of these properties)

  isRowWithCustomerHovered = false
  isGenderHovered = false
  isFullNameHovered = false
  isEmailHovered = false
  isActionsHovered = false
  hoveredRowNumber = 0

  constructor(app: App) {
    super()
    this.app = app
    this.loans = new Array<Loan>()
    this.filteredLoans = this.loans
    this.selectedLoan = undefined
    this.loanDetailes = undefined
    this.loanCreationPage = new LoanCreationPage(this)
  }

  @action
  setSelectedLoan(loan?: Loan): void {
    this.selectedLoan = loan
  }

  @action
  toggleLoanSelection(loan: Loan): void {
    if (this.selectedLoan === loan) {
      this.setSelectedLoan(undefined)
    } else {
      this.setSelectedLoan(loan)
    }
  }

  @action
  setFilter(value: string): void {
    this.filter = value
  }

  @trigger
  makeFilteredLoans(): void {
    const filter = this.filter
    this.filteredLoans = this.loans.filter(d => {
      const fullName = `${d.customer.firstName} ${d.customer.middleName} ${d.customer.lastName}`
      const startIndex = fullName.toLowerCase().indexOf(filter.toLowerCase())
      isolated(() => d.setHighlightingRange({ start: startIndex, length: filter.length }))
      return startIndex !== -1
    })
  }

  @action
  addNewLoan(): void {
    this.loanCreationPage.createNewLoan()
    this.app.currentTab?.setCurrentPageName('AddNewLoanPage')
  }

  @action
  showLoanDetails(loan: Loan): void {
    this.getLoanDetailsRequest(loan.contractNumber)
    this.setSelectedLoan(loan)
    this.app.currentTab?.setCurrentPageName('LoanDetailsPage')
  }

  @trigger
  updateLoanDetails(): void {
    if (this.app.currentDate && this.loanDetailes) {
      this.getLoanDetailsRequest(this.loanDetailes.contractNumber)
    }
  }

  // Http requests

  @action
  async getAllLoansInShortInfoModelRequest(): Promise<void> {
    const loans = await this.app.httpClient.get<Array<ProgramContractShortInfoModel>>(`https://localhost:5001/loans`)
    if (loans) {
      this.loans = loans.map(loanShortInfoModel => {
        const loan = new Loan(
          loanShortInfoModel.contractNumber,
          loanShortInfoModel.customer,
          loanShortInfoModel.programStartDate,
          loanShortInfoModel.programEndDate,
        )
        return loan
      })
    }
  }

  @action
  async getLoanDetailsRequest(contractNumber: string): Promise<void> {
    const loanDetails = await this.app.httpClient.get<LoanFullInfoModel>(`https://localhost:5001/loans/${contractNumber}`)
    if (loanDetails) {
      this.loanDetailes = new LoanDetails(loanDetails)
    }
  }

  // Below methods are used for styling

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

  @action
  setRevokeIsRequested(value: boolean): void {
    this.revokeIsRequested = value
  }

  @trigger
  dropDeleteRequestAndResetHoverRowNumber(): void {
    this.selectedLoan /* Sensetivity list item */
    this.revokeIsRequested = false
    this.hoveredRowNumber = 0
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
