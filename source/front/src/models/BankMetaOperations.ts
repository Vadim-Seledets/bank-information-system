import { Stateful, action } from "reactronic"

export class Auxiliary {
  cities: Array<{id: number, name: string}> = []
  countriesOfCitizenship: Array<{id: number, country: string}> = []
  disabilities: Array<{id: number, description: string}> = []
  currencies: Array<{id: number, code: string}> = []
  maritalStatuses: Array<{id: number, description: string}> = []
  depositTypes:  Array<{id: number, name: string}> = []
  loanTypes:  Array<{id: number, name: string}> = []
  mobileCarriers:  Array<{id: number, name: string}> = []
}

export class CloseBankDayData extends Stateful {
  times: number

  constructor(times: number) {
    super()
    this.times = times
  }
  
  @action
  setTimes(value: number): void {
    this.times = value
  }
}
