import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class DarkTheme extends Stateful implements ITheme {
  readonly name = "Dark Apple Theme"
  readonly applicationBackground = "#282827"
  readonly applicationBackgroundDemmed = "#444444"
  readonly applicationForeground = "#ffffff"
  readonly buttonHover = "#bbbbbb"
  readonly menuBackground = "#333332"
  readonly sidebarBackground = "#333331"
  readonly sidebarForeground = "#9897a9"
  readonly sidebarHoveredTabBackground = "#3a3948"
  readonly sidebarSelectedTabBackground = "#6dac37"
  readonly sidebarSelectedTabForeground = "#ffffff"
  readonly highlighter = "#6dac37"
  readonly markForeground = "yellow"
  readonly customerSearchBackground = "#434341"
  readonly customerSearchBorderColor = "#7c7c7b"
  readonly customerListRowBottomBorder = "#111110"
  readonly customerListOddRowBackground = "#333332"
  readonly customerListHoveredRowBackground = "#414141"
  readonly customerListHighlightedRowBackground = "#0e5ccd"
  readonly customerInfoBubbleBackground = "#333331"
  readonly customerInfoBubbleForeground = "#9c9c9b"
  readonly customerInfoBubbleCaptionForeground = "#ffffff"
}
