import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Action, Reactronic as R, TraceLevel } from 'reactronic'
import { AppWindow } from './panels/AppWindow'
import { themes } from './models/Theme'
import { DarkTheme } from './themes/DarkTheme'
import { LightTheme } from './themes/LightTheme'
import { App } from './models/App'

R.setTrace(TraceLevel.Off)
R.repetitiveReadWarningThreshold = 0
R.performanceWarningThreshold = 0

Action.run("themes.register", () => themes.register(
  new DarkTheme(),
  new LightTheme(),
))

const app: App = Action.run("new App", () => new App())

const root = document.getElementById('root')
ReactDOM.render(<AppWindow key="app" app={app}/>, root)
