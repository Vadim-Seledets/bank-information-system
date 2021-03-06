import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class DarkTheme extends Stateful implements ITheme {
  readonly name = "Dark Apple Theme"
  readonly applicationBackground = "#282827"
  readonly applicationForeground = "#ffffff"
  readonly buttonBackground = "#transparent"
  readonly buttonBorder = "none"
  readonly buttonBoxShadow = "0.1em 0.1em 0.3em rgba(127, 127, 127, 0.5)"
  readonly inputBackground = "#282827"
  readonly inputForeground = "#ffffff"
  readonly inputBorder = "1px solid #ffffff"
  readonly menuBackground = "#333332"
  readonly menuBottomBoxShadow = "transparent"
  readonly sidebarBackground = "#333331"
  readonly sidebarForeground = "#9897a9"
  readonly sidebarHoveredTabBackground = "#3a3948"
  readonly sidebarHoveredTabForeground = "#ffffff"
  readonly sidebarSelectedTabBackground = "#6dac37"
  readonly sidebarSelectedTabForeground = "#ffffff"
  readonly highlighter = "#6dac37"
  readonly markForeground = "#fbe03c"
  readonly emailForeground = "#629D30"
  readonly searchInputBackground = "#434341"
  readonly searchInputBorderBottom = "1px solid #7c7c7b"
  readonly listRowBottomBorder = "1px solid #111110"
  readonly listOddRowBackground = "#333332"
  readonly customerListHoveredRowBackground = "#414141"
  readonly customerListHighlightedRowBackground = "#0e5ccd"
  readonly customerInfoBubbleBackground = "#444441"
  readonly customerInfoBubbleForeground = "#9c9c9b"
  readonly customerInfoBubbleValueForeground = "#ffffff"
}
