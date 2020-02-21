import { Stateful, action } from 'reactronic'
import { App } from '../App'
import { ApiErrors } from '../ApiErrors'
import { AtmRoutineInfo } from './PaymentAndAccountModels'
import { Validation, PropertyValidator } from '../Validation'

export type AtmPageName = 'WelcomePage' | 'AccountNumberPage' | 'PinCodePage' | 'MainMenuPage'
  | 'WithdrawPage' | 'AccountBalancePage' | 'MobilePaymentPage' | 'ShouldShowReceiptPage' | 'ReceiptPage'

export class AtmPage extends Stateful {
  app: App
  apiErrors: ApiErrors | undefined
  currentPageName: AtmPageName
  atmRoutineInfo: AtmRoutineInfo | undefined
  validation: Validation<AtmRoutineInfo>

  constructor(app: App) {
    super()
    this.app = app
    this.currentPageName = 'WelcomePage'
    this.apiErrors = undefined
    this.atmRoutineInfo = undefined
    this.validation = new Validation<AtmRoutineInfo>(
      new Map([
        ['accountNumber', new PropertyValidator<AtmRoutineInfo>('accountNumber')],
        ['pin', new PropertyValidator<AtmRoutineInfo>('pin')],
        ['phoneNumber', new PropertyValidator<AtmRoutineInfo>('phoneNumber')],
        ['amount', new PropertyValidator<AtmRoutineInfo>('amount', /^\d{1,10}$/)],
        ['currencyId', new PropertyValidator<AtmRoutineInfo>('currencyId')],
        ['carrierId', new PropertyValidator<AtmRoutineInfo>('carrierId')],
      ])
    )
  }

  @action
  setCurrentPage(pageName: AtmPageName): void {
    this.currentPageName = pageName
  }

  @action
  createAtmRoutineInfo(accountNumber: string): void {
    this.atmRoutineInfo = new AtmRoutineInfo(accountNumber)
  }
}
