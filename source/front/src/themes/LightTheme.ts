import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class LightTheme extends Stateful implements ITheme {
  readonly name = "light"
  readonly applicationBackground = "#ffffff"
  readonly applicationBackgroundDemmed = "#17233E"
  readonly applicationForeground = "#101010"
  readonly buttonHover = "#666666"
  readonly menuBackground = "#16354E"
  readonly sidebarBackground = "#302F3E"
  readonly sidebarForeground = "#9897A9"
  readonly sidebarTabSelectedBackground = "#6DAC37"
  readonly sidebarTabSelectedForeground = "#FFFFFF"
  readonly highlighter = "#6DAC37"
}
