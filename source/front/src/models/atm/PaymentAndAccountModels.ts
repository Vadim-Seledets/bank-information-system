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

export class AtmRoutineInfo extends Stateful {
  accountNumber: string
  pin: string
  phoneNumber: string
  amount: number
  currencyId: number
  carrierId: number

  constructor(accountNumber: string) {
    super()
    this.accountNumber = accountNumber
    this.pin = ''
    this.phoneNumber = ''
    this.amount = 0
    this.currencyId = 1
    this.carrierId = 1
  }

  @action
  setAccountNumber(value: string): void {
    this.accountNumber = value
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
}
