import { Stateful } from "reactronic"
import { Customer } from "./Customer"

export interface IPassport {
  customerId: number
  citizenship: string
  series: string
  passportNumber: string
  issuingAuthority: string
  issuedAt: number // DateTime
  idNumber: string
  customer: Customer
}

export class Passport extends Stateful {
  customerId: number
  citizenship: string
  series: string
  passportNumber: string
  issuingAuthority: string
  issuedAt: number // DateTime
  idNumber: string
  customer: Customer

  constructor(passport: IPassport) {
    super()
    this.customerId = passport.customerId
    this.citizenship = passport.citizenship
    this.series = passport.series
    this.passportNumber = passport.passportNumber
    this.issuingAuthority = passport.issuingAuthority
    this.issuedAt = passport.issuedAt
    this.idNumber = passport.idNumber
    this.customer = passport.customer
  }
}
