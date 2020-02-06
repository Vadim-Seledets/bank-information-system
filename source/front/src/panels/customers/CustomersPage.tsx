import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { App } from '../../models/App'
import { style } from './CustomersPage.css'
import { cx } from 'emotion'
import { Gender } from '../../models/entities/Gender'

export function CustomersPageView(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={cx(css.addNewOrEditCustomerButton, 'headLineItem')} onClick={() => p.app.addNewCustomer()}>
            <span className='las la-plus' style={{ marginRight: '0.5em' }} />
            <div>Add a New Customer</div>
          </button>
          <button className={cx(css.button, css.addNewOrEditCustomerButton, 'headLineItem')}
            is-visible={`${p.app.selectedCustomer !== undefined}`}
            onClick={() => p.app.editCustomer()}
          >
            <span className='las la-pen' style={{ marginRight: '0.5em' }} />
            <div>Edit Customer</div>
          </button>
          <button className={cx(css.button, css.deleteButton)} is-visible={`${p.app.selectedCustomer !== undefined}`}>
            <span className='las la-trash icon' style={{ marginRight: '0.5em' }} />
            <div onClick={() => p.app.setDeleteIsRequested(!p.app.deleteIsRequested)}>Delete Customer</div>
            <div className={css.deleteButtonYesNoButtonsContainer} is-visible={`${p.app.deleteIsRequested}`}>
              <div className='yesButton'
                onClick={() => {
                  p.app.deleteCustomer(p.app.selectedCustomer)
                  p.app.setDeleteIsRequested(false)
                }}>Yes</div>
              <div className='noButton'
                onClick={() => p.app.setDeleteIsRequested(false)}
              >No</div>
            </div>
          </button>
          <div className='space' />
          <div className={css.search}>
            <div className='las la-search icon' />
            <input className='input' type='text' placeholder='Search'
              onFocus={() => p.app.setSelectedCustomer(undefined)}  
              onChange={e => p.app.setFilter(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className={css.customerList} style={{ ...dim(2, 2, 11, 12) }}>
          <div style={{ ...dim(2, 1, 2, 1) }}>Gender</div>
          <div style={{ ...dim(4, 1, 4, 1) }}>Full name</div>
          <div style={{ ...dim(6, 1, 6, 1) }}>Email</div>
          {/* <div style={{ ...dim(8, 1, 8, 1) }}>Actions</div> */}
          <div style={{ ...dim(1, 1, 9, 1) }} className={`row`} />
          {p.app.filteredCustomers.map((v, i) => (
            <React.Fragment key={i}>
              <div style={{ ...dim(2, i + 2, 2, i + 2) }}
                className={cx(v.gender === Gender.Female
                  ? 'las la-female'
                  : v.gender === Gender.Male
                    ? 'las la-male' : 'las la-genderless', 'icon')
                }
                onPointerEnter={() => p.app.setIsGenderHovered(true, i + 2)}
                onPointerLeave={() => p.app.setIsGenderHovered(false, i + 2)}
              />
              <div style={{ ...dim(4, i + 2, 4, i + 2) }} className='fullName'
                onClick={() => {
                  p.app.setSelectedCustomer(v)
                  p.app.setCurrentPageName('CustomerInfoPage')
                }}
                onPointerEnter={() => p.app.setIsFullNameHovered(true, i + 2)}
                onPointerLeave={() => p.app.setIsFullNameHovered(false, i + 2)}
                dangerouslySetInnerHTML={{__html: `${v.getFullName()}`}} 
              />
              <a style={{ ...dim(6, i + 2, 6, i + 2) }} className='email' href={`mailto:${v.email}`}
                onPointerEnter={() => p.app.setIsEmailHovered(true, i + 2)}
                onPointerLeave={() => p.app.setIsEmailHovered(false, i + 2)}
              >{v.email}</a>
              <div style={{ ...dim(8, i + 2, 8, i + 2) }} className='icon'
                onPointerEnter={() => p.app.setIsActionsHovered(true, i + 2)}
                onPointerLeave={() => p.app.setIsActionsHovered(false, i + 2)}
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
                is-hovered={`${p.app.isRowHovered(i + 2)}`}
                is-selected={`${p.app.selectedCustomer === v}`}
                onClick={() => {
                  if (p.app.selectedCustomer === v) {
                    p.app.setSelectedCustomer(undefined)
                  } else {
                    p.app.setSelectedCustomer(v)
                  }
                }}
                onPointerEnter={() => p.app.setIsRowWithCustomerHovered(true, i + 2)}
                onPointerLeave={() => p.app.setIsRowWithCustomerHovered(false, i + 2)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  })
}
