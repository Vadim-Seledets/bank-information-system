import { Stateful, action } from "reactronic"

export interface IIncomePerMonth {
  amount: number
  currencyId: number
}

export class IncomePerMonth extends Stateful {
  amount: string = ''
  currencyId: number = 1

  @action
  initialize(incomePerMonth: IIncomePerMonth): void {
    this.amount = incomePerMonth.amount.toString()
    this.currencyId = incomePerMonth.currencyId
  }

  @action
  setAmount(value: string): void {
    this.amount = value
  }

  @action
  setCurrencyId(value: number): void {
    this.currencyId = value
  }
}
