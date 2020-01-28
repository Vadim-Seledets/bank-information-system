import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../common/css'
import { App } from '../models/App'
import { style } from './AppWindow.css'
import { themes } from '../models/Theme'
import { cx } from 'emotion'

export function AppWindow(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.menu} style={{...dim(1, 1, 3, 1)}}>
          <img style={{height: "100%"}} src="assets/images/bank.png" onClick={() => themes.next()} />
          <div onClick={() => {}}>Accounts</div>
          <div onClick={() => {}}>Deposits</div>
        </div>
        <div style={{...dim(2, 2, 2, 2)}}>
          <div className={cx(css.property)}>
            <div className={cx(css.propertyCaption)}>First name</div>
            <input className={cx(css.propertyInput)} type="text"/>
          </div>
        </div>
        {/* <button onClick={}>Apply</button> */}
      </div>
    )
  })
}
