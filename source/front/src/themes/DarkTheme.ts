import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class DarkTheme extends Stateful implements ITheme {
  readonly name = "Dark Apple Theme"
  readonly applicationBackground = "#222222"
  readonly applicationForeground = "#FFFFFF"
  readonly menuBackground = "#2B2C33"
  readonly sidebarBackground = "#2B2C33"
  readonly highlighter = "blue"
}
