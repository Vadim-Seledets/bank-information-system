import { Customer, ICustomer } from "./entities/Customer"
import { Auxiliary } from "./entities/Auxiliary"

export class Api {
  constructor(public baseUrl: string) {
  }

  async getAllCustomersInShortInfoModel(): Promise<Array<Customer>> {
    const json = await fetch(`${this.baseUrl}/customers`)
      .then(response => response.json())
    const customers = json as ICustomer[]
    return customers.map(c => new Customer(c))
  }
  
  async getAuxiliaryInfo(): Promise<Auxiliary> {
    const json = await fetch(`${this.baseUrl}/customers/auxiliary`)
      .then(response => response.json())
    return json as Auxiliary
  }
}
