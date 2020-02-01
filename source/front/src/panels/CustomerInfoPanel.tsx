import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { style } from './CustomerInfoPanel.css'
import { CustomerInfo as CustomerInfo } from '../models/CustomerInfo'
import { Gender } from '../models/entities/Gender'

export function CustomerInfoPanel(p: { customerInfo: CustomerInfo }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const customer = p.customerInfo.app.selectedCustomer
    return (
      <React.Fragment>
        {customer && (
          <div className={css.main}>
            <div className={css.property}>
              <div className='propertyName'>Last name</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.lastName}
                onChange={e => customer.setLastName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>First name</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.firstName}
                onChange={e => customer.setFirstName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Middle name</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.middleName}
                onChange={e => customer.setMiddleName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Date of birth</div>
              <input className={'propertyInput'} type="date" defaultValue={customer.birthInfo?.dateOfBirth}
                onChange={e => customer.birthInfo?.setDateOfBirth(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Gender</div>
              {Object.keys(Gender).map((v, i) => (
                <React.Fragment key={`${i}:${v}`}>
                  <input type="radio" name="gender" checked={v === customer.gender ? true : false}
                    onChange={() => customer.setGender(v as Gender)} />{v}
                </React.Fragment>
              ))}
            </div>
            <div className={css.property}>
              <div className='propertyName'>Passport series</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.passport?.series}
                onChange={e => customer.passport?.setSeries(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Passport number</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.passport?.passportNumber}
                onChange={e => customer.passport?.setPassportNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Issuing authority</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.passport?.issuingAuthority}
                onChange={e => customer.passport?.setIssuingAuthority(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Issued at</div>
              <input className={'propertyInput'} type="date" defaultValue={customer.passport?.issuedAt}
                onChange={e => customer.passport?.setIssuedAt(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Id number</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.passport?.idNumber}
                onChange={e => customer.passport?.setIdNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Place Of Birth</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.birthInfo?.placeOfBirth}
                onChange={e => customer.birthInfo?.setPlaceOfBirth(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Place Of Living</div>
              <select className='propertyInput' value={customer.placeOfLiving?.cityId}
                onChange={e => customer.placeOfLiving?.setCityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyName'>Place Of Living: address</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.placeOfLiving?.address}
                onChange={e => customer.placeOfLiving?.setAddress(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Place Of Registration</div>
              <select className='propertyInput' value={customer.placeOfRegistration?.cityId}
                onChange={e => customer.placeOfRegistration?.setCityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyName'>Home Phone Number</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.contacts?.homePhoneNumber}
                onChange={e => customer.contacts?.setHomePhoneNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Mobile Phone Number</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.contacts?.mobilePhoneNumber}
                onChange={e => customer.contacts?.setMobilePhoneNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Email</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.contacts?.email}
                onChange={e => customer.contacts?.setEmail(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Company</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.workInfo?.company}
                onChange={e => customer.workInfo?.setCompany(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Position</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.workInfo?.position}
                onChange={e => customer.workInfo?.setPosition(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>City of registration</div>
              <select className='propertyInput' value={customer.placeOfRegistration?.cityId}
                onChange={e => customer.placeOfRegistration?.setCityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyName'>Address of registration</div>
              <input className={'propertyInput'} type="text" defaultValue={customer.placeOfRegistration?.address}
                onChange={e => customer.placeOfRegistration?.setAddress(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Marital status</div>
              <select className='propertyInput' value={customer.maritalStatusId}
                onChange={e => customer.setMaritalStatusId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.maritalStatuses.map((v, i) => (
                  <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyName'>Citizenship</div>
              <select className='propertyInput' value={customer.passport?.citizenshipId}
                onChange={e => customer.passport?.setCitizenshipId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.countriesOfCitizenship.map((v, i) => (
                  <option key={`${v.id}:${v.country}`} value={v.id}>{v.country}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyName'>Disability</div>
              <select className='propertyInput' value={customer.disabilityId}
                onChange={e => customer.setDisabilityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.disabilities.map((v, i) => (
                  <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyName'>Is retired</div>
              <input className={'propertyInput'} type="checkbox" defaultChecked={customer.isRetired}
                onChange={e => customer.setIsRetired(e.currentTarget.checked)} />
            </div>
            <div className={css.property}>
              <div className='propertyName'>Amount</div>
              <input className={'propertyInput'} type="number" defaultValue={customer.incomePerMonth?.amount}
                onChange={e => customer.incomePerMonth?.setAmount(parseInt(e.currentTarget.value))} />
              <select className='propertyInput' value={customer.incomePerMonth?.currencyId}
                onChange={e => customer.incomePerMonth?.setCurrencyId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.currencies.map((v, i) => (
                  <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyName'>Is Liable For Military Service</div>
              <input className={'propertyInput'} type="checkbox" defaultChecked={customer.isLiableForMilitaryService}
                onChange={e => customer.setIsLiableForMilitaryService(e.currentTarget.checked)} />
            </div>
          </div>
        )}
      </React.Fragment>
    )
  })
}
