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
  atmRoutineInfo: AtmRoutineInfo
  validation: Validation<AtmRoutineInfo>
  receiptEmement: HTMLElement | null

  constructor(app: App) {
    super()
    this.app = app
    this.currentPageName = 'ReceiptPage'
    this.apiErrors = undefined
    this.atmRoutineInfo = new AtmRoutineInfo()
    this.atmRoutineInfo.setOperation('withdraw')
    this.validation = new Validation<AtmRoutineInfo>(
      new Map([
        ['accountNumber', new PropertyValidator<AtmRoutineInfo>('accountNumber', /^\d{13}$/)],
        ['pin', new PropertyValidator<AtmRoutineInfo>('pin', /^\d{4}$/)],
        ['phoneNumber', new PropertyValidator<AtmRoutineInfo>('phoneNumber', /^\+(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)],
        ['amount', new PropertyValidator<AtmRoutineInfo>('amount', /^\d{1,10}$/)],
        ['currencyId', new PropertyValidator<AtmRoutineInfo>('currencyId')],
        ['carrierId', new PropertyValidator<AtmRoutineInfo>('carrierId')],
      ])
    )
    this.receiptEmement = null
  }

  @action
  setCurrentPage(pageName: AtmPageName): void {
    this.currentPageName = pageName
  }

  @action
  setReceiptElement(element: HTMLElement | null): void {
    this.receiptEmement = element
  }

  printReceipt(): void {
    if (this.receiptEmement) {
      const mywindow = window.open('', 'new div', 'height=400,width=600')
      if (mywindow) {
        mywindow.document.write('<html><head><title></title>')
        mywindow.document.write('</head><body>')
        mywindow.document.write(this.receiptEmement.innerText)
        mywindow.document.write('</body></html>')
        mywindow.print()
        mywindow.close()
      }

      // const printContents = this.receiptEmement.innerHTML
      // const originalContents = document.body.innerHTML
      // let originalStyle: any
      // for (const prop in document.body.style) {
      //   if (document.body.style[prop] && !(document.body.style[prop] as any instanceof Function)) {
      //     originalStyle[prop] = document.body.style[prop]
      //   }
      // }
      // document.body.innerHTML = printContents
      // document.body.style.display = this.receiptEmement.style.display
      // window.print()
      // document.body.innerHTML = originalContents
      // for (const prop in originalStyle as CSSStyleDeclaration) {
      //   if (originalStyle[prop]) {
      //     document.body.style[prop] = originalStyle[prop]
      //   }
      // }
    }
  }
}
