import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../common/css'
import { App } from '../models/App'
import { style } from './EditCustomerInfoPage.css'
import { CustomerInfoPanel } from './CustomerInfoPanel'

export function EditCustomerInfoPageView(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.actionsPanel} style={{...dim(1, 1, 12, 1), color: 'grey'}}>
          <div className='editButton'>
            Edit
          </div>
        </div>
        <div style={{...dim(1, 2, 12, 12), display: 'flex', overflow: 'scroll'}}>
          <CustomerInfoPanel customerInfo={p.app.customerInfo} />
        </div>
      </div>
    )
  })
}
