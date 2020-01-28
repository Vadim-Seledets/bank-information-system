import { Stateful } from "reactronic"
import { Customer } from "./Customer"
import { CurrencyId } from "./CurrencyID"

export interface IIncomePerMonth {
  customerId: number
  amount: number
  currencyId: CurrencyId
  customer: Customer
}

export class IncomePerMonth extends Stateful {
  customerId: number
  amount: number
  currencyId: CurrencyId
  customer: Customer

  constructor(incomePerMonth: IIncomePerMonth) {
    super()
    this.customerId = incomePerMonth.customerId
    this.amount = incomePerMonth.amount
    this.currencyId = incomePerMonth.currencyId
    this.customer = incomePerMonth.customer
  }
}
