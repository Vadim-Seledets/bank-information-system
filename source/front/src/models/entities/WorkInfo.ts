import { Stateful, action } from "reactronic"

export interface IWorkInfo {
  company: string
  position: string
}

export class WorkInfo extends Stateful {
  company: string = ''
  position: string = ''

  @action
  initialize(workInfo: IWorkInfo): void {
    this.company = workInfo.company
    this.position = workInfo.position
  }

  @action
  setCompany(value: string): void {
    this.company = value
  }

  @action
  setPosition(value: string): void {
    this.position = value
  }
}
