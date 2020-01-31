import { Stateful } from "reactronic"

export interface IContacts {
  email: string
  homePhoneNumber: string
  mobilePhoneNumber: string
}
export class Contacts extends Stateful {
  email: string
  homePhoneNumber: string
  mobilePhoneNumber: string

  constructor(contacts: IContacts) {
    super()
    this.email = contacts.email
    this.homePhoneNumber = contacts.homePhoneNumber
    this.mobilePhoneNumber = contacts.mobilePhoneNumber
  }
}
