import { Stateful } from 'reactronic'
import { Api } from './Api'

export class App extends Stateful {
  api = new Api('https://localhost:5001')

  constructor() {
    super()
  }
}
