import { Stateful } from 'reactronic'

export class Errors extends Stateful {
  errors?: Array<{name: string, message: string}>
  error?: string
}
