import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './CustomersPage.css'
import { commonStyle } from '../../common/CommonStyles.css'
import { cx } from 'emotion'
import { Gender } from '../../models/customers/Gender'
import { CustomersPage } from '../../models/customers/CustomersPage'

export function CustomersPageView(p: { customersPage: CustomersPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const commonCss = commonStyle.classes
    return (
      <div className={commonCss.main}>
        <div className={commonCss.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={cx(commonCss.button, css.addNewOrEditCustomerButton, 'headLineItem')} onClick={() => p.customersPage.addNewCustomer()}>
            <span className='las la-plus' style={{ marginRight: '0.5em' }} />
            <div>Add a New Customer</div>
          </button>
          <button className={cx(commonCss.button, css.button, css.addNewOrEditCustomerButton, 'headLineItem')}
            is-visible={`${p.customersPage.selectedCustomer !== undefined}`}
            onClick={() => p.customersPage.editCustomerInfo()}
          >
            <span className='las la-pen' style={{ marginRight: '0.5em' }} />
            <div>Edit Customer</div>
          </button>
          <div className='space' />
          <div className={commonCss.search}>
            <div className='las la-search icon' />
            <input className='input' type='text' placeholder='Search' value={p.customersPage.filter}
              onFocus={() => p.customersPage.setSelectedCustomer(undefined)}  
              onChange={e => p.customersPage.setFilter(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className={cx(commonCss.list, css.customerList)} style={{ ...dim(2, 2, 11, 12) }}>
          <div style={{ ...dim(2, 1, 2, 1) }}>Gender</div>
          <div style={{ ...dim(4, 1, 4, 1) }}>Full name</div>
          <div style={{ ...dim(6, 1, 6, 1) }}>Email</div>
          <div style={{ ...dim(1, 1, 9, 1) }} className={`rowBase`} />
          {p.customersPage.filteredCustomers.map((v, i) => (
            <React.Fragment key={i}>
              <div style={{ ...dim(2, i + 2, 2, i + 2) }}
                className={cx(v.gender === Gender.Female
                  ? 'las la-female'
                  : v.gender === Gender.Male
                    ? 'las la-male' : 'las la-genderless', 'icon', 'rowContent')
                }
                onClick={() => p.customersPage.toggleCustomerSelection(v)}
              />
              <div style={{ ...dim(4, i + 2, 4, i + 2) }} className='fullName rowContent'
                onClick={() => p.customersPage.showCustomerInfo(v)}
                dangerouslySetInnerHTML={{__html: `${v.getFullName()}`}} 
              />
              <a style={{ ...dim(6, i + 2, 6, i + 2) }} className='email rowContent' href={`mailto:${v.email}`}
                onClick={() => p.customersPage.toggleCustomerSelection(v)}
              >{v.email}</a>
              <div style={{ ...dim(1, i + 2, 9, i + 2) }} className={`rowBase row`}
                is-selected={`${p.customersPage.selectedCustomer?.id === v.id}`}
                is-odd={`${(i + 1) % 2 === 1}`}
                onClick={() => p.customersPage.toggleCustomerSelection(v)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  })
}
