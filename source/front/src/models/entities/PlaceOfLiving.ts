import { Stateful } from "reactronic"

export interface IPlaceOfLiving {
  customerId: number
  city: string
  address: string
}

export class PlaceOfLiving extends Stateful {
  customerId: number
  city: string
  address: string

  constructor(placeOfLiving: IPlaceOfLiving) {
    super()
    this.customerId = placeOfLiving.customerId
    this.city = placeOfLiving.city
    this.address = placeOfLiving.address
  }
}
