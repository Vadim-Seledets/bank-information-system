import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class DarkTheme extends Stateful implements ITheme {
  readonly name = "Dark Apple Theme"
  readonly applicationBackground = "#282827"
  readonly applicationBackgroundDemmed = "#444444"
  readonly applicationForeground = "#FFFFFF"
  readonly buttonHover = "#bbbbbb"
  readonly menuBackground = "#333332"
  readonly sidebarBackground = "#333331"
  readonly sidebarForeground = "#9897A9"
  readonly sidebarHoveredTabBackground = "#3a3948"
  readonly sidebarSelectedTabBackground = "#6dac37"
  readonly sidebarSelectedTabForeground = "#FFFFFF"
  readonly highlighter = "#6dac37"
  readonly customerSearchBackground = "#434341"
  readonly customerSearchBorderColor = "#727270"
  readonly customerListOddRowBackground = "#333332"
  readonly customerListHoveredRowBackground = "#666662"
  readonly customerListHighlightedRowBackground = "#0e5ccd"
}
