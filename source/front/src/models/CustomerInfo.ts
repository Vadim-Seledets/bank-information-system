import { Stateful, action, trigger } from 'reactronic'
import { Auxiliary } from './entities/Auxiliary'
import { App } from './App'

// export class CustomerInfoProperty extends Stateful {
//   constructor(
//     public name: string,
//     public type: string,
//     public validation?: string,
//   ) {
//     super()
//   }

//   @action
//   validate(value: string): boolean {
//     return this.validation ? RegExp(this.validation).test(value) : true
//   }
// }

export class CustomerInfo extends Stateful {
  app: App
  auxiliary = new Auxiliary()
  
  // properties = Array<CustomerInfoProperty>(
  //   new CustomerInfoProperty('Last name', 'text', '[A-Z][a-z]*([\'\- ][A-Z][a-z]+)*'),
  //   new CustomerInfoProperty('First name', 'text', '[A-Z][a-z]*([\'\- ][A-Z][a-z]+)*'),
  //   new CustomerInfoProperty('Middle name', 'text', '[A-Z][a-z]*([\'\- ][A-Z][a-z]+)*'),
  //   new CustomerInfoProperty('Date of birth', 'date'),
  //   new CustomerInfoProperty('Gender', 'radio'),
  //   new CustomerInfoProperty('Passport series', 'text', '[A-Z]{2}'),
  //   new CustomerInfoProperty('Passport number', 'text', '\d{7}'),
  //   new CustomerInfoProperty('Issuing authority', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('Issued at', 'date'),
  //   new CustomerInfoProperty('Id number', 'text', '[A-Z0-9]{14}'),
  //   new CustomerInfoProperty('PlaceOfBirth', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('PlaceOfLiving', 'list'),
  //   new CustomerInfoProperty('PlaceOfRegistration', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('Home phone number', 'text', '^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$'),
  //   new CustomerInfoProperty('Mobile phone number', 'text', '^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$'),
  //   new CustomerInfoProperty('Email', 'text', '^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$'),
  //   new CustomerInfoProperty('Company', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('Position', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('City of registration', 'list'),
  //   new CustomerInfoProperty('Address of registration', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('Marital status', 'list'),
  //   new CustomerInfoProperty('Citizenship', 'list'),
  //   new CustomerInfoProperty('Disability', 'list'),
  //   new CustomerInfoProperty('Is retired', 'checkbox'),
  //   new CustomerInfoProperty('Amount', 'money', '\d+'),
  //   new CustomerInfoProperty('Is Liable For Military Service', 'checkbox'),
  // )

  constructor(app: App) {
    super()
    this.app = app
  }

  @action
  async getAuxiliaryInfo(): Promise<void> {
    this.auxiliary = await fetch(`https://localhost:5001/customers/auxiliary`)
      .then(response => response.json())
  }
}
