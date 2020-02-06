import { Stateful, trigger } from 'reactronic'
import { App } from './App'
import { CustomerKeys } from './customers/Customer'

export class PropertyValidator extends Stateful {
  constructor(
    public app: App,
    public propertyName: CustomerKeys,
    public validationRule?: RegExp,
  ) {
    super()
  }

  @trigger
  isValid(): boolean {
    let isValid = true
    if (this.validationRule && this.app.selectedCustomer) {
      const propertyValue = this.app.selectedCustomer[this.propertyName]
      isValid = RegExp(this.validationRule).test(`${propertyValue}`)
      // console.log(`${propertyValue} - ${this.validationRule}: ${isValid}`)
    }
    return isValid
  }
}

export class Validation extends Stateful {
  constructor(readonly validators: Map<CustomerKeys, PropertyValidator>) {
    super()
  }
 
  isValid(propertyName: CustomerKeys): boolean | undefined {
    return this.validators.get(propertyName)?.isValid()
  }

  areAllValid(): boolean | undefined {
    let isValid = true
    this.validators.forEach(v => isValid = isValid && v.isValid())
    return isValid
  }
}
