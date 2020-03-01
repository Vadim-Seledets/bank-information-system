import { Stateful, action } from "reactronic"
import { CreatingDeposit, DepositCreateModel, OpenDepositResponseModel } from "./Deposit"
import { DepositsPage } from "./DepositsPage"
import { IApiErrors, ApiErrors } from "../ApiErrors"
import { Validation, PropertyValidator } from "../Validation"

export class DepositCreationPage extends Stateful {
  apiErrors: ApiErrors | undefined
  depositsPage: DepositsPage
  creatingDeposit: CreatingDeposit | undefined
  validation: Validation<DepositCreateModel>

  constructor(depositsPage: DepositsPage) {
    super()
    this.apiErrors = undefined
    this.depositsPage = depositsPage
    this.creatingDeposit = undefined
    this.validation = new Validation(
      new Map([
        ['depositTypeId', new PropertyValidator<DepositCreateModel>('depositTypeId')],
        ['contractNumber', new PropertyValidator<DepositCreateModel>('contractNumber')],
        ['programStartDate', new PropertyValidator<DepositCreateModel>('programStartDate', /^\d{4}-\d{2}-\d{2}$/)],
        ['programEndDate', new PropertyValidator<DepositCreateModel>('programEndDate', /^\d{4}-\d{2}-\d{2}$/)],
        ['contractValidUntil', new PropertyValidator<DepositCreateModel>('contractValidUntil', /^\d{4}-\d{2}-\d{2}$/)],
        ['customerId', new PropertyValidator<DepositCreateModel>('customerId', /^[1-9]\d*$/)],
        ['amount', new PropertyValidator<DepositCreateModel>('amount', /^\d{1,10}$/)],
        ['rate', new PropertyValidator<DepositCreateModel>('rate', /^(0[.,][0-9]{0,2}[1-9])$|^1$/)],
        ['currencyId', new PropertyValidator<DepositCreateModel>('currencyId')],
      ])
    )
  }

  @action
  createNewDeposit(): void {
    this.creatingDeposit = new CreatingDeposit(this.generateGuid())
    const currentDate = this.depositsPage.app.getCurrentDate()
    this.creatingDeposit.setProgramStartDate(currentDate)
    this.creatingDeposit.setProgramEndDate(currentDate)
    this.creatingDeposit.setContractValidUntil(currentDate)
  }

  @action
  setCreatingDeposit(deposit: CreatingDeposit | undefined): void {
    this.creatingDeposit = deposit
  }

  @action
  cancelCreation(): void {
    this.setApiErrors(undefined)
    this.setCreatingDeposit(undefined)
    this.depositsPage.app.currentTab?.setCurrentPageName('DepositsListPage')
  }

  @action
  setApiErrors(apiErrors: IApiErrors | undefined): void {
    this.apiErrors = apiErrors ? new ApiErrors(apiErrors) : undefined
  }

  @action
  async publishNewDepositRequest(): Promise<void> {
    this.setApiErrors(undefined)
    if (this.creatingDeposit) {
      const url = `https://localhost:5001/deposits`
      const pin = await this.depositsPage.app.httpClient.post<OpenDepositResponseModel>(url, this.creatingDeposit.getJson())
      const errors = this.depositsPage.app.httpClient.getAndDeleteLastError<IApiErrors>('POST', url)
      this.setApiErrors(errors)
      if (this.apiErrors === undefined) {
        alert(`Deposit Account Pin: ${pin?.depositAccountPin}\nRegular Account Pin: ${pin?.regularAccountPin}`)
        this.depositsPage.app.currentTab?.setCurrentPageName('DepositsListPage')
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