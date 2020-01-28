import { Stateful } from "reactronic"
import { Customer } from "./Customer"

export interface IBirthInfo {
  customerId: number
  placeOfBirth: string
  dateOfBirth: number // DateTime
  customer: Customer
}

export class BirthInfo extends Stateful {
  customerId: number
  placeOfBirth: string
  dateOfBirth: number // DateTime
  customer: Customer

  constructor(birthInfo: IBirthInfo) {
    super()
    this.customerId = birthInfo.customerId
    this.placeOfBirth = birthInfo.placeOfBirth
    this.dateOfBirth = birthInfo.dateOfBirth
    this.customer = birthInfo.customer
  }
}
