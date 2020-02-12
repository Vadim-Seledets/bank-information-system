import { Stateful, action, cached } from 'reactronic'

export interface IApiErrors {
  errors?: Array<{name: string, message: string}>
  error?: string
}

export class ApiErrors extends Stateful {
  errors = Array<{name: string, message: string}>()
  error = ''
  hasAnyErrors = false

  @action
  initialize(customerInfoErrors: IApiErrors): void {
    this.errors = customerInfoErrors.errors ?? []
    this.error = customerInfoErrors.error ?? ''
    /* TO BE REMOVED */
    const errorsWithoutName = this.errors.filter(v => v.name === '').map(v => v.message).join()
    if (errorsWithoutName !== '') {
      alert(errorsWithoutName)
    }
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

  @action
  deleteError(propertyName: string): void {
    if (this.errors) {
      const newErrors = new Array<{name: string, message: string}>()
      this.errors.forEach((e, i) => {
        if (e.name !== propertyName) {
          newErrors.push(e)
        }
      })
      this.errors = newErrors
    }
  }

  has(propertyName: string): boolean {
    let errorIsInList = false
    if (this.errors) {
      errorIsInList = this.errors.some(v => v.name === propertyName)
    }
    return errorIsInList
  }
}
