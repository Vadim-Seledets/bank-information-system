import { Auxiliary } from "./entities/Auxiliary"

export class Api {
  constructor(public baseUrl: string) {
  }
  
  async getAuxiliaryInfo(): Promise<Auxiliary> {
    const json = await fetch(`${this.baseUrl}/customers/auxiliary`)
      .then(response => response.json())
    return json as Auxiliary
  }
}
