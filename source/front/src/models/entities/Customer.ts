import { Stateful, action } from "reactronic"
import { Gender } from "./Gender"
import { IPassport, Passport } from "./Passport"
import { IBirthInfo, BirthInfo } from "./BirthInfo"
import { IPlaceOfLiving, PlaceOfLiving } from "./PlaceOfLiving"
import { IPlaceOfRegistration, PlaceOfRegistration } from "./PlaceOfRegistration"
import { IContacts, Contacts } from "./Contacts"
import { IIncomePerMonth, IncomePerMonth } from "./IncomePerMonth"
import { IWorkInfo, WorkInfo } from "./WorkInfo"

export interface ICustomerFullName {
  id: number
  firstName: string
  middleName: string
  lastName: string
}

export interface ICustomer {
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
}

export class Customer extends Stateful {
  id: number
  firstName: string
  middleName: string
  lastName: string
  gender?: Gender
  isRetired?: boolean
  isLiableForMilitaryService?: boolean
  passport?: Passport
  birthInfo?: BirthInfo
  placeOfLiving?: PlaceOfLiving
  placeOfRegistration?: PlaceOfRegistration
  contacts?: Contacts
  incomePerMonth?: IncomePerMonth
  workInfo?: WorkInfo
  disabilityId?: number
  maritalStatusId?: number

  constructor(fullName: ICustomerFullName) {
    super()
    this.id = fullName.id
    this.firstName = fullName.firstName
    this.middleName = fullName.middleName
    this.lastName = fullName.lastName
    this.gender = undefined
    this.isRetired = undefined
    this.isLiableForMilitaryService = undefined
    this.passport = undefined
    this.birthInfo = undefined
    this.placeOfLiving = undefined
    this.placeOfRegistration = undefined
    this.contacts = undefined
    this.incomePerMonth = undefined
    this.workInfo = undefined
    this.disabilityId = undefined
    this.maritalStatusId = undefined
  }

  @action
  async getFullInfoModel(): Promise<void> {
    const json = await fetch(`https://localhost:5001/customers/${this.id}`)
      .then(response => response.json())
    const customer = json as ICustomer
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

  @action
  setFirstName(value: string): void {
    this.lastName = value
  }

  @action
  setMiddleName(value: string): void {
    this.middleName = value
  }
  
  @action
  setLastName(value: string): void {
    this.lastName = value
  }
  
  @action
  setGender(value: Gender): void {
    this.gender = value
    console.log(this.gender)
  }

  @action
  setIsRetired(value: boolean): void {
    this.isRetired = value
  }

  @action
  setIsLiableForMilitaryService(value: boolean): void {
    this.isLiableForMilitaryService = value
  }
 
  @action
  setDisabilityId(id: number): void {
    this.disabilityId = id
  }
 
  @action
  setMaritalStatusId(id: number): void {
    this.maritalStatusId = id
  }
}
