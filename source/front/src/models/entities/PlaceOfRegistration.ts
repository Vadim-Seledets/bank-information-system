import { Stateful, action } from "reactronic"

export interface IPlaceOfRegistration {
  cityId: number
  address: string
}

export class PlaceOfRegistration extends Stateful {
  cityId: number
  address: string

  constructor(placeOfRegistration: IPlaceOfRegistration) {
    super()
    this.cityId = placeOfRegistration.cityId
    this.address = placeOfRegistration.address
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
