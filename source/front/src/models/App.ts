import { Stateful } from 'reactronic'
import { Api } from './Api'

export class App extends Stateful {
  api = new Api('')

  constructor() {
    super()
  }
}
