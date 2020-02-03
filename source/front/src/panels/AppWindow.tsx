import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../common/css'
import { App } from '../models/App'
import { style } from './AppWindow.css'
import { themes } from '../models/Theme'
import { cx } from 'emotion'
import { CustomersPageView } from './customers/CustomersPage'
import { EditCustomerInfoPageView } from './customers/EditCustomerInfoPage'

export function AppWindow(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.menu} style={{ ...dim(1, 1, 12, 1) }}>
          <img style={{ margin: '0 0.5em', width: '1.2em' }} src="assets/images/bank.png" onClick={() => themes.next()} />
          <div style={{ color: '#dddddd' }}>
            Bank Information System
          </div>
        </div>
        <div className={css.sidebar} style={{ ...dim(1, 2, 1, 12) }}>
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
        {p.app.currentTab?.name === 'customers' && (
          <React.Fragment>
            {!p.app.selectedCustomer && (
              <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                <CustomersPageView app={p.app} />
              </div>
            )}
            {p.app.selectedCustomer && (
              <React.Fragment>
                <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                  <EditCustomerInfoPageView app={p.app} />
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    )
  })
}
