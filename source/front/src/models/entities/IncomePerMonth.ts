import { Stateful } from "reactronic"

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
}
