import { Stateful, Action, action } from 'reactronic'

export interface ITheme {
  readonly name: string
  readonly applicationBackground: string
  readonly applicationForeground: string
}

export class BlankTheme extends Stateful implements ITheme {
  readonly name = "blank"
  readonly applicationBackground = ""
  readonly applicationForeground = ""
}

export class Themes extends Stateful {
  readonly all: ITheme[] = []
  active: ITheme = new BlankTheme()

  @action
  setActive(value: ITheme): void {
    this.active = value
  }

  @action
  next(): void {
    const i = (this.all.indexOf(this.active) + 1) % this.all.length
    this.active = this.all[i]
  }

  @action
  register(...themes: ITheme[]): void {
    themes.forEach(x => {
      this.all.push(x)
      if (this.all.length === 1)
        this.active = x
    })
  }
}

export const themes = Action.run("themes", () => new Themes())
