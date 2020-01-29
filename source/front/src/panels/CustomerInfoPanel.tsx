import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { style } from './CustomerInfoPanel.css'
import { CustomerInfo as CustomerInfo } from '../models/CustomerInfo'

export function CustomerInfoPanel(p: { customerInfo: CustomerInfo }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        {p.customerInfo.properties.map((v, i) => (
          <div key={i} className={css.property}>
            <div className='propertyName'>{v.name}</div>
            <input className='propertyValue' type='text' />
          </div>
        ))}
      </div>
    )
  })
}
