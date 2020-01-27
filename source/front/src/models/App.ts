import { Stateful, action } from 'reactronic'

const url = ""

export class App extends Stateful {
  constructor() {
    super()
  }

  @action
  addCustomer(): void {
    const data = { firstName: "Vadim" }
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data),
    }).then(response => response.json())
  }
}
