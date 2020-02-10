import { ICustomerShortInfo, IHighlightingRange } from '../customers/Customer'
import { Transaction } from './Transaction'
import { Stateful, cached, action } from 'reactronic'
import { InfoErrors } from '../Errors'

export interface DepositShortInfoModel {
  contractNumber: string
  customer: ICustomerShortInfo
  programStartDate: string
  programEndDate: string
}

export interface DepositCreateModel {
  depositTypeId: number
  contractNumber: string
  programStartDate: string
  programEndDate: string
  contractValidUntil: string
  customerId: number
  amount: number
  rate: number
  currencyId: number
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

export class CreatingDeposit extends Stateful implements DepositCreateModel {
  depositTypeId: number
  contractNumber: string
  programStartDate: string
  programEndDate: string
  contractValidUntil: string
  customerId: number
  amount: number
  rate: number
  currencyId: number

  infoErrors = new InfoErrors()

  constructor() {
    super()
    this.depositTypeId = 1
    this.contractNumber = ''
    this.programStartDate = ''
    this.programEndDate = ''
    this.contractValidUntil = ''
    this.customerId = 1
    this.amount = 0
    this.rate = 0
    this.currencyId = 1
  }

  @action
  setContractNumber(value: string): void {
    this.contractNumber = value
  }

  @action
  setDepositTypeId(value: number): void {
    this.depositTypeId = value
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

  @action
  clearProperties(): void {
    this.depositTypeId = 1
    this.contractNumber = ''
    this.programStartDate = ''
    this.programEndDate = ''
    this.contractValidUntil = ''
    this.customerId = 1
    this.amount = 0
    this.rate = 0
    this.currencyId = 1
    this.infoErrors.initialize({ error: undefined, errors: undefined })
  }

  getJson(): string {
    const deposit = {
      depositTypeId: this.depositTypeId,
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

export class DepositDetails extends Stateful implements DepositFullInfoModel {
  constructor(
    public isRevoked: boolean,
    public depositTypeId: number,
    public depositAccountNumber: string,
    public contractNumber: string,
    public programStartDate: string,
    public programEndDate: string,
    public validUntil: string,
    public isCompleted: boolean,
    public completedAt: string,
    public rate: number,
    public amount: number,
    public currencyId: number,
    public regularAccountNumber: string,
    public customer: ICustomerShortInfo,
    public transactions: Array<Transaction>,
  ) {
    super()
  }
}