import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../common/css'
import { App } from '../models/App'
import { style } from './CustomersPage.css'
import { cx } from 'emotion'
import { Gender } from '../models/entities/Gender'

export function CustomersPageView(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.actionsPanel} style={{ ...dim(1, 1, 12, 1), color: 'grey' }}>
          <div className='addNewCustomerButton' onClick={() => p.app.addNewCustomer()}>
            Add a New Customer
          </div>
          <input className='search' type='text' placeholder='Find a customer...' />
        </div>
        <div className={css.customerList} style={{ ...dim(1, 2, 12, 12) }}>
          <div style={{ ...dim(2, 1, 2, 1) }}>Gender</div>
          <div style={{ ...dim(4, 1, 4, 1) }}>Full name</div>
          <div style={{ ...dim(6, 1, 6, 1) }}>Email</div>
          <div style={{ ...dim(8, 1, 8, 1) }}>Actions</div>
          <div style={{ ...dim(1, 1, 9, 1) }} className={`row`} />
          {p.app.customers.map((v, i) => (
            <React.Fragment key={i}>
              <div style={{ ...dim(2, i + 2, 2, i + 2) }} className={cx(v.gender === Gender.Female
                ? 'las la-female'
                : v.gender === Gender.Male
                  ? 'las la-male' : 'las la-genderless', 'icon')} />
              <div style={{ ...dim(4, i + 2, 4, i + 2) }} className='text'>{`${v.firstName} ${v.middleName} ${v.lastName}`}</div>
              <a style={{ ...dim(6, i + 2, 6, i + 2) }} className='text' href={`mailto:${v.contacts.email}`}>{v.contacts.email}</a>
              <div style={{ ...dim(8, i + 2, 8, i + 2) }} className='icon'>
                <div className={'las la-pen action'} 
                  onClick={() => {
                    if (p.app.selectedCustomer === v) {
                      p.app.setSelectedCustomer(undefined)
                    } else {
                      p.app.setSelectedCustomer(v)
                      if (v.id && !v.isFullInfoModelLoaded) {
                        v.getFullInfoModel()
                      }
                    }
                  }}
                />
                <div className={'las la-trash action'} />
                {v.errors && (
                  <div className='errors las la-exclamation'>
                    <div className='errorsPopUp'>
                      {v.errors.error && <div className='errorRow'>{v.errors.error}</div>}
                      {v.errors.errors && (
                        v.errors.errors.map((e, i) => (
                          <div key={i} className='errorRow'>{`${e.name}: ${e.message}`}</div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div style={{ ...dim(1, i + 2, 9, i + 2) }} className={`row ${(i + 1) % 2 === 0 ? 'evenRow' : 'oddRow'}`} />
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  })
}
