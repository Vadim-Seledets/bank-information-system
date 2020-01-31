import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../common/css'
import { App } from '../models/App'
import { style } from './CustomersPage.css'
import { cx } from 'emotion'

export function CustomersPageView(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.actionsPanel} style={{...dim(1, 1, 12, 1), color: 'grey'}}>
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
    )
  })
}
