import { Stateful, action } from "reactronic"
import { CreatingDeposit, DepositCreateModel } from "./Deposit"
import { DepositsPage } from "./DepositsPage"
import { IInfoErrors } from "../Errors"
import { Validation, PropertyValidator } from "../Validation"

export class DepositCreationPage extends Stateful {
  depositsPage: DepositsPage
  creatingDeposit: CreatingDeposit | undefined
  validation: Validation<DepositCreateModel>

  constructor(depositsPage: DepositsPage) {
    super()
    this.depositsPage = depositsPage
    this.creatingDeposit = undefined
    this.validation = new Validation(
      new Map([
        ['depositTypeId', new PropertyValidator<DepositCreateModel>('depositTypeId')],
        ['contractNumber', new PropertyValidator<DepositCreateModel>('contractNumber')],
        ['programStartDate', new PropertyValidator<DepositCreateModel>('programStartDate', /^\d{4}-\d{2}-\d{2}$/)],
        ['programEndDate', new PropertyValidator<DepositCreateModel>('programEndDate', /^\d{4}-\d{2}-\d{2}$/)],
        ['contractValidUntil', new PropertyValidator<DepositCreateModel>('contractValidUntil', /^\d{4}-\d{2}-\d{2}$/)],
        ['customerId', new PropertyValidator<DepositCreateModel>('customerId')],
        ['amount', new PropertyValidator<DepositCreateModel>('amount', /^\d+$/)],
        ['rate', new PropertyValidator<DepositCreateModel>('rate', /^(0[.,][0-9]+)|1$/)],
        ['currencyId', new PropertyValidator<DepositCreateModel>('currencyId')],
      ])
    )
  }

  @action
  createNewDeposit(): void {
    this.creatingDeposit = new CreatingDeposit(this.generateGuid())
  }

  @action
  setCreatingDeposit(deposit: CreatingDeposit | undefined): void {
    this.creatingDeposit = deposit
  }

  @action
  cancelCreation(): void {
    this.setCreatingDeposit(undefined)
    this.depositsPage.app.currentTab?.setCurrentPageName('DepositsListPage')
  }

  @action
  async publishNewDepositRequest(): Promise<void> {
    if (this.creatingDeposit) {
      const response = await this.depositsPage.app.httpClient.post<void, IInfoErrors>(
        `https://localhost:5001/deposits`, this.creatingDeposit.getJson())
      if (response.successful) {
        this.creatingDeposit.infoErrors.setHasErrors(false)
      } else if (!response.successful && response.errorData) {
        this.creatingDeposit.infoErrors.initialize(response.errorData)
        this.creatingDeposit.infoErrors.setHasErrors(true)
      }
      if (!this.creatingDeposit.infoErrors.hasAnyErrors) {
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