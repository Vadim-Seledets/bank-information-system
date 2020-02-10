import { Stateful, action } from "reactronic"
import { CreatingDeposit } from "./Deposit"
import { DepositsPage } from "./DepositsPage"
import { IInfoErrors } from "../Errors"

export class DepositCreationPage extends Stateful {
  depositsPage: DepositsPage
  creatingDeposit: CreatingDeposit | undefined

  constructor(depositsPage: DepositsPage) {
    super()
    this.depositsPage = depositsPage
  }

  @action
  createNewDeposit(): void {
    this.creatingDeposit = new CreatingDeposit(this.generateGuid())
  }

  @action
  cancelCreation(): void {
    this.creatingDeposit = undefined
    this.depositsPage.app.currentTab?.setCurrentPageName('DepositsListPage')
  }

  @action
  async publishNewDepositRequest(): Promise<void> {
    // const response = await this.depositsPage.app.httpClient.post<void, IInfoErrors>(
    //   `https://localhost:5001/customers`, customer.getJson())
    // if (response.successful && response.data) {
    //   customer.setId(response.data)
    //   customer.infoErrors.setHasErrors(false)
    // } else if (!response.successful && response.errorData) {
    //   customer.infoErrors.initialize(response.errorData)
    //   customer.infoErrors.setHasErrors(true)
    // }
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/, c => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}