import { Stateful } from "reactronic"

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
}
