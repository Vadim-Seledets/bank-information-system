import { Stateful } from 'reactronic'

type TabName = 'customers' | 'deposits' | 'loans' | 'atm'

export class Tab extends Stateful{
  constructor(
    public name: TabName,
    public caption: string,
    public icon: string) {
    super()
  }
}
