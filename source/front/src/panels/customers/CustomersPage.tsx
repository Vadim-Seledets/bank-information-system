import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './CustomersPage.css'
import { cx } from 'emotion'
import { Gender } from '../../models/customers/Gender'
import { CustomersPage } from '../../models/customers/CustomersPage'

export function CustomersPageView(p: { customersPage: CustomersPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={cx(css.addNewOrEditCustomerButton, 'headLineItem')} onClick={() => p.customersPage.addNewCustomer()}>
            <span className='las la-plus' style={{ marginRight: '0.5em' }} />
            <div>Add a New Customer</div>
          </button>
          <button className={cx(css.button, css.addNewOrEditCustomerButton, 'headLineItem')}
            is-visible={`${p.customersPage.selectedCustomer !== undefined}`}
            onClick={() => p.customersPage.editCustomerInfo()}
          >
            <span className='las la-pen' style={{ marginRight: '0.5em' }} />
            <div>Edit Customer</div>
          </button>
          <button className={cx(css.button, css.deleteButton)} is-visible={`${p.customersPage.selectedCustomer !== undefined}`}>
            <span className='las la-trash icon' style={{ marginRight: '0.5em' }} />
            <div onClick={() => p.customersPage.setDeleteIsRequested(!p.customersPage.deleteIsRequested)}>Delete Customer</div>
            <div className={css.deleteButtonYesNoButtonsContainer} is-visible={`${p.customersPage.deleteIsRequested}`}>
              <div className='yesButton'
                onClick={() => {
                  p.customersPage.deleteCustomerRequest(p.customersPage.selectedCustomer)
                  p.customersPage.setDeleteIsRequested(false)
                }}>Yes</div>
              <div className='noButton'
                onClick={() => p.customersPage.setDeleteIsRequested(false)}
              >No</div>
            </div>
          </button>
          <div className='space' />
          <div className={css.search}>
            <div className='las la-search icon' />
            <input className='input' type='text' placeholder='Search' value={p.customersPage.filter}
              onFocus={() => p.customersPage.setSelectedCustomer(undefined)}  
              onChange={e => p.customersPage.setFilter(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className={css.customerList} style={{ ...dim(2, 2, 11, 12) }}>
          <div style={{ ...dim(2, 1, 2, 1) }}>Gender</div>
          <div style={{ ...dim(4, 1, 4, 1) }}>Full name</div>
          <div style={{ ...dim(6, 1, 6, 1) }}>Email</div>
          {/* <div style={{ ...dim(8, 1, 8, 1) }}>Actions</div> */}
          <div style={{ ...dim(1, 1, 9, 1) }} className={`row`} />
          {p.customersPage.filteredCustomers.map((v, i) => (
            <React.Fragment key={i}>
              <div style={{ ...dim(2, i + 2, 2, i + 2) }}
                className={cx(v.gender === Gender.Female
                  ? 'las la-female'
                  : v.gender === Gender.Male
                    ? 'las la-male' : 'las la-genderless', 'icon')
                }
                onClick={() => p.customersPage.toggleCustomerSelection(v)}
                onPointerEnter={() => p.customersPage.setIsGenderHovered(true, i + 2)}
                onPointerLeave={() => p.customersPage.setIsGenderHovered(false, i + 2)}
              />
              <div style={{ ...dim(4, i + 2, 4, i + 2) }} className='fullName'
                onClick={() => p.customersPage.showCustomerInfo(v)}
                onPointerEnter={() => p.customersPage.setIsFullNameHovered(true, i + 2)}
                onPointerLeave={() => p.customersPage.setIsFullNameHovered(false, i + 2)}
                dangerouslySetInnerHTML={{__html: `${v.getFullName()}`}} 
              />
              <a style={{ ...dim(6, i + 2, 6, i + 2) }} className='email' href={`mailto:${v.email}`}
                onClick={() => p.customersPage.toggleCustomerSelection(v)}
                onPointerEnter={() => p.customersPage.setIsEmailHovered(true, i + 2)}
                onPointerLeave={() => p.customersPage.setIsEmailHovered(false, i + 2)}
              >{v.email}</a>
              <div style={{ ...dim(8, i + 2, 8, i + 2) }} className='icon'
                onClick={() => p.customersPage.toggleCustomerSelection(v)}
                onPointerEnter={() => p.customersPage.setIsActionsHovered(true, i + 2)}
                onPointerLeave={() => p.customersPage.setIsActionsHovered(false, i + 2)}
              >
                {v.infoErrors.hasAnyErrors && (
                  <div className='errors las la-exclamation'>
                    <div className='errorsPopUp'>
                      {v.infoErrors.error && <div className='errorRow'>{v.infoErrors.error}</div>}
                      {v.infoErrors.errors && (
                        v.infoErrors.errors.map((e, i) => (
                          <div key={i} className='errorRow'>{`${e.name}: ${e.message}`}</div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div style={{ ...dim(1, i + 2, 9, i + 2) }} className={`row rowHighlighter ${(i + 1) % 2 === 0 ? 'evenRow' : 'oddRow'}`}
                is-hovered={`${p.customersPage.isRowHovered(i + 2)}`}
                is-selected={`${p.customersPage.selectedCustomer === v}`}
                onClick={() => p.customersPage.toggleCustomerSelection(v)}
                onPointerEnter={() => p.customersPage.setIsRowWithCustomerHovered(true, i + 2)}
                onPointerLeave={() => p.customersPage.setIsRowWithCustomerHovered(false, i + 2)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  })
}
