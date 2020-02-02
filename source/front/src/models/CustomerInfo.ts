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
      // ['birthInfo.dateOfBirth', new PropertyValidator(this.app, 'Date of birth')],
      // ['Gender', new PropertyValidator(this.app, 'Gender')],
      // ['Passport series', new PropertyValidator(this.app, 'Passport series', /'[A-Z]{2}'/)],
      // ['Passport number', new PropertyValidator(this.app, 'Passport number', /'\d{7}'/)],
      // ['Issuing authority', new PropertyValidator(this.app, 'Issuing authority', /'[A-Za-z ]+'/)],
      // ['Issued at', new PropertyValidator(this.app, 'Issued at')],
      // ['Id number', new PropertyValidator(this.app, 'Id number', /'[A-Z0-9]{14}'/)],
      // ['PlaceOfBirth', new PropertyValidator(this.app, 'PlaceOfBirth', /'[A-Za-z ]+'/)],
      // ['PlaceOfLiving', new PropertyValidator(this.app, 'PlaceOfLiving')],
      // ['PlaceOfRegistration', new PropertyValidator(this.app, 'PlaceOfRegistration', /'[A-Za-z ]+'/)],
      // ['Home phone number', new PropertyValidator(this.app, 'Home phone number', /'^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$'/)],
      // ['Mobile phone number', new PropertyValidator(this.app, 'Mobile phone number', /'^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$'/)],
      // ['Email', new PropertyValidator(this.app, 'Email', /'^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$'/)],
      // ['Company', new PropertyValidator(this.app, 'Company', /'[A-Za-z ]+'/)],
      // ['Position', new PropertyValidator(this.app, 'Position', /'[A-Za-z ]+'/)],
      // ['City of registration', new PropertyValidator(this.app, 'City of registration')],
      // ['Address of registration', new PropertyValidator(this.app, 'Address of registration', /'[A-Za-z ]+'/)],
      // ['Marital status', new PropertyValidator(this.app, 'Marital status')],
      // ['Citizenship', new PropertyValidator(this.app, 'Citizenship')],
      // ['Disability', new PropertyValidator(this.app, 'Disability')],
      // ['Is retired', new PropertyValidator(this.app, 'Is retired')],
      // ['Amount', new PropertyValidator(this.app, 'Amount', /'\d+'/)],
      // ['Is Liable For Military Service', new PropertyValidator(this.app, 'Is Liable For Military Service')],    
    ]))
  }

  @action
  async getAuxiliaryInfo(): Promise<void> {
    this.auxiliary = await fetch(`https://localhost:5001/customers/auxiliary`)
      .then(response => response.json())
  }
}
