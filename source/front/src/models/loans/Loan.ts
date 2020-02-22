import { ICustomerShortInfo, IHighlightingRange } from '../customers/Customer'
import { Transaction } from '../deposits/Transaction'
import { Stateful, cached, action } from 'reactronic'
import { ProgramContractShortInfoModel } from '../deposits/Deposit'

export interface CreateLoanResponseModel {
  regularAccountPin: string
  loanPaymentAccountPin: string
}

export interface LoanCreateModel {
  loanTypeId: number
  contractNumber: string
  programStartDate: string
  programEndDate: string
  contractValidUntil: string
  customerId: number
  amount: number
  rate: number
  currencyId: number
}

export interface LoanFullInfoModel {
  loanTypeId: number
  loanPaymentAccountNumber: string
  contractNumber: string
  programStartDate: string
  programEndDate: string
  validUntil: string
  isCompleted: boolean
  completedAt: string
  rate: number
  amount: number
  currencyId: number
  regularAccountNumber: string
  customer: ICustomerShortInfo
  transactions: Array<Transaction>
}

export class Loan extends Stateful implements ProgramContractShortInfoModel {
  hilightingRange: IHighlightingRange = { start: 0, length: 0 }

  constructor(
    public contractNumber: string,
    public customer: ICustomerShortInfo,
    public programStartDate: string,
    public programEndDate: string,
  ) {
    super()
  }

  @action
  setHighlightingRange(value: IHighlightingRange): void {
    this.hilightingRange = value
  }

  @cached
  getCustomerFullName(): string {
    const pureFullName = `${this.customer.firstName} ${this.customer.middleName} ${this.customer.lastName}`
    const pureFullNameLength = pureFullName.length
    const fullName = pureFullName.substr(0, this.hilightingRange.start) +
      '<mark>' + pureFullName.substr(this.hilightingRange.start, this.hilightingRange.length) + '</mark>' +
      pureFullName.substr(this.hilightingRange.start + this.hilightingRange.length, pureFullNameLength - this.hilightingRange.start + this.hilightingRange.length)
    return fullName
  }
}

export class CreatingLoan extends Stateful implements LoanCreateModel {
  loanTypeId: number
  readonly contractNumber: string
  programStartDate: string
  programEndDate: string
  contractValidUntil: string
  customerId: number
  amount: number
  rate: number
  currencyId: number

  constructor(contractNumber: string) {
    super()
    this.loanTypeId = 1
    this.contractNumber = contractNumber
    this.programStartDate = '1990-01-01'
    this.programEndDate = '1990-01-01'
    this.contractValidUntil = '1990-01-01'
    this.customerId = 1
    this.amount = 0
    this.rate = 0
    this.currencyId = 1
  }

  @action
  setLoanTypeId(value: number): void {
    this.loanTypeId = value
  }

  @action
  setProgramStartDate(value: string): void {
    this.programStartDate = value
  }

  @action
  setProgramEndDate(value: string): void {
    this.programEndDate = value
  }

  @action
  setContractValidUntil(value: string): void {
    this.contractValidUntil = value
  }

  @action
  setCustomerId(value: number): void {
    this.customerId = value
  }

  @action
  setAmount(value: number): void {
    this.amount = value
  }

  @action
  setRate(value: number): void {
    this.rate = value
  }

  @action
  setCurrencyId(value: number): void {
    this.currencyId = value
  }

  getJson(): string {
    const deposit = {
      loanTypeId: this.loanTypeId,
      contractNumber: this.contractNumber,
      programStartDate: this.programStartDate,
      programEndDate: this.programEndDate,
      contractValidUntil: this.contractValidUntil,
      customerId: this.customerId,
      amount: this.amount,
      rate: this.rate,
      currencyId: this.currencyId,
    }
    return JSON.stringify(deposit)
  }
}

export class LoanDetails extends Stateful implements LoanFullInfoModel {
  loanTypeId: number
  loanPaymentAccountNumber: string
  contractNumber: string
  programStartDate: string
  programEndDate: string
  validUntil: string
  isCompleted: boolean
  completedAt: string
  rate: number
  amount: number
  currencyId: number
  regularAccountNumber: string
  customer: ICustomerShortInfo
  transactions: Array<Transaction>

  constructor(loanDetailes: LoanFullInfoModel) {
    super()
    this.loanTypeId = loanDetailes.loanTypeId
    this.loanPaymentAccountNumber = loanDetailes.loanPaymentAccountNumber
    this.contractNumber = loanDetailes.contractNumber
    this.programStartDate = loanDetailes.programStartDate
    this.programEndDate = loanDetailes.programEndDate
    this.validUntil = loanDetailes.validUntil
    this.isCompleted = loanDetailes.isCompleted
    this.completedAt = loanDetailes.completedAt
    this.rate = loanDetailes.rate
    this.amount = loanDetailes.amount
    this.currencyId = loanDetailes.currencyId
    this.regularAccountNumber = loanDetailes.regularAccountNumber
    this.customer = loanDetailes.customer
    this.transactions = loanDetailes.transactions
  }
}
