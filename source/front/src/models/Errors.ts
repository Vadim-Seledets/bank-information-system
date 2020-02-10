import { Stateful, action } from 'reactronic'

export interface IInfoErrors {
  errors?: Array<{name: string, message: string}>
  error?: string
}

export class InfoErrors extends Stateful {
  errors = Array<{name: string, message: string}>()
  error = ''
  hasAnyErrors = false

  @action
  initialize(customerInfoErrors: IInfoErrors): void {
    this.errors = customerInfoErrors.errors ?? []
    this.error = customerInfoErrors.error ?? ''
  }

  @action
  setHasErrors(value: boolean): void {
    this.hasAnyErrors = value
  }

  getPropertyErrors(propertyName: string): Array<string> {
    let errors = new Array<string>()
    if (this.errors) {
      errors = this.errors.filter(v => v.name === propertyName).map(v => v.message)
    }
    return errors
  }

  getAllErrors(): Map<string, Array<string>> {
    const errors = new Map<string, Array<string>>()
    if (this.errors) {
      this.errors.forEach(v => {
        const messages = errors.get(v.name)
        if (messages) {
          messages.push(v.message)
        } else {
          errors.set(v.name, new Array<string>(v.message))
        }
      })
    }
    return errors
  }

  has(propertyName: string): boolean {
    let errorIsInList = false
    if (this.errors) {
      errorIsInList = this.errors.some(v => v.name === propertyName)
    }
    return errorIsInList
  }
}
