import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class DarkTheme extends Stateful implements ITheme {
  readonly name = "Dark Apple Theme"
  readonly applicationBackground = "#222222"
  readonly applicationBackgroundDemmed = "#444444"
  readonly applicationForeground = "#FFFFFF"
  readonly menuBackground = "#35363A"
  readonly sidebarBackground = "#35363A"
  readonly highlighter = "blue"
}
