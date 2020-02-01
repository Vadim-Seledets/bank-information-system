import { Stateful, action, Action } from "reactronic"
import { Gender } from "./Gender"
import { Passport, IPassport } from "./Passport"
import { BirthInfo, IBirthInfo } from "./BirthInfo"
import { PlaceOfLiving, IPlaceOfLiving } from "./PlaceOfLiving"
import { PlaceOfRegistration, IPlaceOfRegistration } from "./PlaceOfRegistration"
import { Contacts, IContacts } from "./Contacts"
import { IncomePerMonth, IIncomePerMonth } from "./IncomePerMonth"
import { WorkInfo, IWorkInfo } from "./WorkInfo"

export interface ICustomerShortInfo {
  id: number
  firstName: string
  middleName: string
  lastName: string
}

export interface ICustomerFullInfo {
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
  id?: number = undefined
  firstName: string = ''
  middleName: string = ''
  lastName: string = ''
  gender = Gender.Male
  isRetired: boolean = false
  isLiableForMilitaryService: boolean = false
  passport = new Passport()
  birthInfo = new BirthInfo()
  placeOfLiving = new PlaceOfLiving()
  placeOfRegistration = new PlaceOfRegistration()
  contacts = new Contacts()
  incomePerMonth = new IncomePerMonth()
  workInfo = new WorkInfo()
  disabilityId: number | null = null
  maritalStatusId: number = 1

  @action
  setShortInfo(info: ICustomerShortInfo): void {
    this.id = info.id
    this.firstName = info.firstName
    this.middleName = info.middleName
    this.lastName = info.lastName
  }

  @action
  async getFullInfoModel(): Promise<void> {
    const json = await fetch(`https://localhost:5001/customers/${this.id}`)
      .then(response => response.json())
    const customer = json as ICustomerFullInfo
    this.gender = customer.gender
    this.isRetired = customer.isRetired
    this.isLiableForMilitaryService = customer.isLiableForMilitaryService
    this.passport.initialize(customer.passport)
    this.birthInfo.initialize(customer.birthInfo)
    this.placeOfLiving.initialize(customer.placeOfLiving)
    this.placeOfRegistration.initialize(customer.placeOfRegistration)
    this.contacts.initialize(customer.contacts)
    this.incomePerMonth.initialize(customer.incomePerMonth)
    this.workInfo.initialize(customer.workInfo)
    this.disabilityId = customer.disabilityId
    this.maritalStatusId = customer.maritalStatusId
  }

  @action
  setFirstName(value: string): void {
    this.firstName = value
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
