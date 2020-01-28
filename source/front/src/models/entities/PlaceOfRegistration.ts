import { Stateful } from "reactronic"
import { Customer } from "./Customer"

export interface IPlaceOfRegistration {
  customerId: number
  city: string
  address: string
  customer: Customer
}

export class PlaceOfRegistration extends Stateful {
  customerId: number
  city: string
  address: string
  customer: Customer

  constructor(placeOfRegistration: IPlaceOfRegistration) {
    super()
    this.customerId = placeOfRegistration.customerId
    this.city = placeOfRegistration.city
    this.address = placeOfRegistration.address
    this.customer = placeOfRegistration.customer
  }
}
