import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { style } from './CustomerInfoPanel.css'
import { CustomerInfo as CustomerInfo } from '../models/CustomerInfo'

export function CustomerInfoPanel(p: { customerInfo: CustomerInfo }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.property}>
          <div className='propertyName'>Last name</div>
          <input className={'propertyValue'} type="text" />
        </div>
        {/* {p.customerInfo.properties.map((v, i) => (
          <div key={i} className={css.property}>
            <div className='propertyName'>{v.name}</div>
            <input className='propertyValue' type='text'
              onChange={e => p.customerInfo.} />
          </div>
        ))} */}
        {/* //   new CustomerInfoProperty('Last name', 'text', '[A-Z][a-z]*([\'\- ][A-Z][a-z]+)*'),
  //   new CustomerInfoProperty('First name', 'text', '[A-Z][a-z]*([\'\- ][A-Z][a-z]+)*'),
  //   new CustomerInfoProperty('Middle name', 'text', '[A-Z][a-z]*([\'\- ][A-Z][a-z]+)*'),
  //   new CustomerInfoProperty('Date of birth', 'date'),
  //   new CustomerInfoProperty('Gender', 'radio'),
  //   new CustomerInfoProperty('Passport series', 'text', '[A-Z]{2}'),
  //   new CustomerInfoProperty('Passport number', 'text', '\d{7}'),
  //   new CustomerInfoProperty('Issuing authority', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('Issued at', 'date'),
  //   new CustomerInfoProperty('Id number', 'text', '[A-Z0-9]{14}'),
  //   new CustomerInfoProperty('PlaceOfBirth', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('PlaceOfLiving', 'list'),
  //   new CustomerInfoProperty('PlaceOfRegistration', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('Home phone number', 'text', '^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$'),
  //   new CustomerInfoProperty('Mobile phone number', 'text', '^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$'),
  //   new CustomerInfoProperty('Email', 'text', '^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$'),
  //   new CustomerInfoProperty('Company', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('Position', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('City of registration', 'list'),
  //   new CustomerInfoProperty('Address of registration', 'text', '[A-Za-z ]+'),
  //   new CustomerInfoProperty('Marital status', 'list'),
  //   new CustomerInfoProperty('Citizenship', 'list'),
  //   new CustomerInfoProperty('Disability', 'list'),
  //   new CustomerInfoProperty('Is retired', 'checkbox'),
  //   new CustomerInfoProperty('Amount', 'money', '\d+'),
  //   new CustomerInfoProperty('Is Liable For Military Service', 'checkbox'), */}
      </div>
    )
  })
}
