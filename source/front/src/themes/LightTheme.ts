import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class LightTheme extends Stateful implements ITheme {
  readonly name = "light"
  readonly applicationBackground = "#ffffff"
  readonly applicationForeground = "#101010"
  readonly buttonBackground = "transparent"
  readonly buttonBorder = "none"
  readonly buttonBoxShadow = "0.1em 0.1em 0.3em rgba(127, 127, 127, 0.5)"
  readonly inputBackground = "#ffffff"
  readonly inputForeground = "#101010"
  readonly inputBorder = "1px solid #101010"
  readonly menuBackground = "#16354e"
  readonly menuBottomBoxShadow = "transparent"
  readonly sidebarBackground = "#302f3e"
  readonly sidebarForeground = "#9897a9"
  readonly sidebarHoveredTabBackground = "#3a3948"
  readonly sidebarHoveredTabForeground = "#ffffff"
  readonly sidebarSelectedTabBackground = "#6dac37"
  readonly sidebarSelectedTabForeground = "#ffffff"
  readonly highlighter = "#6dac37"
  readonly markForeground = "#ff0000"
  readonly emailForeground = "#629D30"
  readonly searchInputBackground = "#ffffff"
  readonly searchInputBorderBottom = "1px solid grey"
  readonly listRowBottomBorder = "1px solid #111110"
  readonly listOddRowBackground = "#f9fafb"
  readonly customerListHoveredRowBackground = "#eaebec"
  readonly customerListHighlightedRowBackground = "#c7c8ca"
  readonly customerInfoBubbleBackground = "#e7e8ea"
  readonly customerInfoBubbleForeground = "grey"
  readonly customerInfoBubbleValueForeground = "#101010"
}
