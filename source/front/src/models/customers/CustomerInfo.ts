import { Stateful, action, trigger } from 'reactronic'
import { Auxiliary } from '../BankOperations'
import { Validation, PropertyValidator } from '../Validation'
import { CustomerKeys, Customer } from './Customer'
import { CustomersPage } from './CustomersPage'

export class CustomerInfo extends Stateful {
  customersPage: CustomersPage
  validation: Validation<Customer>

  constructor(customersPage: CustomersPage) {
    super()
    this.customersPage = customersPage
    this.validation = new Validation(
      this.customersPage.selectedCustomer!,
      new Map([
        ['lastName', new PropertyValidator('lastName', /^([A-Z][a-z]*[\'\- ]?[A-Za-z]+)?$/)],
        ['firstName', new PropertyValidator('firstName', /^([A-Z][a-z]*[\'\- ]?[A-Za-z]+)?$/)],
        ['middleName', new PropertyValidator('middleName', /^([A-Z][a-z]*[\'\- ]?[A-Za-z]+)?$/)],
        ['dateOfBirth', new PropertyValidator('dateOfBirth', /^\d{4}-\d{2}-\d{2}$/)],
        ['gender', new PropertyValidator('gender')],
        ['series', new PropertyValidator('series', /^([A-Z]{2})?$/)],
        ['passportNumber', new PropertyValidator('passportNumber', /^(\d{7})?$/)],
        ['issuingAuthority', new PropertyValidator('issuingAuthority', /^[A-Za-z' ]*$/)],
        ['issuedAt', new PropertyValidator('issuedAt', /^\d{4}-\d{2}-\d{2}$/)],
        ['idNumber', new PropertyValidator('idNumber', /^([A-Z0-9]{14})?$/)],
        ['placeOfBirth', new PropertyValidator('placeOfBirth', /^[A-Za-z ]*$/)],
        ['placeOfLivingCityId', new PropertyValidator('placeOfLivingCityId')],
        ['placeOfLivingAddress', new PropertyValidator('placeOfLivingAddress')],
        ['placeOfRegistrationCityId', new PropertyValidator('placeOfRegistrationCityId')],
        ['placeOfRegistrationAddress', new PropertyValidator('placeOfRegistrationAddress', /[A-Za-z ]*/)],
        ['homePhoneNumber', new PropertyValidator('homePhoneNumber', /^(\+(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*)?$/)],
        ['mobilePhoneNumber', new PropertyValidator('mobilePhoneNumber', /^(\+(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*)?$/)],
        ['email', new PropertyValidator('email', /^((([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,}))?$/)],
        ['company', new PropertyValidator('company', /^[A-Za-z ]*$/)],
        ['position', new PropertyValidator('position', /^[A-Za-z ]*$/)],
        ['maritalStatusId', new PropertyValidator('maritalStatusId')],
        ['citizenshipId', new PropertyValidator('citizenshipId')],
        ['disabilityId', new PropertyValidator('disabilityId')],
        ['isRetired', new PropertyValidator('isRetired')],
        ['amount', new PropertyValidator('amount', /^\d*$/)],
        ['isLiableForMilitaryService', new PropertyValidator('isLiableForMilitaryService')],    
      ])
    )
  }

  @trigger
  updateSelectedCustomer(): void {
    if (this.customersPage.selectedCustomer) {
      this.validation.setValidationObject(this.customersPage.selectedCustomer)
    }
  }
}
