import { Stateful } from "reactronic"
import { GenderId } from "./GenderID"
import { DisabilityId } from "./DisabilityId"
import { Passport } from "./Passport"
import { BirthInfo } from "./BirthInfo"
import { PlaceOfLiving } from "./PlaceOfLiving"
import { PlaceOfRegistration } from "./PlaceOfRegistration"
import { Contacts } from "./Contacts"

export interface ICustomer {
  id: number
  firstName: string
  middleName: string
  lastName: string
  genderId: GenderId
  disability?: DisabilityId
  isRetired: boolean
  isLiableForMilitaryService: boolean
  passport: Passport
  birthInfo: BirthInfo
  placeOfLiving: PlaceOfLiving
  placeOfRegistration: PlaceOfRegistration
  contacts: Contacts
}

export class Customer extends Stateful {
  id: number
  firstName: string
  middleName: string
  lastName: string
  genderId: GenderId
  disability?: DisabilityId
  isRetired: boolean
  isLiableForMilitaryService: boolean
  passport: Passport
  birthInfo: BirthInfo
  placeOfLiving: PlaceOfLiving
  placeOfRegistration: PlaceOfRegistration
  contacts: Contacts

  constructor(customer: ICustomer) {
    super()
    this.id = customer.id
    this.firstName = customer.firstName
    this.middleName = customer.middleName
    this.lastName = customer.lastName
    this.genderId = customer.genderId
    this.disability = customer.disability
    this.isRetired = customer.isRetired
    this.isLiableForMilitaryService = customer.isLiableForMilitaryService
    this.passport = customer.passport
    this.birthInfo = customer.birthInfo
    this.placeOfLiving = customer.placeOfLiving
    this.placeOfRegistration = customer.placeOfRegistration
    this.contacts = customer.contacts
  }
}
