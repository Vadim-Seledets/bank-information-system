import { ICustomerShortInfo } from '../customers/Customer'
import { Transaction } from './Transaction'

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
