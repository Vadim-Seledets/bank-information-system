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
