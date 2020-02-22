import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class BlueTheme extends Stateful implements ITheme {
  readonly name = "purple"
  readonly applicationBackground = "#1B2F60"
  readonly applicationForeground = "#A9AEC2"
  readonly buttonBackground = "#17264F"
  readonly buttonBorder = "1px solid #5FA895"
  readonly buttonBoxShadow = "0 0 0.7em #5FA895"
  readonly menuBackground = "#1B2F60"
  readonly menuBottomBoxShadow = "#122448"
  readonly sidebarBackground = "#17264F"
  readonly sidebarForeground = "#9897a9"
  readonly sidebarHoveredTabBackground = "#17264F"
  readonly sidebarHoveredTabForeground = "#ffffff"
  readonly sidebarSelectedTabBackground = "#17264F"
  readonly sidebarSelectedTabForeground = "#ffffff"
  readonly highlighter = "#78CFB0"
  readonly markForeground = "#ff0000"
  readonly customerSearchBackground = "#ffffff"
  readonly customerSearchBorderColor = "grey"
  readonly customerListRowBottomBorder = "#111110"
  readonly customerListOddRowBackground = "#354670"
  readonly customerListHoveredRowBackground = "#465781"
  readonly customerListHighlightedRowBackground = "#6ECBA4"
  readonly customerInfoBubbleBackground = "#e7e8ea"
  readonly customerInfoBubbleForeground = "grey"
  readonly customerInfoBubbleValueForeground = "#101010"
}