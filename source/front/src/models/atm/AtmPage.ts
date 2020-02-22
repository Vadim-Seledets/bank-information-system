import { Stateful, action, trigger } from 'reactronic'
import { App } from '../App'
import { ApiErrors, IApiErrors } from '../ApiErrors'
import { AtmRoutineInfo, AccountBalanceModel, MobileCarrierPaymentChequeModel, CashWithdrawalChequeModel } from './PaymentAndAccountModels'
import { Validation, PropertyValidator } from '../Validation'
import { digestMessageInBase64 } from './AtmUtils'

export type AtmPageName = 'WelcomePage' | 'AccountNumberPage' | 'PinCodePage' | 'MainMenuPage'
  | 'CashWithdrawalPage' | 'AccountBalancePage' | 'MobilePaymentPage' | 'ShouldShowReceiptPage'
  | 'ReceiptPage' | 'ShouldDoAnotherOperation'

export class AtmPage extends Stateful {
  app: App
  apiErrors: ApiErrors | undefined
  currentPageName: AtmPageName
  atmRoutineInfo: AtmRoutineInfo
  validation: Validation<AtmRoutineInfo>
  pinInputElement: HTMLElement | null
  receiptEmement: HTMLElement | null

  isPinVisible: boolean
  isPinCorrect: boolean
  currentTime: Date

  constructor(app: App) {
    super()
    this.app = app
    this.currentPageName = 'WelcomePage'
    this.apiErrors = undefined
    this.atmRoutineInfo = new AtmRoutineInfo()
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
    this.pinInputElement = null
    this.receiptEmement = null
    this.isPinVisible = true
    this.isPinCorrect = false
    this.currentTime = new Date()
    setInterval(this.setCurrentTime, 1000)
  }

  @action
  setCurrentPage(pageName: AtmPageName): void {
    this.currentPageName = pageName
  }

  @action
  setReceiptElement(element: HTMLElement | null): void {
    this.receiptEmement = element
  }
 
  @action
  setPinInputElement(element: HTMLElement | null): void {
    this.pinInputElement = element
  }

  @action
  setApiErrors(apiErrors: IApiErrors | undefined): void {
    this.apiErrors = apiErrors ? new ApiErrors(apiErrors) : undefined
  }

  @trigger
  async updateAtmRoutineInfo(): Promise<void> {
    switch (this.currentPageName) {
      case 'WelcomePage':
        this.atmRoutineInfo.reset()
        this.atmRoutineInfo.setAccountNumber('')
        this.atmRoutineInfo.setPin('')
        break
      case 'PinCodePage':
        this.atmRoutineInfo.reset()
        this.atmRoutineInfo.setPin('')
        this.pinInputElement?.focus()
        break
      case 'MainMenuPage':
        this.atmRoutineInfo.reset()
        break
      case 'CashWithdrawalPage':
        await this.getAccountBalance()
        this.atmRoutineInfo.setAmount(0)
        this.atmRoutineInfo.setOperation('withdraw')
        break
      case 'AccountBalancePage':
        await this.getAccountBalance()
        this.atmRoutineInfo.setOperation('balance')
        break
      case 'MobilePaymentPage':
        this.atmRoutineInfo.setOperation('phonePayment')
        break
    }
  }

  @trigger
  async updatePinCorrectnessStatus(): Promise<void> {
    if (this.atmRoutineInfo.pin.length === 4) {
      this.isPinCorrect = await this.checkPinCorrectness()
    }
  }

  @action
  async checkPinCorrectness(): Promise<boolean> {
    const url = `https://localhost:5001/accounts/${this.atmRoutineInfo.accountNumber}/balance`
    const pinInBase64 = await digestMessageInBase64(this.atmRoutineInfo.pin)
    await this.app.httpClient.get(url, {'Authorization': pinInBase64})
    const errors = this.app.httpClient.getAndDeleteLastError('GET', url)
    if (errors === undefined) {
      this.setCurrentPage('MainMenuPage')
    }
    return errors === undefined ? true : false
  }

  @action
  async getAccountBalance(): Promise<void> {
    const url = `https://localhost:5001/accounts/${this.atmRoutineInfo.accountNumber}/balance`
    const accountBalance = await this.app.httpClient.get<AccountBalanceModel>(url)
    if (accountBalance) {
      this.atmRoutineInfo.setAmount(accountBalance.amount)
      this.atmRoutineInfo.setCurrencyId(accountBalance.currencyId)
    }
  }

  @action
  async payForMobilePhoneRequest(): Promise<void> {
    const url = `https://localhost:5001/payments/mobile-carrier`
    const mobileCarrierPaymentInfo = {
      accountNumber: this.atmRoutineInfo.accountNumber,
      phoneNumber: this.atmRoutineInfo.phoneNumber,
      amount: this.atmRoutineInfo.amount,
      currencyId: this.atmRoutineInfo.currencyId,
      carrierId: this.atmRoutineInfo.carrierId,
    }
    const receipt = await this.app.httpClient.post<MobileCarrierPaymentChequeModel>(url, JSON.stringify(mobileCarrierPaymentInfo))
    if (receipt) {
      this.atmRoutineInfo.setPayedAt(receipt.payedAt)
      this.setCurrentPage('ShouldShowReceiptPage')
    }
  }
  
  @action
  async withdrawCashRequest(): Promise<void> {
    const url = `https://localhost:5001/accounts/${this.atmRoutineInfo.accountNumber}/withdraw`
    const cashWithdrawalModel = {
      amount: this.atmRoutineInfo.amount,
    }
    const receipt = await this.app.httpClient.post<CashWithdrawalChequeModel>(url, JSON.stringify(cashWithdrawalModel))
    if (receipt) {
      this.atmRoutineInfo.setWithdrawnAt(receipt.withdrawnAt)
      this.setCurrentPage('ShouldShowReceiptPage')
    }
  }

  @action
  togglePinVisibility(): void {
    this.isPinVisible = !this.isPinVisible
  }

  @action
  setCurrentTime(...args: []): void {
    this.currentTime = new Date()
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
