import { Stateful } from 'reactronic'

export class PropertyValidator<TValidatingObject> {
  constructor(
    public propertyName: keyof TValidatingObject,
    public validationRule?: RegExp,
  ) {
  }

  isValid(validatingObject: TValidatingObject): boolean {
    let isValid = true
    if (this.validationRule && validatingObject) {
      const propertyValue = validatingObject[this.propertyName]
      if (propertyValue !== undefined && propertyValue !== null) {
        isValid = RegExp(this.validationRule).test(`${propertyValue}`)
      }
    }
    return isValid
  }
}

export class Validation<TValidatingObject> extends Stateful {
  constructor(readonly validators: Map<keyof TValidatingObject, PropertyValidator<TValidatingObject>>) {
    super()
  }

  isValid(validatingObject: TValidatingObject, propertyName: keyof TValidatingObject): boolean | undefined {
    let isValid = true
    const validator = this.validators.get(propertyName)
    if (validator) {
      isValid = validator.isValid(validatingObject)
    }
    return isValid
  }

  areAllValid(validatingObject: TValidatingObject): boolean | undefined {
    let isValid = true
    this.validators.forEach(v => isValid = isValid && v.isValid(validatingObject))
    return isValid
  }
}
