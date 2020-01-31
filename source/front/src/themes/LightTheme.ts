import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class LightTheme extends Stateful implements ITheme {
  readonly name = "light"
  readonly applicationBackground = "#ffffff"
  readonly applicationForeground = "#101010"
  readonly menuBackground = "#17233E"
  readonly sidebarBackground = "#202F53"
  readonly highlighter = "red"
}
