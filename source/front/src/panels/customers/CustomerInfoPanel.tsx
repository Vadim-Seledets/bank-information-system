import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { style } from './CustomerInfoPanel.css'
import { CustomerInfo as CustomerInfo } from '../../models/customers/CustomerInfo'
import { Gender } from '../../models/customers/Gender'

export function CustomerInfoPanel(p: { customerInfo: CustomerInfo }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const customer = p.customerInfo.customersPage.selectedCustomer
    const auxiliary = p.customerInfo.customersPage.app.auxiliary
    const apiErrors = p.customerInfo.apiErrors
    return (
      <React.Fragment>
        {customer && (
          <div className={css.main}>
            <div className={css.propertyGroupCaption}>Personal Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Last Name</div>
                {apiErrors?.has('LastName') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('LastName').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.lastName}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'lastName') || apiErrors?.has('LastName')}`}
                onFocus={() => apiErrors?.deleteError('LastName')}
                onChange={e => customer.setLastName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>First Name</div>
                {apiErrors?.has('FirstName') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('FirstName').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.firstName}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'firstName') || apiErrors?.has('FirstName')}`}
                onFocus={() => apiErrors?.deleteError('FirstName')}
                onChange={e => customer.setFirstName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Middle Name</div>
                {apiErrors?.has('MiddleName') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('MiddleName').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.middleName}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'middleName') || apiErrors?.has('MiddleName')}`}
                onFocus={() => apiErrors?.deleteError('MiddleName')}
                onChange={e => customer.setMiddleName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Date Of Birth</div>
                {apiErrors?.has('BirthInfo.DateOfBirth') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('BirthInfo.DateOfBirth').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="date" value={customer.dateOfBirth}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'dateOfBirth') || apiErrors?.has('BirthInfo.DateOfBirth')}`}
                onFocus={() => apiErrors?.deleteError('BirthInfo.DateOfBirth')}
                onChange={e => customer.setDateOfBirth(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Gender</div>
                {apiErrors?.has('Gender') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('Gender').map((v, i) => (
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
                {apiErrors?.has('Passport.CitizenshipId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('Passport.CitizenshipId').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.citizenshipId}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'citizenshipId') || apiErrors?.has('Passport.CitizenshipId')}`}
                onFocus={() => apiErrors?.deleteError('Passport.CitizenshipId')}
                onChange={e => customer.setCitizenshipId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.countriesOfCitizenship.map((v, i) => (
                  <option key={`${v.id}:${v.country}`} value={v.id}>{v.country}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Passport Series</div>
                {apiErrors?.has('Passport.Series') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('Passport.Series').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.series}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'series') || apiErrors?.has('Passport.Series')}`}
                onFocus={() => apiErrors?.deleteError('Passport.Series')}
                onChange={e => customer.setSeries(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Passport Number</div>
                {apiErrors?.has('Passport.PassportNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('Passport.PassportNumber').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.passportNumber}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'passportNumber') || apiErrors?.has('Passport.PassportNumber')}`}
                onFocus={() => apiErrors?.deleteError('Passport.PassportNumber')}
                onChange={e => customer.setPassportNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Issuing Authority</div>
                {apiErrors?.has('Passport.IssuingAuthority') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('Passport.IssuingAuthority').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.issuingAuthority}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'issuingAuthority') || apiErrors?.has('Passport.IssuingAuthority')}`}
                onFocus={() => apiErrors?.deleteError('Passport.IssuingAuthority')}
                onChange={e => customer.setIssuingAuthority(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Issued At</div>
                {apiErrors?.has('Passport.IssuedAt') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('Passport.IssuedAt').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="date" value={customer.issuedAt}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'issuedAt') || apiErrors?.has('Passport.IssuedAt')}`}
                onFocus={() => apiErrors?.deleteError('Passport.IssuedAt')}
                onChange={e => customer.setIssuedAt(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Id Number</div>
                {apiErrors?.has('Passport.IdNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('Passport.IdNumber').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.idNumber}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'idNumber') || apiErrors?.has('Passport.IdNumber')}`}
                onFocus={() => apiErrors?.deleteError('Passport.IdNumber')}
                onChange={e => customer.setIdNumber(e.currentTarget.value)} />
            </div>
            <div className={css.propertyGroupCaption}>Contact Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place Of Birth</div>
                {apiErrors?.has('BirthInfo.PlaceOfBirth') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('BirthInfo.PlaceOfBirth').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfBirth}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfBirth') || apiErrors?.has('BirthInfo.PlaceOfBirth')}`}
                onFocus={() => apiErrors?.deleteError('BirthInfo.PlaceOfBirth')}
                onChange={e => customer.setPlaceOfBirth(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place Of Living</div>
                {apiErrors?.has('PlaceOfLiving.CityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('PlaceOfLiving.CityId').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfLivingCityId}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfLivingCityId') || apiErrors?.has('PlaceOfLiving.CityId')}`}
                onChange={e => customer.setPlaceOfLivingCityId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Address Of Living</div>
                {apiErrors?.has('PlaceOfLiving.Address') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('PlaceOfLiving.Address').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfLivingAddress}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfLivingAddress') || apiErrors?.has('PlaceOfLiving.Address')}`}
                onFocus={() => apiErrors?.deleteError('PlaceOfLiving.Address')}
                onChange={e => customer.setPlaceOfLivingAddress(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place Of Registration</div>
                {apiErrors?.has('PlaceOfRegistration.CityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('PlaceOfRegistration.CityId').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfRegistrationCityId}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfRegistrationCityId') || apiErrors?.has('PlaceOfRegistration.CityId')}`}
                onChange={e => customer.setPlaceOfRegistrationCityId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Address Of Registration</div>
                {apiErrors?.has('PlaceOfRegistration.Address') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('PlaceOfRegistration.Address').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfRegistrationAddress}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfRegistrationAddress') || apiErrors?.has('PlaceOfRegistration.Address')}`}
                onFocus={() => apiErrors?.deleteError('PlaceOfRegistration.Address')}
                onChange={e => customer.setPlaceOfRegistrationAddress(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Home Phone Number</div>
                {apiErrors?.has('Contacts.HomePhoneNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('Contacts.HomePhoneNumber').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.homePhoneNumber}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'homePhoneNumber') || apiErrors?.has('Contacts.HomePhoneNumber')}`}
                onFocus={() => apiErrors?.deleteError('Contacts.HomePhoneNumber')}
                onChange={e => customer.setHomePhoneNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Mobile Phone Number</div>
                {apiErrors?.has('Contacts.MobilePhoneNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('Contacts.MobilePhoneNumber').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.mobilePhoneNumber}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'mobilePhoneNumber') || apiErrors?.has('Contacts.MobilePhoneNumber')}`}
                onFocus={() => apiErrors?.deleteError('Contacts.MobilePhoneNumber')}
                onChange={e => customer.setMobilePhoneNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Email</div>
                {apiErrors?.has('Contacts.Email') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('Contacts.Email').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.email}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'email') || apiErrors?.has('Contacts.Email')}`}
                onFocus={() => apiErrors?.deleteError('Contacts.Email')}
                onChange={e => customer.setEmail(e.currentTarget.value)} />
            </div>
            <div className={css.propertyGroupCaption}>Job Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Company</div>
                {apiErrors?.has('WorkInfo.Company') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('WorkInfo.Company').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.company}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'company') || apiErrors?.has('WorkInfo.Company')}`}
                onFocus={() => apiErrors?.deleteError('WorkInfo.Company')}
                onChange={e => customer.setCompany(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Position</div>
                {apiErrors?.has('WorkInfo.Position') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('WorkInfo.Position').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.position}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'position') || apiErrors?.has('WorkInfo.Position')}`}
                onFocus={() => apiErrors?.deleteError('WorkInfo.Position')}
                onChange={e => customer.setPosition(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Salary</div>
                {apiErrors?.has('IncomePerMonth.Amount') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('IncomePerMonth.Amount').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className='propertyInputHorizontalLine'>
                <input className={'propertyInputColumn'} type="number" value={customer.amount}
                  is-invalid={`${!p.customerInfo.validation.isValid(customer, 'amount') || apiErrors?.has('IncomePerMonth.Amount')}`}
                  onChange={e => customer.setAmount(e.currentTarget.value)} />
                <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.currencyId}
                  is-invalid={`${apiErrors?.has('IncomePerMonth.CurrencyId')}`}
                  onChange={e => customer.setCurrencyId(parseInt(e.currentTarget.value))}
                >
                  {auxiliary.currencies.map((v, i) => (
                    <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Marital Status</div>
                {apiErrors?.has('MaritalStatus') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('MaritalStatus').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.maritalStatusId}
                is-invalid={`${apiErrors?.has('MaritalStatus')}`}
                onChange={e => customer.setMaritalStatusId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.maritalStatuses.map((v, i) => (
                  <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Disability</div>
                {apiErrors?.has('DisabilityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('DisabilityId').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.disabilityId ? customer.disabilityId : ''}
                is-invalid={`${apiErrors?.has('DisabilityId')}`}
                onChange={e => customer.setDisabilityId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.disabilities.map((v, i) => (
                  <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
                ))}
              </select>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Is Retired</div>
                {apiErrors?.has('IsRetired') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('IsRetired').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
                <input className={'input'} style={{alignSelf: 'center'}} type="checkbox" checked={customer.isRetired}
                  is-invalid={`${apiErrors?.has('IsRetired')}`}
                  onChange={e => customer.setIsRetired(e.currentTarget.checked)} />
              </div>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Is Liable For Military Service</div>
                {apiErrors?.has('IsLiableForMilitaryService') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      {apiErrors?.getPropertyErrors('IsLiableForMilitaryService').map((v, i) => (
                        <div key={i} className='errorRow'>{v}</div>
                      ))}
                    </div>
                  </div>
                )}
                <input className={'input'} style={{alignSelf: 'center'}} type="checkbox" checked={customer.isLiableForMilitaryService}
                  is-invalid={`${apiErrors?.has('IsLiableForMilitaryService')}`}
                  onChange={e => customer.setIsLiableForMilitaryService(e.currentTarget.checked)} />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  })
}
