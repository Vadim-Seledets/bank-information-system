import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './EditCustomerInfoPage.css'
import { commonStyle } from '../../common/CommonStyles.css'
import { CustomerInfoPanel } from './CustomerInfoPanel'
import { CustomersPage } from '../../models/customers/CustomersPage'

export function EditCustomerInfoPageView(p: { customersPage: CustomersPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const commonCss = commonStyle.classes
    return (
      <div className={commonCss.main}>
        <div className={commonCss.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={css.editOrPublishButton}
            is-enabled={`${p.customersPage.customerInfo.validation.areAllValid(p.customersPage.selectedCustomer!)}`}
            onClick={() => p.customersPage.editOrPublishCustomer()}
          >
            {p.customersPage.selectedCustomer?.id
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
          <button className={commonCss.backButton} onClick={() => p.customersPage.cancelEditing()}>
            Cancel
          </button>
        </div>
        <div style={{ ...dim(2, 2, 11, 12) }}>
          <CustomerInfoPanel customerInfo={p.customersPage.customerInfo} />
        </div>
      </div>
    )
  })
}
