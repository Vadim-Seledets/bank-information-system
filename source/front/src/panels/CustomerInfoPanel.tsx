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
            <div className={css.propertyGroupCaption}>Personal Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Last name</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.lastName}
                onChange={e => customer.setLastName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>First name</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.firstName}
                onChange={e => customer.setFirstName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Middle name</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.middleName}
                onChange={e => customer.setMiddleName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Date of birth</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="date" value={customer.birthInfo.dateOfBirth}
                onChange={e => customer.birthInfo.setDateOfBirth(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Gender</div>
                {/* error */}
              </div>
              <div className='propertyInputHorizontalLine'>
                {Object.keys(Gender).map((v, i) => (
                  <React.Fragment key={`${i}:${v}`}>
                    <input type="radio" name="gender" checked={v === customer.gender ? true : false}
                      style={{ marginLeft: '1em' }}
                      onChange={() => customer.setGender(v as Gender)} />&nbsp;{v}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className={css.propertyGroupCaption}>Passport Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Citizenship</div>
                {/* error */}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.passport.citizenshipId}
                onChange={e => customer.passport.setCitizenshipId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.countriesOfCitizenship.map((v, i) => (
                  <option key={`${v.id}:${v.country}`} value={v.id}>{v.country}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Passport series</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.passport.series}
                onChange={e => customer.passport.setSeries(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Passport number</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.passport.passportNumber}
                onChange={e => customer.passport.setPassportNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Issuing authority</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.passport.issuingAuthority}
                onChange={e => customer.passport.setIssuingAuthority(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Issued at</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="date" value={customer.passport.issuedAt}
                onChange={e => customer.passport.setIssuedAt(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Id number</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.passport.idNumber}
                onChange={e => customer.passport.setIdNumber(e.currentTarget.value)} />
            </div>
            <div className={css.propertyGroupCaption}>Contact Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place of birth</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.birthInfo.placeOfBirth}
                onChange={e => customer.birthInfo.setPlaceOfBirth(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place of living</div>
                {/* error */}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfLiving.cityId}
                onChange={e => customer.placeOfLiving.setCityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Address</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfLiving.address}
                onChange={e => customer.placeOfLiving.setAddress(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place of registration</div>
                {/* error */}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfRegistration.cityId}
                onChange={e => customer.placeOfRegistration.setCityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>City of registration</div>
                {/* error */}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfRegistration.cityId}
                onChange={e => customer.placeOfRegistration.setCityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Address of registration</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfRegistration.address}
                onChange={e => customer.placeOfRegistration.setAddress(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Home phone number</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.contacts.homePhoneNumber}
                onChange={e => customer.contacts.setHomePhoneNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Mobile phone number</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.contacts.mobilePhoneNumber}
                onChange={e => customer.contacts.setMobilePhoneNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Email</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.contacts.email}
                onChange={e => customer.contacts.setEmail(e.currentTarget.value)} />
            </div>
            <div className={css.propertyGroupCaption}>Job Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Company</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.workInfo.company}
                onChange={e => customer.workInfo.setCompany(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Position</div>
                {/* error */}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.workInfo.position}
                onChange={e => customer.workInfo.setPosition(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Salary</div>
                {/* error */}
              </div>
              <div className='propertyInputHorizontalLine'>
                <input className={'propertyInputColumn'} type="number" value={customer.incomePerMonth.amount}
                  onChange={e => customer.incomePerMonth.setAmount(e.currentTarget.value)} />
                <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.incomePerMonth.currencyId}
                  onChange={e => customer.incomePerMonth.setCurrencyId(parseInt(e.currentTarget.value))}
                >
                  {p.customerInfo.auxiliary.currencies.map((v, i) => (
                    <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Marital status</div>
                {/* error */}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.maritalStatusId}
                onChange={e => customer.setMaritalStatusId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.maritalStatuses.map((v, i) => (
                  <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Disability</div>
                {/* error */}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.disabilityId ? customer.disabilityId : ''}
                onChange={e => customer.setDisabilityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.disabilities.map((v, i) => (
                  <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Is retired</div>
                {/* error */}
                <input className={'input'} type="checkbox" checked={customer.isRetired}
                  onChange={e => customer.setIsRetired(e.currentTarget.checked)} />
              </div>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Is liable for military service</div>
                {/* error */}
                <input className={'input'} type="checkbox" checked={customer.isLiableForMilitaryService}
                  onChange={e => customer.setIsLiableForMilitaryService(e.currentTarget.checked)} />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  })
}
