import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../common/css'
import { App } from '../models/App'
import { style } from './AppWindow.css'
import { themes } from '../models/Theme'
import { cx } from 'emotion'
import { CustomerInfoPanel } from './CustomerInfoPanel'

export function AppWindow(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const customerListPlace = p.app.selectedCustomer ? dim(3, 2, 6, 12) : dim(4, 2, 10, 12)
    return (
      <div className={css.main}>
        <div className={css.menu} style={{...dim(1, 1, 12, 1)}}>
          <img style={{margin: '0 0.5em', width: '1.5em'}} src="assets/images/bank.png" onClick={() => themes.next()} />
          <div>
            Bank Information System
          </div>
        </div>
        <div className={css.sidebar} style={{...dim(1, 2, 1, 12)}}>
          {p.app.tabs.map((v, i) => (
            <div key={i} className={cx(css.sidebarElement, css.clicable)}
              is-selected={`${v === p.app.currentTab}`}
              onClick={() => p.app.setCurrentTab(v)}>
              {v.caption}
            </div>
          ))}
        </div>
        <div className={css.customerList} style={{...customerListPlace}}>
          {p.app.customers.map((v, i) => (
            <div key={i} className={css.customerListElement}
              is-selected={`${v === p.app.selectedCustomer}`}
              onClick={() => p.app.setSelectedCustomer(v)}>
              {`${v.firstName} ${v.lastName}`}
              <div className={'space'} />
              <div className={cx('edit', 'action', 'las la-pen')} style={{marginRight: '0.5em'}} />
              <div className={cx('edit', 'action', 'las la-trash')} />
            </div>
          ))}
        </div>
        {p.app.selectedCustomer && (
          <div className={css.customerInfoPanel} style={{...dim(8, 2, 12, 12), background: 'red'}}>
            <CustomerInfoPanel customerInfo={p.app.customerInfo} />
          </div>
        )}
      </div>
    )
  })
}
