import { Stateful, action, cached } from "reactronic"
import { Gender } from "./Gender"
import { IPassport } from "./IPassport"
import { IBirthInfo } from "./IBirthInfo"
import { IPlaceOfLiving } from "./IPlaceOfLiving"
import { IPlaceOfRegistration } from "./IPlaceOfRegistration"
import { IContacts } from "./IContacts"
import { IIncomePerMonth } from "./IIncomePerMonth"
import { IWorkInfo } from "./IWorkInfo"
import { CustomerInfoErrors } from "../Errors"

export interface ICustomerShortInfo {
  id: number
  firstName: string
  middleName: string
  lastName: string
  email: string
  gender: Gender
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

export type CustomerKeys = keyof Customer

export interface IHighlightingRange {
  start: number
  length: number
}

export class Customer extends Stateful {
  id?: string = undefined
  firstName: string = ''
  middleName: string = ''
  lastName: string = ''
  gender = Gender.Male
  isRetired: boolean = false
  isLiableForMilitaryService: boolean = false
  disabilityId: number = 1
  maritalStatusId: number = 1
  // Passport
  citizenshipId: number = 1
  series: string = ''
  passportNumber: string = ''
  issuingAuthority: string = ''
  issuedAt: string = ''
  idNumber: string = ''
  // Birth Info
  placeOfBirth: string = ''
  dateOfBirth: string = ''
  // Place Of Living
  placeOfLivingCityId: number = 1
  placeOfLivingAddress: string = ''
  // Place Of Registration
  placeOfRegistrationCityId: number = 1
  placeOfRegistrationAddress: string = ''
  // Contacts
  email: string = ''
  homePhoneNumber: string = ''
  mobilePhoneNumber: string = ''
  // Income Per Month
  amount: string = ''
  currencyId: number = 1
  // Work Info
  company: string = ''
  position: string = ''

  infoErrors = new CustomerInfoErrors()
  isFullInfoModelLoaded = false
  hilightingRange: IHighlightingRange = { start: 0, length: 0 }

  @action
  setShortInfo(info: ICustomerShortInfo): void {
    this.id = info.id.toString()
    this.firstName = info.firstName
    this.middleName = info.middleName
    this.lastName = info.lastName
    this.email = info.email
    this.gender = info.gender
  }

  @action
  async getFullInfoModel(): Promise<void> {
    const json = await fetch(`https://localhost:5001/customers/${this.id}`)
      .then(response => response.json())
    const customer = json as ICustomerFullInfo
    this.lastName = customer.lastName
    this.firstName = customer.firstName
    this.middleName = customer.middleName
    this.gender = customer.gender
    this.isRetired = customer.isRetired
    this.isLiableForMilitaryService = customer.isLiableForMilitaryService
    this.disabilityId = customer.disabilityId
    this.maritalStatusId = customer.maritalStatusId
    // Passport
    this.citizenshipId = customer.passport.citizenshipId
    this.series = customer.passport.series
    this.passportNumber = customer.passport.passportNumber
    this.issuingAuthority = customer.passport.issuingAuthority
    this.issuedAt = customer.passport.issuedAt
    this.idNumber = customer.passport.idNumber
    // Birth Info
    this.placeOfBirth = customer.birthInfo.placeOfBirth
    this.dateOfBirth = customer.birthInfo.dateOfBirth
    // Place Of Living
    this.placeOfLivingCityId = customer.placeOfLiving.cityId
    this.placeOfLivingAddress = customer.placeOfLiving.address
    // Place Of Registration
    this.placeOfRegistrationCityId = customer.placeOfRegistration.cityId
    this.placeOfRegistrationAddress = customer.placeOfRegistration.address
    // Contacts
    this.email = customer.contacts.email
    this.homePhoneNumber = customer.contacts.homePhoneNumber
    this.mobilePhoneNumber = customer.contacts.mobilePhoneNumber
    // Income Per Month
    this.amount = customer.incomePerMonth.amount.toString()
    this.currencyId = customer.incomePerMonth.currencyId
    // Work Info
    this.company = customer.workInfo.company
    this.position = customer.workInfo.position
    this.isFullInfoModelLoaded = true
  }

  @action
  setId(id: string): void {
    this.id = id
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

  // Passport

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

  // Birth Info

  @action
  setPlaceOfBirth(value: string): void {
    this.placeOfBirth = value
  }

  @action
  setDateOfBirth(value: string): void {
    this.dateOfBirth = value
  }

  // Place Of Living

  @action
  setPlaceOfLivingCityId(id: number): void {
    this.placeOfLivingCityId = id
  }

  @action
  setPlaceOfLivingAddress(value: string): void {
    this.placeOfLivingAddress = value
  }

  // Place Of Registration

  @action
  setPlaceOfRegistrationCityId(id: number): void {
    this.placeOfRegistrationCityId = id
  }

  @action
  setPlaceOfRegistrationAddress(value: string): void {
    this.placeOfRegistrationAddress = value
  }

  // Contacts

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

  // Income Per Month

  @action
  setAmount(value: string): void {
    this.amount = value
  }

  @action
  setCurrencyId(value: number): void {
    this.currencyId = value
  }

  // Work Info

  @action
  setCompany(value: string): void {
    this.company = value
  }

  @action
  setPosition(value: string): void {
    this.position = value
  }

  @action
  setHighlightingRange(value: IHighlightingRange): void {
    this.hilightingRange = value
  }

  @cached
  getFullName(): string {
    const pureFullName = `${this.firstName} ${this.middleName} ${this.lastName}`
    const pureFullNameLength = pureFullName.length
    const fullName = pureFullName.substr(0, this.hilightingRange.start) +
      '<mark>' + pureFullName.substr(this.hilightingRange.start, this.hilightingRange.length) + '</mark>' +
      pureFullName.substr(this.hilightingRange.start + this.hilightingRange.length, pureFullNameLength - this.hilightingRange.start + this.hilightingRange.length)
    return fullName
  }

  getJson(): string {
    const customer = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      gender: this.gender,
      isRetired: this.isRetired,
      isLiableForMilitaryService: this.isLiableForMilitaryService,
      passport: {
        citizenshipId: this.citizenshipId,
        series: this.series,
        passportNumber: this.passportNumber,
        issuingAuthority: this.issuingAuthority,
        issuedAt: this.issuedAt,
        idNumber: this.idNumber,
      },
      birthInfo: {
        placeOfBirth: this.placeOfBirth,
        dateOfBirth: this.dateOfBirth,
      },
      placeOfLiving: {
        cityId: this.placeOfLivingCityId,
        address: this.placeOfLivingAddress,
      },
      placeOfRegistration: {
        cityId: this.placeOfRegistrationCityId,
        address: this.placeOfRegistrationAddress,
      },
      contacts: {
        email: this.email,
        homePhoneNumber: this.homePhoneNumber,
        mobilePhoneNumber: this.mobilePhoneNumber,
      },
      incomePerMonth: {
        amount: this.amount,
        currencyId: this.currencyId,
      },
      workInfo: {
        company: this.company,
        position: this.position,
      },
      disabilityId: this.disabilityId,
      maritalStatusId: this.maritalStatusId,
    }
    return JSON.stringify(customer)
  }
}
