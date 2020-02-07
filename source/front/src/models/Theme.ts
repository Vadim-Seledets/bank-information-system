import { Stateful, Action, action } from 'reactronic'

export interface ITheme {
  readonly name: string
  readonly applicationBackground: string
  readonly applicationBackgroundDemmed: string
  readonly applicationForeground: string
  readonly buttonHover: string
  readonly menuBackground: string
  readonly sidebarBackground: string
  readonly sidebarForeground: string
  readonly sidebarHoveredTabBackground: string
  readonly sidebarSelectedTabBackground: string
  readonly sidebarSelectedTabForeground: string
  readonly highlighter: string
  readonly markForeground: string
  readonly customerSearchBackground: string
  readonly customerSearchBorderColor: string
  readonly customerListRowBottomBorder: string
  readonly customerListOddRowBackground: string
  readonly customerListHoveredRowBackground: string
  readonly customerListHighlightedRowBackground: string
}

export class BlankTheme extends Stateful implements ITheme {
  readonly name = "blank"
  readonly applicationBackground = ""
  readonly applicationBackgroundDemmed = ""
  readonly applicationForeground = ""
  readonly buttonHover = ""
  readonly menuBackground = ""
  readonly sidebarBackground = ""
  readonly sidebarForeground = ""
  readonly sidebarHoveredTabBackground = ""
  readonly sidebarSelectedTabBackground = ""
  readonly sidebarSelectedTabForeground = ""
  readonly highlighter = ""
  readonly markForeground = ""
  readonly customerSearchBackground = ""
  readonly customerSearchBorderColor = ""
  readonly customerListRowBottomBorder = ""
  readonly customerListOddRowBackground = ""
  readonly customerListHoveredRowBackground = ""
  readonly customerListHighlightedRowBackground = ""
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
