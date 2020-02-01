import { Stateful, action } from "reactronic"

export interface IPassport {
  citizenshipId: number
  series: string
  passportNumber: string
  issuingAuthority: string
  issuedAt: string
  idNumber: string
}

export class Passport extends Stateful {
  citizenshipId: number = 1
  series: string = ''
  passportNumber: string = ''
  issuingAuthority: string = ''
  issuedAt: string = ''
  idNumber: string = ''

  @action
  initialize(passport: IPassport): void  {
    this.citizenshipId = passport.citizenshipId
    this.series = passport.series
    this.passportNumber = passport.passportNumber
    this.issuingAuthority = passport.issuingAuthority
    this.issuedAt = passport.issuedAt
    this.idNumber = passport.idNumber
  }

  @action
  setCitizenshipId(value: number): void {
    this.citizenshipId = value
  }

  @action
  setSeries(value: string): void {
    this.series = value
  }

  @action
  setPassportNumber(value: string): void {
    this.passportNumber = value
  }

  @action
  setIssuingAuthority(value: string): void {
    this.issuingAuthority = value
  }

  @action
  setIssuedAt(value: string): void {
    this.issuedAt = value
  }

  @action
  setIdNumber(value: string): void {
    this.idNumber = value
  }
}
