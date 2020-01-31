import { Stateful } from "reactronic"

export interface IPlaceOfLiving {
  cityId: number
  address: string
}

export class PlaceOfLiving extends Stateful {
  cityId: number
  address: string

  constructor(placeOfLiving: IPlaceOfLiving) {
    super()
    this.cityId = placeOfLiving.cityId
    this.address = placeOfLiving.address
  }
}
