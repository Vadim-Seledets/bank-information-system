import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { App } from '../../models/App'
import { style } from './EditCustomerInfoPage.css'
import { CustomerInfoPanel } from './CustomerInfoPanel'

export function EditCustomerInfoPageView(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={css.editOrPublishButton}
            is-enabled={`${p.app.customerInfo.validation.areAllValid()}`}
            onClick={() => p.app.editOrPublishCustomer()}
          >
            {p.app.selectedCustomer?.id
              ? (
                <React.Fragment>
                  <span className='las la-pen' style={{ marginRight: '0.5em' }} />
                  Edit Customer&#39;s info
                </React.Fragment>)
              : (
                <React.Fragment>
                  <span className='las la-upload' style={{ marginRight: '0.5em' }} />
                  Publish a New Customer
                </React.Fragment>)
            }
          </button>
          <div className='space' />
          <button className={css.backButton} onClick={() => p.app.setCurrentPageName('CustomersListPage')}>
            Back
          </button>
        </div>
        <div style={{ ...dim(2, 2, 11, 12) }}>
          <CustomerInfoPanel customerInfo={p.app.customerInfo} />
        </div>
      </div>
    )
  })
}
