import { Customer, ICustomer } from "./entities/Customer"

export class Api {
  constructor(public baseUrl: string) {
  }

  async getAllCustomers(): Promise<Array<Customer>> {
    const customersJson = await fetch(`${this.baseUrl}/customers`)
      .then(response => response.json())
    const customers = JSON.parse(customersJson) as ICustomer[]
    return customers.map(c => new Customer(c))
  }
}
