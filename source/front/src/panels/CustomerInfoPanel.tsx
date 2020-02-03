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
                {customer.infoErrors.has('LastName') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('LastName').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.lastName}
                is-invalid={`${!p.customerInfo.validation.isValid('lastName') || customer.infoErrors.has('LastName')}`}
                onChange={e => customer.setLastName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>First name</div>
                {customer.infoErrors.has('FirstName') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('FirstName').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.firstName}
                is-invalid={`${!p.customerInfo.validation.isValid('firstName') || customer.infoErrors.has('FirstName')}`}
                onChange={e => customer.setFirstName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Middle name</div>
                {customer.infoErrors.has('MiddleName') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('MiddleName').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.middleName}
                is-invalid={`${!p.customerInfo.validation.isValid('middleName') || customer.infoErrors.has('MiddleName')}`}
                onChange={e => customer.setMiddleName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Date of birth</div>
                {customer.infoErrors.has('BirthInfo.DateOfBirth') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('BirthInfo.DateOfBirth').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="date" value={customer.dateOfBirth}
                is-invalid={`${!p.customerInfo.validation.isValid('dateOfBirth') || customer.infoErrors.has('BirthInfo.DateOfBirth')}`}
                onChange={e => customer.setDateOfBirth(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Gender</div>
                {customer.infoErrors.has('Gender') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('Gender').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
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
                {customer.infoErrors.has('Passport.CitizenshipId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('Passport.CitizenshipId').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.citizenshipId}
                is-invalid={`${!p.customerInfo.validation.isValid('citizenshipId') || customer.infoErrors.has('Passport.CitizenshipId')}`}
                onChange={e => customer.setCitizenshipId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.countriesOfCitizenship.map((v, i) => (
                  <option key={`${v.id}:${v.country}`} value={v.id}>{v.country}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Passport series</div>
                {customer.infoErrors.has('Passport.Series') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('Passport.Series').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.series}
                is-invalid={`${!p.customerInfo.validation.isValid('series') || customer.infoErrors.has('Passport.Series')}`}
                onChange={e => customer.setSeries(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Passport number</div>
                {customer.infoErrors.has('Passport.PassportNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('Passport.PassportNumber').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.passportNumber}
                is-invalid={`${!p.customerInfo.validation.isValid('passportNumber') || customer.infoErrors.has('Passport.PassportNumber')}`}
                onChange={e => customer.setPassportNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Issuing authority</div>
                {customer.infoErrors.has('Passport.IssuingAuthority') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('Passport.IssuingAuthority').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.issuingAuthority}
                is-invalid={`${!p.customerInfo.validation.isValid('issuingAuthority') || customer.infoErrors.has('Passport.IssuingAuthority')}`}
                onChange={e => customer.setIssuingAuthority(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Issued at</div>
                {customer.infoErrors.has('Passport.IssuedAt') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('Passport.IssuedAt').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="date" value={customer.issuedAt}
                is-invalid={`${!p.customerInfo.validation.isValid('issuedAt') || customer.infoErrors.has('Passport.IssuedAt')}`}
                onChange={e => customer.setIssuedAt(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Id number</div>
                {customer.infoErrors.has('Passport.IdNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('Passport.IdNumber').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.idNumber}
                is-invalid={`${!p.customerInfo.validation.isValid('idNumber') || customer.infoErrors.has('Passport.IdNumber')}`}
                onChange={e => customer.setIdNumber(e.currentTarget.value)} />
            </div>
            <div className={css.propertyGroupCaption}>Contact Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place of birth</div>
                {customer.infoErrors.has('BirthInfo.PlaceOfBirth') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('BirthInfo.PlaceOfBirth').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfBirth}
                is-invalid={`${!p.customerInfo.validation.isValid('placeOfBirth') || customer.infoErrors.has('BirthInfo.PlaceOfBirth')}`}
                onChange={e => customer.setPlaceOfBirth(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place of living</div>
                {customer.infoErrors.has('PlaceOfLiving.CityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('PlaceOfLiving.CityId').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfLivingCityId}
                is-invalid={`${!p.customerInfo.validation.isValid('placeOfLivingCityId') || customer.infoErrors.has('PlaceOfLiving.CityId')}`}
                onChange={e => customer.setPlaceOfLivingCityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Address of living</div>
                {customer.infoErrors.has('PlaceOfLiving.Address') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('PlaceOfLiving.Address').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfLivingAddress}
                is-invalid={`${!p.customerInfo.validation.isValid('placeOfLivingAddress') || customer.infoErrors.has('PlaceOfLiving.Address')}`}
                onChange={e => customer.setPlaceOfLivingAddress(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place of registration</div>
                {customer.infoErrors.has('PlaceOfRegistration.CityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('PlaceOfRegistration.CityId').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfRegistrationCityId}
                is-invalid={`${!p.customerInfo.validation.isValid('placeOfRegistrationCityId') || customer.infoErrors.has('PlaceOfRegistration.CityId')}`}
                onChange={e => customer.setPlaceOfRegistrationCityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            {/* <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>City of registration</div>
                {customer.infoErrors.has('PlaceOfRegistration.CityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'PlaceOfRegistration.CityId')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfRegistration.cityId}
                is-invalid={`${customer.infoErrors.has('PlaceOfRegistration.CityId')}`}
                onChange={e => customer.placeOfRegistration.setCityId(parseInt(e.currentTarget.value))}
              >
                {p.customerInfo.auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div> */}
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Address of registration</div>
                {customer.infoErrors.has('PlaceOfRegistration.Address') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('PlaceOfRegistration.Address').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfRegistrationAddress}
                is-invalid={`${!p.customerInfo.validation.isValid('placeOfRegistrationAddress') || customer.infoErrors.has('PlaceOfRegistration.Address')}`}
                onChange={e => customer.setPlaceOfRegistrationAddress(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Home phone number</div>
                {customer.infoErrors.has('Contacts.HomePhoneNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('Contacts.HomePhoneNumber').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.homePhoneNumber}
                is-invalid={`${!p.customerInfo.validation.isValid('homePhoneNumber') || customer.infoErrors.has('Contacts.HomePhoneNumber')}`}
                onChange={e => customer.setHomePhoneNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Mobile phone number</div>
                {customer.infoErrors.has('Contacts.MobilePhoneNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('Contacts.MobilePhoneNumber').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.mobilePhoneNumber}
                is-invalid={`${!p.customerInfo.validation.isValid('mobilePhoneNumber') || customer.infoErrors.has('Contacts.MobilePhoneNumber')}`}
                onChange={e => customer.setMobilePhoneNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Email</div>
                {customer.infoErrors.has('Contacts.Email') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('Contacts.Email').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.email}
                is-invalid={`${!p.customerInfo.validation.isValid('email') || customer.infoErrors.has('Contacts.Email')}`}
                onChange={e => customer.setEmail(e.currentTarget.value)} />
            </div>
            <div className={css.propertyGroupCaption}>Job Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Company</div>
                {customer.infoErrors.has('WorkInfo.Company') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('WorkInfo.Company').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.company}
                is-invalid={`${!p.customerInfo.validation.isValid('company') || customer.infoErrors.has('WorkInfo.Company')}`}
                onChange={e => customer.setCompany(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Position</div>
                {customer.infoErrors.has('WorkInfo.Position') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('WorkInfo.Position').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.position}
                is-invalid={`${!p.customerInfo.validation.isValid('position') || customer.infoErrors.has('WorkInfo.Position')}`}
                onChange={e => customer.setPosition(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Salary</div>
                {customer.infoErrors.has('IncomePerMonth.Amount') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('IncomePerMonth.Amount').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className='propertyInputHorizontalLine'>
                <input className={'propertyInputColumn'} type="number" value={customer.amount}
                  is-invalid={`${!p.customerInfo.validation.isValid('amount') || customer.infoErrors.has('IncomePerMonth.Amount')}`}
                  onChange={e => customer.setAmount(e.currentTarget.value)} />
                <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.currencyId}
                  is-invalid={`${customer.infoErrors.has('IncomePerMonth.CurrencyId')}`}
                  onChange={e => customer.setCurrencyId(parseInt(e.currentTarget.value))}
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
                {customer.infoErrors.has('MaritalStatus') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('MaritalStatus').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.maritalStatusId}
                is-invalid={`${customer.infoErrors.has('MaritalStatus')}`}
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
                {customer.infoErrors.has('DisabilityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('DisabilityId').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.disabilityId ? customer.disabilityId : ''}
                is-invalid={`${customer.infoErrors.has('DisabilityId')}`}
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
                {customer.infoErrors.has('IsRetired') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('IsRetired').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
                <input className={'input'} style={{alignSelf: 'center'}} type="checkbox" checked={customer.isRetired}
                  is-invalid={`${customer.infoErrors.has('IsRetired')}`}
                  onChange={e => customer.setIsRetired(e.currentTarget.checked)} />
              </div>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Is liable for military service</div>
                {customer.infoErrors.has('IsLiableForMilitaryService') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {customer.infoErrors.getPropertyErrors('IsLiableForMilitaryService').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
                <input className={'input'} style={{alignSelf: 'center'}} type="checkbox" checked={customer.isLiableForMilitaryService}
                  is-invalid={`${customer.infoErrors.has('IsLiableForMilitaryService')}`}
                  onChange={e => customer.setIsLiableForMilitaryService(e.currentTarget.checked)} />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  })
}
