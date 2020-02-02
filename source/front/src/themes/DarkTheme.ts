import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class DarkTheme extends Stateful implements ITheme {
  readonly name = "Dark Apple Theme"
  readonly applicationBackground = "#222222"
  readonly applicationBackgroundDemmed = "#444444"
  readonly applicationForeground = "#FFFFFF"
  readonly buttonHover = "#bbbbbb"
  readonly menuBackground = "#16354E"
  readonly sidebarBackground = "#35363A"
  readonly sidebarForeground = "#9897A9"
  readonly sidebarHoveredTabBackground = "#3a3948"
  readonly sidebarSelectedTabBackground = "#6DAC37"
  readonly sidebarSelectedTabForeground = "#FFFFFF"
  readonly highlighter = "blue"
}
