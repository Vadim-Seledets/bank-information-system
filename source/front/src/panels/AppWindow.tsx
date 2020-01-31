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
    const customersPagePlace = p.app.selectedCustomer ? dim(3, 2, 6, 12) : dim(4, 2, 10, 12)
    // const customerListAddButtonPlace = p.app.selectedCustomer ? dim(7, 2, 7, 2) : dim(11, 2, 11, 2)
    return (
      <div className={css.main}>
        <div className={css.menu} style={{...dim(1, 1, 12, 1)}}>
          <img style={{margin: '0 0.5em', width: '1.2em'}} src="assets/images/bank.png" onClick={() => themes.next()} />
          <div>
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
        <div className={css.customersPage} style={{...customersPagePlace}}>
          <div className={css.actionPanel} style={{...dim(1, 1, 12, 1), color: 'grey'}}>
            <div className='addNewCustomerButton'>
              Add a New Customer
            </div>
            <input className='search' type='text' placeholder='Find a Customer...'/>
          </div>
          <div className={css.customerList} style={{... dim(1, 2, 12, 12)}}>
            {p.app.customers.map((v, i) => (
              <div key={i} className={css.customerListElement}
                is-selected={`${v === p.app.selectedCustomer}`}
                onClick={() => p.app.setSelectedCustomer(v)}>
                {`${i+1}. ${v.firstName}`}
                <div className={'space'} />
                <div className={cx('edit', 'action', 'las la-pen')} style={{marginRight: '0.5em'}} />
                <div className={cx('edit', 'action', 'las la-trash')} />
              </div>
            ))}
          </div>
        </div>
        {p.app.selectedCustomer && (
          <React.Fragment>
            <div className={css.editPanelCaption} style={{...dim(8, 2, 11, 2)}}>
              Edit customer information
            </div>
            <div className={css.actionsOnEditPanel} style={{...dim(12, 2, 12, 2)}}>
              <button className={css.editButton}>Edit</button>
              <div className={cx(css.closeEditPanel, 'las la-times')}></div>
            </div>
            <div className={css.customerInfoPanel} style={{...dim(8, 3, 11, 12)}}>
              <CustomerInfoPanel customerInfo={p.app.customerInfo} />
            </div>
          </React.Fragment>
        )}
      </div>
    )
  })
}
