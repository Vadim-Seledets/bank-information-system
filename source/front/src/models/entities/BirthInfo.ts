import { Stateful, action } from "reactronic"

export interface IBirthInfo {
  placeOfBirth: string
  dateOfBirth: string // DateTime
}

export class BirthInfo extends Stateful {
  placeOfBirth: string
  dateOfBirth: string

  constructor(birthInfo: IBirthInfo) {
    super()
    this.placeOfBirth = birthInfo.placeOfBirth
    this.dateOfBirth = birthInfo.dateOfBirth
  }

  @action
  setPlaceOfBirth(value: string): void {
    this.placeOfBirth = value
  }

  @action
  setDateOfBirth(value: string): void {
    this.dateOfBirth = value
  }
}
