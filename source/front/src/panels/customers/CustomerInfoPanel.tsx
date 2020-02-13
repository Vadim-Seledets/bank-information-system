import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { style } from './CustomerInfoPanel.css'
import { CustomerInfo as CustomerInfo } from '../../models/customers/CustomerInfo'
import { Gender } from '../../models/customers/Gender'
import { cx } from 'emotion'

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
            <div className={css.propertyGroupCaption}>
              <div className='caption'>Personal Information</div>
              {apiErrors?.has('') && <div className='error'>{apiErrors?.getPropertyErrors('')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Last Name</div>
              <input className={'input'} type="text" value={customer.lastName}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'lastName') || apiErrors?.has('LastName')}`}
                onFocus={() => apiErrors?.deleteError('LastName')}
                onChange={e => customer.setLastName(e.currentTarget.value)} />
              {apiErrors?.has('LastName') && <div className='error'>{apiErrors?.getPropertyErrors('LastName')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>First Name</div>
              <input className={'input'} type="text" value={customer.firstName}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'firstName') || apiErrors?.has('FirstName')}`}
                onFocus={() => apiErrors?.deleteError('FirstName')}
                onChange={e => customer.setFirstName(e.currentTarget.value)}
              />
              {apiErrors?.has('FirstName') && <div className='error'>{apiErrors?.getPropertyErrors('FirstName')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Middle Name</div>
              <input className={'input'} type="text" value={customer.middleName}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'middleName') || apiErrors?.has('MiddleName')}`}
                onFocus={() => apiErrors?.deleteError('MiddleName')}
                onChange={e => customer.setMiddleName(e.currentTarget.value)}
              />
              {apiErrors?.has('MiddleName') && <div className='error'>{apiErrors?.getPropertyErrors('MiddleName')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Date Of Birth</div>
              <input className={'input'} type="date" value={customer.dateOfBirth}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'dateOfBirth') || apiErrors?.has('BirthInfo.DateOfBirth')}`}
                onFocus={() => apiErrors?.deleteError('BirthInfo.DateOfBirth')}
                onChange={e => customer.setDateOfBirth(e.currentTarget.value)}
              />
              {apiErrors?.has('BirthInfo.DateOfBirth') && <div className='error'>{apiErrors?.getPropertyErrors('BirthInfo.DateOfBirth')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Gender</div>
              <div style={{ display: 'flex', alignItems: 'baseline', fontSize: '0.9em' }}>
                {Object.keys(Gender).map((v, i) => (
                  <React.Fragment key={`${i}:${v}`}>
                    <input type="radio" name="gender" checked={v === customer.gender ? true : false}
                      style={{ marginLeft: '1em' }}
                      onChange={() => customer.setGender(v as Gender)} />&nbsp;{v}
                  </React.Fragment>
                ))}
              </div>
              {apiErrors?.has('Gender') && <div className='error'>{apiErrors?.getPropertyErrors('Gender')[0]}</div>}
            </div>
            <div className={css.propertyGroupCaption}>
              <div className='caption'>Passport Information</div>
              {apiErrors?.has('Passport') && <div className='error'>{apiErrors?.getPropertyErrors('Passport')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Citizenship</div>
              <select className='input' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.citizenshipId}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'citizenshipId') || apiErrors?.has('Passport.CitizenshipId')}`}
                onFocus={() => apiErrors?.deleteError('Passport.CitizenshipId')}
                onChange={e => customer.setCitizenshipId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.countriesOfCitizenship.map((v, i) => (
                  <option key={`${v.id}:${v.country}`} value={v.id}>{v.country}</option>
                ))}
              </select>
              {apiErrors?.has('Passport.CitizenshipId') && <div className='error'>{apiErrors?.getPropertyErrors('Passport.CitizenshipId')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Passport Series</div>
              <input className={'input'} type="text" value={customer.series}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'series') || apiErrors?.has('Passport.Series')}`}
                onFocus={() => apiErrors?.deleteError('Passport.Series')}
                onChange={e => customer.setSeries(e.currentTarget.value)}
              />
              {apiErrors?.has('Passport.Series') && <div className='error'>{apiErrors?.getPropertyErrors('Passport.Series')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Passport Number</div>
              <input className={'input'} type="text" value={customer.passportNumber}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'passportNumber') || apiErrors?.has('Passport.PassportNumber')}`}
                onFocus={() => apiErrors?.deleteError('Passport.PassportNumber')}
                onChange={e => customer.setPassportNumber(e.currentTarget.value)}
              />
              {apiErrors?.has('Passport.PassportNumber') && <div className='error'>{apiErrors?.getPropertyErrors('Passport.PassportNumber')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Issuing Authority</div>
              <input className={'input'} type="text" value={customer.issuingAuthority}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'issuingAuthority') || apiErrors?.has('Passport.IssuingAuthority')}`}
                onFocus={() => apiErrors?.deleteError('Passport.IssuingAuthority')}
                onChange={e => customer.setIssuingAuthority(e.currentTarget.value)}
              />
              {apiErrors?.has('Passport.IssuingAuthority') && <div className='error'>{apiErrors?.getPropertyErrors('Passport.IssuingAuthority')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Issued At</div>
              <input className={'input'} type="date" value={customer.issuedAt}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'issuedAt') || apiErrors?.has('Passport.IssuedAt')}`}
                onFocus={() => apiErrors?.deleteError('Passport.IssuedAt')}
                onChange={e => customer.setIssuedAt(e.currentTarget.value)}
              />
              {apiErrors?.has('Passport.IssuedAt') && <div className='error'>{apiErrors?.getPropertyErrors('Passport.IssuedAt')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Id Number</div>
              <input className={'input'} type="text" value={customer.idNumber}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'idNumber') || apiErrors?.has('Passport.IdNumber')}`}
                onFocus={() => apiErrors?.deleteError('Passport.IdNumber')}
                onChange={e => customer.setIdNumber(e.currentTarget.value)}
              />
              {apiErrors?.has('Passport.IdNumber') && <div className='error'>{apiErrors?.getPropertyErrors('Passport.IdNumber')[0]}</div>}
            </div>
            <div className={css.propertyGroupCaption}>Contact Information</div>
            <div className={css.property}>
              <div className='caption'>Place Of Birth</div>
              <input className={'input'} type="text" value={customer.placeOfBirth}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfBirth') || apiErrors?.has('BirthInfo.PlaceOfBirth')}`}
                onFocus={() => apiErrors?.deleteError('BirthInfo.PlaceOfBirth')}
                onChange={e => customer.setPlaceOfBirth(e.currentTarget.value)}
              />
              {apiErrors?.has('BirthInfo.PlaceOfBirth') && <div className='error'>{apiErrors?.getPropertyErrors('BirthInfo.PlaceOfBirth')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Place Of Living</div>
              <select className='input' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfLivingCityId}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfLivingCityId') || apiErrors?.has('PlaceOfLiving.CityId')}`}
                onChange={e => customer.setPlaceOfLivingCityId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
              {apiErrors?.has('PlaceOfLiving.CityId') && <div className='error'>{apiErrors?.getPropertyErrors('PlaceOfLiving.CityId')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Address Of Living</div>
              <input className={'input'} type="text" value={customer.placeOfLivingAddress}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfLivingAddress') || apiErrors?.has('PlaceOfLiving.Address')}`}
                onFocus={() => apiErrors?.deleteError('PlaceOfLiving.Address')}
                onChange={e => customer.setPlaceOfLivingAddress(e.currentTarget.value)}
              />
              {apiErrors?.has('PlaceOfLiving.Address') && <div className='error'>{apiErrors?.getPropertyErrors('PlaceOfLiving.Address')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Place Of Registration</div>
              <select className='input' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfRegistrationCityId}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfRegistrationCityId') || apiErrors?.has('PlaceOfRegistration.CityId')}`}
                onChange={e => customer.setPlaceOfRegistrationCityId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.cities.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
              {apiErrors?.has('PlaceOfRegistration.CityId') && <div className='error'>{apiErrors?.getPropertyErrors('PlaceOfRegistration.CityId')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Address Of Registration</div>
              <input className={'input'} type="text" value={customer.placeOfRegistrationAddress}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfRegistrationAddress') || apiErrors?.has('PlaceOfRegistration.Address')}`}
                onFocus={() => apiErrors?.deleteError('PlaceOfRegistration.Address')}
                onChange={e => customer.setPlaceOfRegistrationAddress(e.currentTarget.value)}
              />
              {apiErrors?.has('PlaceOfRegistration.Address') && <div className='error'>{apiErrors?.getPropertyErrors('PlaceOfRegistration.Address')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Home Phone Number</div>
              <input className={'input'} type="text" value={customer.homePhoneNumber}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'homePhoneNumber') || apiErrors?.has('Contacts.HomePhoneNumber')}`}
                onFocus={() => apiErrors?.deleteError('Contacts.HomePhoneNumber')}
                onChange={e => customer.setHomePhoneNumber(e.currentTarget.value)}
              />
              {apiErrors?.has('Contacts.HomePhoneNumber') && <div className='error'>{apiErrors?.getPropertyErrors('Contacts.HomePhoneNumber')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Mobile Phone Number</div>
              <input className={'input'} type="text" value={customer.mobilePhoneNumber}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'mobilePhoneNumber') || apiErrors?.has('Contacts.MobilePhoneNumber')}`}
                onFocus={() => apiErrors?.deleteError('Contacts.MobilePhoneNumber')}
                onChange={e => customer.setMobilePhoneNumber(e.currentTarget.value)}
              />
              {apiErrors?.has('Contacts.MobilePhoneNumber') && <div className='error'>{apiErrors?.getPropertyErrors('Contacts.MobilePhoneNumber')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Email</div>
              <input className={'input'} type="text" value={customer.email}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'email') || apiErrors?.has('Contacts.Email')}`}
                onFocus={() => apiErrors?.deleteError('Contacts.Email')}
                onChange={e => customer.setEmail(e.currentTarget.value)}
              />
              {apiErrors?.has('Contacts.Email') && <div className='error'>{apiErrors?.getPropertyErrors('Contacts.Email')[0]}</div>}
            </div>
            <div className={css.propertyGroupCaption}>Job Information</div>
            <div className={css.property}>
              <div className='caption'>Company</div>
              <input className={'input'} type="text" value={customer.company}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'company') || apiErrors?.has('WorkInfo.Company')}`}
                onFocus={() => apiErrors?.deleteError('WorkInfo.Company')}
                onChange={e => customer.setCompany(e.currentTarget.value)}
              />
              {apiErrors?.has('WorkInfo.Company') && <div className='error'>{apiErrors?.getPropertyErrors('WorkInfo.Company')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Position</div>
              <input className={'input'} type="text" value={customer.position}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'position') || apiErrors?.has('WorkInfo.Position')}`}
                onFocus={() => apiErrors?.deleteError('WorkInfo.Position')}
                onChange={e => customer.setPosition(e.currentTarget.value)}
              />
              {apiErrors?.has('WorkInfo.Position') && <div className='error'>{apiErrors?.getPropertyErrors('WorkInfo.Position')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Salary</div>
              <div className={cx('input', css.money)}
                is-invalid={`${!p.customerInfo.validation.isValid(customer, 'amount') || apiErrors?.has('IncomePerMonth.Amount')}`}
              >
                <input className='amount' type="text" value={customer.amount}
                  onChange={e => customer.setAmount(e.currentTarget.value)}
                />
                <select className='currency' value={customer.currencyId}
                  onChange={e => customer.setCurrencyId(parseInt(e.currentTarget.value))}
                >
                  {auxiliary.currencies.map((v, i) => (
                    <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
                  ))}
                </select>
              </div>
              {apiErrors?.has('IncomePerMonth.Amount') && <div className='error'>{apiErrors?.getPropertyErrors('IncomePerMonth.Amount')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Marital Status</div>
              <select className='input' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.maritalStatusId}
                is-invalid={`${apiErrors?.has('MaritalStatus')}`}
                onChange={e => customer.setMaritalStatusId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.maritalStatuses.map((v, i) => (
                  <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
                ))}
              </select>
              {apiErrors?.has('MaritalStatus') && <div className='error'>{apiErrors?.getPropertyErrors('MaritalStatus')[0]}</div>}
            </div>
            <div className={css.property}>
              <div className='caption'>Disability</div>
              <select className='input' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.disabilityId ? customer.disabilityId : ''}
                is-invalid={`${apiErrors?.has('DisabilityId')}`}
                onChange={e => customer.setDisabilityId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.disabilities.map((v, i) => (
                  <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
                ))}
              </select>
              {apiErrors?.has('DisabilityId') && <div className='error'>{apiErrors?.getPropertyErrors('DisabilityId')[0]}</div>}
            </div>
            <div className={cx(css.property, css.verticallyCentered)}>
              <div className='caption'>Is Retired</div>
              <input className={'input'} type="checkbox" checked={customer.isRetired}
                is-invalid={`${apiErrors?.has('IsRetired')}`}
                onChange={e => customer.setIsRetired(e.currentTarget.checked)}
              />
              {apiErrors?.has('IsRetired') && <div className='error'>{apiErrors?.getPropertyErrors('IsRetired')[0]}</div>}
            </div>
            <div className={cx(css.property, css.verticallyCentered)}>
              <div className='caption'>Is Liable For Military Service</div>
              <input className={'input'} type="checkbox" checked={customer.isLiableForMilitaryService}
                is-invalid={`${apiErrors?.has('IsLiableForMilitaryService')}`}
                onChange={e => customer.setIsLiableForMilitaryService(e.currentTarget.checked)}
              />
              {apiErrors?.has('IsLiableForMilitaryService') && <div className='error'>{apiErrors?.getPropertyErrors('IsLiableForMilitaryService')[0]}</div>}
            </div>
          </div>
        )}
      </React.Fragment>
    )
  })
}
