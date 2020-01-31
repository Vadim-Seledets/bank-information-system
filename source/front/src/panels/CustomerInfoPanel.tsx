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
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>First name</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Middle name</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Date of birth</div>
          <input className={'propertyInput'} type="date" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Gender</div>
          <input type="radio" name="gender" value="male" />Male
          <input type="radio" name="gender" value="female" />Female
          <input type="radio" name="gender" value="other" />Other
        </div>
        <div className={css.property}>
          <div className='propertyName'>Passport series</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Passport number</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Issuing authority</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Issued at</div>
          <input className={'propertyInput'} type="date" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Id number</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Place Of Birth</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Place Of Living</div>
          <select className='propertyInput'>
            {p.customerInfo.auxiliary.cities.map((v, i) => (
              <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
        <div className={css.property}>
          <div className='propertyName'>Place Of Registration</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Home Phone Number</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Mobile Phone Number</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Email</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Company</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Position</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>City of registration</div>
          <select className='propertyInput'>
            {p.customerInfo.auxiliary.cities.map((v, i) => (
              <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
        <div className={css.property}>
          <div className='propertyName'>Address of registration</div>
          <input className={'propertyInput'} type="text" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Marital status</div>
          <select className='propertyInput'>
            {p.customerInfo.auxiliary.maritalStatuses.map((v, i) => (
              <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
            ))}
          </select>
        </div>
        <div className={css.property}>
          <div className='propertyName'>Citizenship</div>
          <select className='propertyInput'>
            {p.customerInfo.auxiliary.countriesOfCitizenship.map((v, i) => (
              <option key={`${v.id}:${v.country}`} value={v.id}>{v.country}</option>
            ))}
          </select>
        </div>
        <div className={css.property}>
          <div className='propertyName'>Disability</div>
          <select className='propertyInput'>
            {p.customerInfo.auxiliary.disabilities.map((v, i) => (
              <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
            ))}
          </select>
        </div>
        <div className={css.property}>
          <div className='propertyName'>Is retired</div>
          <input className={'propertyInput'} type="checkbox" />
        </div>
        <div className={css.property}>
          <div className='propertyName'>Amount</div>
          <input className={'propertyInput'} type="number" />
          <select className='propertyInput'>
            {p.customerInfo.auxiliary.currencies.map((v, i) => (
              <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
            ))}
          </select>
        </div>
        <div className={css.property}>
          <div className='propertyName'>Is Liable For Military Service</div>
          <input className={'propertyInput'} type="checkbox" />
        </div>
      </div>
    )
  })
}
