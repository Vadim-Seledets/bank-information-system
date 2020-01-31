import { Stateful } from "reactronic"

export interface IPassport {
  citizenshipId: number
  series: string
  passportNumber: string
  issuingAuthority: string
  issuedAt: string
  idNumber: string
}

export class Passport extends Stateful {
  citizenshipId: number
  series: string
  passportNumber: string
  issuingAuthority: string
  issuedAt: string
  idNumber: string

  constructor(passport: IPassport) {
    super()
    this.citizenshipId = passport.citizenshipId
    this.series = passport.series
    this.passportNumber = passport.passportNumber
    this.issuingAuthority = passport.issuingAuthority
    this.issuedAt = passport.issuedAt
    this.idNumber = passport.idNumber
  }
}
