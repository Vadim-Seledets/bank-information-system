import { Stateful } from "reactronic"

export interface IWorkInfo {
  company: string
  position: string
}

export class WorkInfo extends Stateful {
  company: string
  position: string

  constructor(workInfo: IWorkInfo) {
    super()
    this.company = workInfo.company
    this.position = workInfo.position
  }
}
