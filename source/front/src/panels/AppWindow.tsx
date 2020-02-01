import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../common/css'
import { App } from '../models/App'
import { style } from './AppWindow.css'
import { themes } from '../models/Theme'
import { cx } from 'emotion'
import { CustomersPageView } from './CustomersPage'
import { EditCustomerInfoPageView } from './EditCustomerInfoPage'

export function AppWindow(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const customersPagePlace = p.app.selectedCustomer ? dim(3, 2, 6, 12) : dim(4, 2, 10, 12)
    return (
      <div className={css.main}>
        <div className={css.menu} style={{...dim(1, 1, 12, 1)}}>
          <img style={{margin: '0 0.5em', width: '1.2em'}} src="assets/images/bank.png" onClick={() => themes.next()} />
          <div style={{color: '#aaaaaa'}}>
            Bank Information System
          </div>
        </div>
        <div className={css.sidebar} style={{...dim(1, 2, 1, 12)}}>
          {p.app.tabs.map((v, i) => (
            <div key={i} className={cx(css.sidebarElement, css.clicable)}
              is-selected={`${v === p.app.currentTab}`}
              onClick={() => p.app.setCurrentTab(v)}
            >
              <div className={`icon ${v.icon}`} />
              <div className={'caption'}>{v.caption}</div>
            </div>
          ))}
        </div>
        <div style={{...customersPagePlace}}>
          <CustomersPageView app={p.app} />
        </div>
        {p.app.selectedCustomer && (
          <div style={{...dim(8, 2, 11, 12)}}>
            <EditCustomerInfoPageView app={p.app} />
          </div>
        )}
      </div>
    )
  })
}
