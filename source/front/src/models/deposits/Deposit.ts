import { ICustomerShortInfo, IHighlightingRange } from '../customers/Customer'
import { Transaction } from './Transaction'
import { Stateful, cached, action } from 'reactronic'

export interface DepositCreateModel {
  depositTypeId: number 
  contractNumber: string
  programStartDate:	string
  programEndDate:	string
  contractValidUntil: string
  customerId: number
  amount: number
  rate: number
  currencyId: number
}

export interface DepositShortInfoModel {
  contractNumber: string
  customer: ICustomerShortInfo
  programStartDate: string
  programEndDate: string
}

export interface DepositFullInfoModel {
  isRevoked: boolean
  depositTypeId: number
  depositAccountNumber: string
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

export class Deposit extends Stateful implements DepositShortInfoModel {
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
