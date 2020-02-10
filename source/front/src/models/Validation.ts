import { Stateful, cached, action } from 'reactronic'

export class PropertyValidator<TValidatingObject> {
  constructor(
    public propertyName: keyof TValidatingObject,
    public validationRule?: RegExp,
  ) {
  }

  @cached
  isValid(validatingObject: TValidatingObject): boolean {
    let isValid = true
    if (this.validationRule && validatingObject) {
      const propertyValue = validatingObject[this.propertyName]
      isValid = RegExp(this.validationRule).test(`${propertyValue}`)
      // console.log(`${propertyValue} - ${this.validationRule}: ${isValid}`)
    }
    return isValid
  }
}

export class Validation<TValidatingObject> extends Stateful {
  constructor(
    public validatingObject: TValidatingObject,
    readonly validators: Map<keyof TValidatingObject, PropertyValidator<TValidatingObject>>) {
    super()
  }
 
  @action
  setValidationObject(validatingObject: TValidatingObject): void {
    this.validatingObject = validatingObject
  }

  isValid(propertyName: keyof TValidatingObject): boolean | undefined {
    return this.validators.get(propertyName)?.isValid(this.validatingObject)
  }

  areAllValid(): boolean | undefined {
    let isValid = true
    this.validators.forEach(v => isValid = isValid && v.isValid(this.validatingObject))
    return isValid
  }
}
