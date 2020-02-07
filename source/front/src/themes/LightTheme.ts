import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class LightTheme extends Stateful implements ITheme {
  readonly name = "light"
  readonly applicationBackground = "#ffffff"
  readonly applicationBackgroundDemmed = "#17233e"
  readonly applicationForeground = "#101010"
  readonly buttonHover = "#666666"
  readonly menuBackground = "#16354e"
  readonly sidebarBackground = "#302f3e"
  readonly sidebarForeground = "#9897a9"
  readonly sidebarHoveredTabBackground = "#3a3948"
  readonly sidebarSelectedTabBackground = "#6dac37"
  readonly sidebarSelectedTabForeground = "#ffffff"
  readonly highlighter = "#6dac37"
  readonly markForeground = "red"
  readonly customerSearchBackground = "#ffffff"
  readonly customerSearchBorderColor = "grey"
  readonly customerListRowBottomBorder = "#111110"
  readonly customerListOddRowBackground = "#f9fafb"
  readonly customerListHoveredRowBackground = "#eaebec"
  readonly customerListHighlightedRowBackground = "#c7c8ca"
  readonly customerInfoBubbleBackground = "#e7e8ea"
  readonly customerInfoBubbleForeground = "grey"
  readonly customerInfoBubbleCaptionForeground = "#101010"
}
