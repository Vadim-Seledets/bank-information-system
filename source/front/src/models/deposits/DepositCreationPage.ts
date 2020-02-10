import { Stateful, action } from "reactronic"
import { CreatingDeposit, DepositCreateModel } from "./Deposit"
import { DepositsPage } from "./DepositsPage"
import { IInfoErrors } from "../Errors"
import { Validation, PropertyValidator } from "../Validation"

export class DepositCreationPage extends Stateful {
  depositsPage: DepositsPage
  creatingDeposit: CreatingDeposit
  validation: Validation<DepositCreateModel>

  constructor(depositsPage: DepositsPage) {
    super()
    this.depositsPage = depositsPage
    this.creatingDeposit = new CreatingDeposit()
    this.validation = new Validation(
      this.creatingDeposit as DepositCreateModel,
      new Map([
        ['depositTypeId', new PropertyValidator<DepositCreateModel>('depositTypeId' , /^([A-Z][a-z]*[\'\- ]?[A-Za-z]+)?$/)],
      ])
    )
  }

  @action
  createNewDeposit(): void {
    this.creatingDeposit.setContractNumber(this.generateGuid())
  }

  @action
  cancelCreation(): void {
    this.creatingDeposit.clearProperties()
    this.depositsPage.app.currentTab?.setCurrentPageName('DepositsListPage')
  }

  @action
  async publishNewDepositRequest(): Promise<void> {
    if (this.creatingDeposit) {
      const response = await this.depositsPage.app.httpClient.post<void, IInfoErrors>(
        `https://localhost:5001/deposits`, this.creatingDeposit.getJson())
      if (!response.successful && response.errorData) {
        this.creatingDeposit.infoErrors.initialize(response.errorData)
        this.creatingDeposit.infoErrors.setHasErrors(true)
      }
    }
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/, c => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}