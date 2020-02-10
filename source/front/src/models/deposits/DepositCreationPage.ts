import { Stateful, action } from "reactronic"
import { CreatingDeposit } from "./Deposit"
import { DepositsPage } from "./DepositsPage"

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

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/, c => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}