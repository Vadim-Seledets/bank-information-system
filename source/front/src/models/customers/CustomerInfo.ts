import { Stateful, action, trigger } from 'reactronic'
import { Auxiliary } from './Auxiliary'
import { Validation, PropertyValidator } from '../Validation'
import { CustomerKeys } from './Customer'
import { CustomersPage } from './CustomersPage'

export class CustomerInfo extends Stateful {
  customersPage: CustomersPage
  auxiliary: Auxiliary
  validation: Validation

  constructor(customersPage: CustomersPage) {
    super()
    this.customersPage = customersPage
    this.auxiliary = new Auxiliary()
    this.validation = new Validation(new Map<CustomerKeys, PropertyValidator>([
      ['lastName', new PropertyValidator(this.customersPage, 'lastName', /^([A-Z][a-z]*[\'\- ]?[A-Za-z]+)?$/)],
      ['firstName', new PropertyValidator(this.customersPage, 'firstName', /^([A-Z][a-z]*[\'\- ]?[A-Za-z]+)?$/)],
      ['middleName', new PropertyValidator(this.customersPage, 'middleName', /^([A-Z][a-z]*[\'\- ]?[A-Za-z]+)?$/)],
      ['dateOfBirth', new PropertyValidator(this.customersPage, 'dateOfBirth', /^\d{4}-\d{2}-\d{2}$/)],
      ['gender', new PropertyValidator(this.customersPage, 'gender')],
      ['series', new PropertyValidator(this.customersPage, 'series', /^([A-Z]{2})?$/)],
      ['passportNumber', new PropertyValidator(this.customersPage, 'passportNumber', /^(\d{7})?$/)],
      ['issuingAuthority', new PropertyValidator(this.customersPage, 'issuingAuthority', /^[A-Za-z' ]*$/)],
      ['issuedAt', new PropertyValidator(this.customersPage, 'issuedAt', /^\d{4}-\d{2}-\d{2}$/)],
      ['idNumber', new PropertyValidator(this.customersPage, 'idNumber', /^([A-Z0-9]{14})?$/)],
      ['placeOfBirth', new PropertyValidator(this.customersPage, 'placeOfBirth', /^[A-Za-z ]*$/)],
      ['placeOfLivingCityId', new PropertyValidator(this.customersPage, 'placeOfLivingCityId')],
      ['placeOfLivingAddress', new PropertyValidator(this.customersPage, 'placeOfLivingAddress')],
      ['placeOfRegistrationCityId', new PropertyValidator(this.customersPage, 'placeOfRegistrationCityId')],
      ['placeOfRegistrationAddress', new PropertyValidator(this.customersPage, 'placeOfRegistrationAddress', /[A-Za-z ]*/)],
      ['homePhoneNumber', new PropertyValidator(this.customersPage, 'homePhoneNumber', /^(\+(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*)?$/)],
      ['mobilePhoneNumber', new PropertyValidator(this.customersPage, 'mobilePhoneNumber', /^(\+(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*)?$/)],
      ['email', new PropertyValidator(this.customersPage, 'email', /^((([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,}))?$/)],
      ['company', new PropertyValidator(this.customersPage, 'company', /^[A-Za-z ]*$/)],
      ['position', new PropertyValidator(this.customersPage, 'position', /^[A-Za-z ]*$/)],
      ['maritalStatusId', new PropertyValidator(this.customersPage, 'maritalStatusId')],
      ['citizenshipId', new PropertyValidator(this.customersPage, 'citizenshipId')],
      ['disabilityId', new PropertyValidator(this.customersPage, 'disabilityId')],
      ['isRetired', new PropertyValidator(this.customersPage, 'isRetired')],
      ['amount', new PropertyValidator(this.customersPage, 'amount', /^\d*$/)],
      ['isLiableForMilitaryService', new PropertyValidator(this.customersPage, 'isLiableForMilitaryService')],    
    ]))
  }

  @action
  async getAuxiliaryInfo(): Promise<void> {
    this.auxiliary = await fetch(`https://localhost:5001/customers/auxiliary`)
      .then(response => response.json())
  }
}
