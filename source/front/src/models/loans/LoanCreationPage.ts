import { Stateful, action } from "reactronic"
import { CreatingLoan, LoanCreateModel, CreateLoanResponseModel } from "./Loan"
import { LoansPage } from "./LoansPage"
import { IApiErrors, ApiErrors } from "../ApiErrors"
import { Validation, PropertyValidator } from "../Validation"

export class LoanCreationPage extends Stateful {
  apiErrors: ApiErrors | undefined
  loansPage: LoansPage
  creatingLoan: CreatingLoan | undefined
  validation: Validation<LoanCreateModel>

  constructor(loansPage: LoansPage) {
    super()
    this.apiErrors = undefined
    this.loansPage = loansPage
    this.creatingLoan = undefined
    this.validation = new Validation(
      new Map([
        ['contractNumber', new PropertyValidator<LoanCreateModel>('contractNumber')],
        ['programStartDate', new PropertyValidator<LoanCreateModel>('programStartDate', /^\d{4}-\d{2}-\d{2}$/)],
        ['programEndDate', new PropertyValidator<LoanCreateModel>('programEndDate', /^\d{4}-\d{2}-\d{2}$/)],
        ['contractValidUntil', new PropertyValidator<LoanCreateModel>('contractValidUntil', /^\d{4}-\d{2}-\d{2}$/)],
        ['customerId', new PropertyValidator<LoanCreateModel>('customerId')],
        ['amount', new PropertyValidator<LoanCreateModel>('amount', /^\d{1,10}$/)],
        ['rate', new PropertyValidator<LoanCreateModel>('rate')],
        ['currencyId', new PropertyValidator<LoanCreateModel>('currencyId')],
      ])
    )
  }

  @action
  createNewLoan(): void {
    this.creatingLoan = new CreatingLoan(this.generateGuid())
  }

  @action
  setCreatingLoan(loan: CreatingLoan | undefined): void {
    this.creatingLoan = loan
  }

  @action
  cancelCreation(): void {
    this.setApiErrors(undefined)
    this.setCreatingLoan(undefined)
    this.loansPage.app.currentTab?.setCurrentPageName('LoansListPage')
  }

  @action
  setApiErrors(apiErrors: IApiErrors | undefined): void {
    this.apiErrors = apiErrors ? new ApiErrors(apiErrors) : undefined
  }

  @action
  async publishNewLoanRequest(): Promise<void> {
    this.setApiErrors(undefined)
    if (this.creatingLoan) {
      const url = `https://localhost:5001/loans`
      const pin = await this.loansPage.app.httpClient.post<CreateLoanResponseModel>(url, this.creatingLoan.getJson())
      const errors = this.loansPage.app.httpClient.getAndDeleteLastError<IApiErrors>('POST', url)
      this.setApiErrors(errors)
      if (this.apiErrors === undefined) {
        alert(`Loan Account Pin: ${pin?.loanPaymentAccountPin}\nRegular Account Pin: ${pin?.regularAccountPin}`)
        this.loansPage.app.currentTab?.setCurrentPageName('LoansListPage')
      }
    }
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}