import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class LightTheme extends Stateful implements ITheme {
  readonly name = "light"
  readonly applicationBackground = "#e0e0e0"
  readonly applicationForeground = "#222222"
}
