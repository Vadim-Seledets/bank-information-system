import { Stateful, action } from "reactronic"
import { CreatingLoan, CreateLoanResponseModel } from "./Loan"
import { LoansPage } from "./LoansPage"
import { IApiErrors, ApiErrors } from "../ApiErrors"
import { Validation, PropertyValidator } from "../Validation"
import { BASE_URL } from "../App"

export class LoanCreationPage extends Stateful {
  apiErrors: ApiErrors | undefined
  loansPage: LoansPage
  creatingLoan: CreatingLoan | undefined
  validation: Validation<CreatingLoan>

  constructor(loansPage: LoansPage) {
    super()
    this.apiErrors = undefined
    this.loansPage = loansPage
    this.creatingLoan = undefined
    this.validation = new Validation(
      new Map([
        ['contractNumber', new PropertyValidator<CreatingLoan>('contractNumber')],
        ['programStartDate', new PropertyValidator<CreatingLoan>('programStartDate', /^\d{4}-\d{2}-\d{2}$/)],
        ['programEndDate', new PropertyValidator<CreatingLoan>('programEndDate', /^\d{4}-\d{2}-\d{2}$/)],
        ['contractValidUntil', new PropertyValidator<CreatingLoan>('contractValidUntil', /^\d{4}-\d{2}-\d{2}$/)],
        ['customerId', new PropertyValidator<CreatingLoan>('customerId', /^[1-9]\d*$/)],
        ['amount', new PropertyValidator<CreatingLoan>('amount', /^\d{1,10}$/)],
        ['rate', new PropertyValidator<CreatingLoan>('rate', /^(0[.,][0-9]{0,2}[1-9])$|^1$/)],
        ['currencyId', new PropertyValidator<CreatingLoan>('currencyId')],
        ['numberOfPaymentTerms', new PropertyValidator<CreatingLoan>('numberOfPaymentTerms', /^[1-9]\d{0,2}$/)],
      ])
    )
  }

  @action
  createNewLoan(): void {
    this.creatingLoan = new CreatingLoan(this.generateGuid())
    const currentDate = this.loansPage.app.getCurrentDate()
    this.creatingLoan.setProgramStartDate(currentDate)
    this.creatingLoan.setProgramEndDate(currentDate)
    this.creatingLoan.setContractValidUntil(currentDate)
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
      const url = `${BASE_URL}/loans`
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