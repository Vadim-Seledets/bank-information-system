import { Stateful, action, trigger } from 'reactronic'
import { Auxiliary } from './entities/Auxiliary'
import { App } from './App'
import { Validation, PropertyValidator } from './Validation'
import { CustomerKeys } from './entities/Customer'

export class CustomerInfo extends Stateful {
  app: App
  auxiliary: Auxiliary
  validation: Validation

  constructor(app: App) {
    super()
    this.app = app
    this.auxiliary = new Auxiliary()
    this.validation = new Validation(new Map<CustomerKeys, PropertyValidator>([
      ['lastName', new PropertyValidator(this.app, 'lastName', /^([A-Z][a-z]*[\'\- ]?[A-Za-z]+)?$/)],
      ['firstName', new PropertyValidator(this.app, 'firstName', /^([A-Z][a-z]*[\'\- ]?[A-Za-z]+)?$/)],
      ['middleName', new PropertyValidator(this.app, 'middleName', /^([A-Z][a-z]*[\'\- ]?[A-Za-z]+)?$/)],
      ['dateOfBirth', new PropertyValidator(this.app, 'dateOfBirth')],
      ['gender', new PropertyValidator(this.app, 'gender')],
      ['series', new PropertyValidator(this.app, 'series', /^[A-Z]{2}$/)],
      ['passportNumber', new PropertyValidator(this.app, 'passportNumber', /^\d{7}$/)],
      ['issuingAuthority', new PropertyValidator(this.app, 'issuingAuthority', /^[A-Za-z' ]+$/)],
      ['issuedAt', new PropertyValidator(this.app, 'issuedAt')],
      ['idNumber', new PropertyValidator(this.app, 'idNumber', /^[A-Z0-9]{14}$/)],
      ['placeOfBirth', new PropertyValidator(this.app, 'placeOfBirth', /^[A-Za-z ]+$/)],
      ['placeOfLivingCityId', new PropertyValidator(this.app, 'placeOfLivingCityId')],
      ['placeOfLivingAddress', new PropertyValidator(this.app, 'placeOfLivingAddress')],
      ['placeOfRegistrationCityId', new PropertyValidator(this.app, 'placeOfRegistrationCityId')],
      ['placeOfRegistrationAddress', new PropertyValidator(this.app, 'placeOfRegistrationAddress', /[A-Za-z ]+/)],
      ['homePhoneNumber', new PropertyValidator(this.app, 'homePhoneNumber', /^\+(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)],
      ['mobilePhoneNumber', new PropertyValidator(this.app, 'mobilePhoneNumber', /^\+(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)],
      ['email', new PropertyValidator(this.app, 'email', /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)],
      ['company', new PropertyValidator(this.app, 'company', /^[A-Za-z ]+$/)],
      ['position', new PropertyValidator(this.app, 'position', /^[A-Za-z ]+$/)],
      ['maritalStatusId', new PropertyValidator(this.app, 'maritalStatusId')],
      ['citizenshipId', new PropertyValidator(this.app, 'citizenshipId')],
      ['disabilityId', new PropertyValidator(this.app, 'disabilityId')],
      ['isRetired', new PropertyValidator(this.app, 'isRetired')],
      ['amount', new PropertyValidator(this.app, 'amount', /^\d+$/)],
      ['isLiableForMilitaryService', new PropertyValidator(this.app, 'isLiableForMilitaryService')],    
    ]))
  }

  @action
  async getAuxiliaryInfo(): Promise<void> {
    this.auxiliary = await fetch(`https://localhost:5001/customers/auxiliary`)
      .then(response => response.json())
  }
}
