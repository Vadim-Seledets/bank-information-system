import { Stateful, action, trigger } from 'reactronic'
import { PageName } from './App'

type TabName = 'customers' | 'deposits' | 'loans' | 'atm'

export class Tab extends Stateful{
  constructor(
    public name: TabName,
    public caption: string,
    public currentPage: PageName,
    public icon: string
  ) {
    super()
  }

  @action
  setCurrentPageName(pageName: PageName): void {
    this.currentPage = pageName
  }
}
