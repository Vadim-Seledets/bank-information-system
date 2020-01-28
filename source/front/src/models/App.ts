import { Stateful, action } from 'reactronic'

const url = 'https://localhost:5001/test/hello'

export class App extends Stateful {
  constructor() {
    super()
  }

  @action
  addCustomer(): void {
    // const data = { firstName: "Vadim" }
    fetch(url).then((response) => {
      console.log(response)
    })
  }
}
