import { Stateful, action } from 'reactronic'
import { App } from '../App'

export type AtmPageName = 'WelcomePage' | 'AccountNumberPage' | 'PinCodePage' | 'MainMenuPage'
  | 'WithdrawPage' | 'AccountBalancePage' | 'MobilePaymentPage' | 'ShouldShowReceiptPage' | 'ReceiptPage'

export class AtmPage extends Stateful {
  app: App
  currentPageName: AtmPageName

  constructor(app: App) {
    super()
    this.app = app
    this.currentPageName = 'WelcomePage'
  }

  @action
  setCurrentPage(pageName: AtmPageName): void {
    this.currentPageName = pageName
  }
}
