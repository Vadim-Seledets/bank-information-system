import { Stateful, action } from "reactronic"

export interface IContacts {
  email: string
  homePhoneNumber: string
  mobilePhoneNumber: string
}
export class Contacts extends Stateful {
  email: string = ''
  homePhoneNumber: string = ''
  mobilePhoneNumber: string = ''

  @action
  initialize(contacts: IContacts): void {
    this.email = contacts.email
    this.homePhoneNumber = contacts.homePhoneNumber
    this.mobilePhoneNumber = contacts.mobilePhoneNumber
  }

  @action
  setEmail(value: string): void {
    this.email = value
  }

  @action
  setHomePhoneNumber(value: string): void {
    this.homePhoneNumber = value
  }

  @action
  setMobilePhoneNumber(value: string): void {
    this.mobilePhoneNumber = value
  }
}
