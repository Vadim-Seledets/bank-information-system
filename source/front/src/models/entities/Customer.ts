import { Stateful } from "reactronic"
import { Gender } from "./Gender"
import { IPassport, Passport } from "./Passport"
import { IBirthInfo, BirthInfo } from "./BirthInfo"
import { IPlaceOfLiving, PlaceOfLiving } from "./PlaceOfLiving"
import { IPlaceOfRegistration, PlaceOfRegistration } from "./PlaceOfRegistration"
import { IContacts, Contacts } from "./Contacts"
import { IIncomePerMonth, IncomePerMonth } from "./IncomePerMonth"
import { IWorkInfo, WorkInfo } from "./WorkInfo"

export interface ICustomer {
  id: number
  firstName: string
  middleName: string
  lastName: string
  gender: Gender
  isRetired: boolean
  isLiableForMilitaryService: boolean
  passport: IPassport
  birthInfo: IBirthInfo
  placeOfLiving: IPlaceOfLiving
  placeOfRegistration: IPlaceOfRegistration
  contacts: IContacts
  incomePerMonth: IIncomePerMonth
  workInfo: IWorkInfo
  disabilityId: number
  maritalStatusId: number
}

export class Customer extends Stateful {
  id: number
  firstName: string
  middleName: string
  lastName: string
  gender: Gender
  isRetired: boolean
  isLiableForMilitaryService: boolean
  passport: Passport
  birthInfo: BirthInfo
  placeOfLiving: PlaceOfLiving
  placeOfRegistration: PlaceOfRegistration
  contacts: Contacts
  incomePerMonth: IncomePerMonth
  workInfo: WorkInfo
  disabilityId: number
  maritalStatusId: number

  constructor(customer: ICustomer) {
    super()
    this.id = customer.id
    this.firstName = customer.firstName
    this.middleName = customer.middleName
    this.lastName = customer.lastName
    this.gender = customer.gender
    this.isRetired = customer.isRetired
    this.isLiableForMilitaryService = customer.isLiableForMilitaryService
    this.passport = new Passport(customer.passport)
    this.birthInfo = new BirthInfo(customer.birthInfo)
    this.placeOfLiving = new PlaceOfLiving(customer.placeOfLiving)
    this.placeOfRegistration = new PlaceOfRegistration(customer.placeOfRegistration)
    this.contacts = new Contacts(customer.contacts)
    this.incomePerMonth = new IncomePerMonth(customer.incomePerMonth)
    this.workInfo = new WorkInfo(customer.workInfo)
    this.disabilityId = customer.disabilityId
    this.maritalStatusId = customer.maritalStatusId
  }
}
