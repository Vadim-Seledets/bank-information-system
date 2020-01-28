import { Stateful } from "reactronic"
import { Customer } from "./Customer"

export interface IContacts {
  customerId: number
  email: string
  homePhoneNumber: string
  mobilePhoneNumber: string
  customer: Customer
}

export class Contacts extends Stateful {
  customerId: number
  email: string
  homePhoneNumber: string
  mobilePhoneNumber: string
  customer: Customer

  constructor(contacts: IContacts) {
    super()
    this.customerId = contacts.customerId
    this.email = contacts.email
    this.homePhoneNumber = contacts.homePhoneNumber
    this.mobilePhoneNumber = contacts.mobilePhoneNumber
    this.customer = contacts.customer
  }
}
