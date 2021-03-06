import { Stateful, action } from 'reactronic'

export interface IApiErrors {
  errors?: Array<{name: string, message: string}>
  error?: string
}

export class ApiErrors extends Stateful {
  errors = Array<{name: string, message: string}>()
  error = ''
  hasAnyErrors = false

  constructor(apiErrors: IApiErrors) {
    super()
    this.errors = apiErrors.errors ?? []
    this.error = apiErrors.error ?? ''
  }

  @action
  setHasErrors(value: boolean): void {
    this.hasAnyErrors = value
  }

  getMainError(): string {
    const mainError = this.error.length > 0 ? this.error.slice(0, this.error.length - 1) : ''
    return mainError
  }

  getPropertyErrors(propertyName: string): Array<string> {
    let errors = new Array<string>()
    if (this.errors) {
      errors = this.errors.filter(v => v.name === propertyName).map(v => {
        const messageWithoutName = v.message.replace(/^'.*' /, '')
        const fancyMessage = messageWithoutName.charAt(0).toUpperCase()
          + messageWithoutName.slice(1, messageWithoutName.length - 1)
        return fancyMessage
      })
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
