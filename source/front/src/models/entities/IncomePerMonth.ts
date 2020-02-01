import { Stateful, action } from "reactronic"

export interface IIncomePerMonth {
  amount: number
  currencyId: number
}

export class IncomePerMonth extends Stateful {
  amount: number
  currencyId: number

  constructor(incomePerMonth: IIncomePerMonth) {
    super()
    this.amount = incomePerMonth.amount
    this.currencyId = incomePerMonth.currencyId
  }

  @action
  setAmount(value: number): void {
    this.amount = value
  }

  @action
  setCurrencyId(value: number): void {
    this.currencyId = value
  }
}
