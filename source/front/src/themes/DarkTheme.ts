import { Stateful } from 'reactronic'
import { ITheme } from '../models/Theme'

export class DarkTheme extends Stateful implements ITheme {
  readonly name = "Dark Apple Theme"
  readonly applicationBackground = "rgb(32, 32, 32)"
  readonly applicationForeground = "rgb(222, 222, 222)"
}
