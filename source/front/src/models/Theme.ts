import { Stateful, Action, action } from 'reactronic'

export interface ITheme {
  readonly name: string
  readonly applicationBackground: string
  readonly applicationForeground: string
  readonly buttonBackground: string
  readonly buttonBorder: string
  readonly buttonBoxShadow: string
  readonly inputBackground: string
  readonly inputForeground: string
  readonly inputBorder: string
  readonly menuBackground: string
  readonly menuBottomBoxShadow: string
  readonly sidebarBackground: string
  readonly sidebarForeground: string
  readonly sidebarHoveredTabBackground: string
  readonly sidebarHoveredTabForeground: string
  readonly sidebarSelectedTabBackground: string
  readonly sidebarSelectedTabForeground: string
  readonly highlighter: string
  readonly markForeground: string
  readonly searchInputBackground: string
  readonly searchInputBorderBottom: string
  readonly listRowBottomBorder: string
  readonly listOddRowBackground: string
  readonly customerListHoveredRowBackground: string
  readonly customerListHighlightedRowBackground: string
  readonly customerInfoBubbleBackground: string
  readonly customerInfoBubbleForeground: string
  readonly customerInfoBubbleValueForeground: string
}

export class BlankTheme extends Stateful implements ITheme {
  readonly name = "blank"
  readonly applicationBackground = ""
  readonly applicationForeground = ""
  readonly buttonBackground = ""
  readonly buttonBorder = ""
  readonly buttonBoxShadow = ""
  readonly inputBackground = ""
  readonly inputForeground = ""
  readonly inputBorder = ""
  readonly menuBackground = ""
  readonly menuBottomBoxShadow = ""
  readonly sidebarBackground = ""
  readonly sidebarForeground = ""
  readonly sidebarHoveredTabBackground = ""
  readonly sidebarHoveredTabForeground = ""
  readonly sidebarSelectedTabBackground = ""
  readonly sidebarSelectedTabForeground = ""
  readonly highlighter = ""
  readonly markForeground = ""
  readonly searchInputBackground = ""
  readonly searchInputBorderBottom = ""
  readonly listRowBottomBorder = ""
  readonly listOddRowBackground = ""
  readonly customerListHoveredRowBackground = ""
  readonly customerListHighlightedRowBackground = ""
  readonly customerInfoBubbleBackground = ""
  readonly customerInfoBubbleForeground = ""
  readonly customerInfoBubbleValueForeground = ""
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
