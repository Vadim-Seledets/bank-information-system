import { Stateful, action } from "reactronic"

export interface AccountBalanceModel {
  amount: number
  currencyId: number
}

export interface CashWithdrawalModel {
  amount: number
}

export interface CashWithdrawalChequeModel {
  accountNumber: string
  amount: number
  currencyId: number
  withdrawnAt: string
}

export interface MobileCarrierPaymentRequestModel {
  accountNumber: string
  phoneNumber: string
  amount: number
  currencyId: number
  carrierId: number
}

export interface MobileCarrierPaymentChequeModel {
  accountNumber: string
  amount: number
  currencyId: number
  carrierId: number
  phoneNumber: string
  payedAt: string
}

type AtmOperation = 'withdraw' | 'phonePayment' | 'balance' | 'none'

export class AtmRoutineInfo extends Stateful
  implements AccountBalanceModel,
    CashWithdrawalModel,
    CashWithdrawalChequeModel,
    MobileCarrierPaymentRequestModel,
    MobileCarrierPaymentChequeModel {
  accountNumber: string
  accountCurrencyId: number
  pin: string
  phoneNumber: string
  amount: number
  currencyId: number
  carrierId: number
  withdrawnAt: string
  payedAt: string
  operation: AtmOperation

  constructor() {
    super()
    this.accountNumber = ''
    this.accountCurrencyId = 1
    this.pin = ''
    this.phoneNumber = ''
    this.amount = 0
    this.currencyId = 1
    this.carrierId = 1
    this.withdrawnAt = ''
    this.payedAt = ''
    this.operation = 'none'
  }

  @action
  setAccountNumber(value: string): void {
    this.accountNumber = value
  }

  @action
  setAccountCurrencyId(value: number): void {
    this.accountCurrencyId = value
  }

  @action
  setPin(value: string): void {
    this.pin = value
  }

  @action
  setPhoneNumber(value: string): void {
    this.phoneNumber = value
  }

  @action
  setAmount(value: number): void {
    this.amount = value
  }

  @action
  setCurrencyId(value: number): void {
    this.currencyId = value
  }

  @action
  setCarrierId(value: number): void {
    this.carrierId = value
  }

  @action
  setWithdrawnAt(value: string): void {
    this.withdrawnAt = value
  }

  @action
  setPayedAt(value: string): void {
    this.payedAt = value
  }

  @action
  setOperation(operation: AtmOperation): void {
    this.operation = operation
  }

  @action
  reset(): void {
    this.accountCurrencyId = 1
    this.phoneNumber = ''
    this.amount = 0
    this.currencyId = 1
    this.carrierId = 1
    this.withdrawnAt = ''
    this.payedAt = ''
    this.operation = 'none'
  }
}
