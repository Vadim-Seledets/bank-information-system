import { Stateful, action } from "reactronic"

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

  @action
  setCityId(id: number): void {
    this.cityId = id
  }

  @action
  setAddress(value: string): void {
    this.address = value
  }
}
