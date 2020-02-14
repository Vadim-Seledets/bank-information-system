import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { style } from './CustomerInfoPanel.css'
import { CustomerInfo as CustomerInfo } from '../../models/customers/CustomerInfo'
import { Gender } from '../../models/customers/Gender'
import { cx } from 'emotion'
import { dim } from '../../common/css'

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
            <div style={{ ...dim(1, 1, 1, 1)}} className={css.header}>Personal Information</div>
            {apiErrors?.has('') && <div style={{ ...dim(3, 1, 5, 1)}} className={css.error}>{apiErrors?.getPropertyErrors('')[0]}</div>}
            
            <div style={{ ...dim(1, 2, 1, 2)}} className={css.caption}>Last Name</div>
            <input style={{ ...dim(3, 2, 3, 2)}} className={css.input} type="text" value={customer.lastName}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'lastName') || apiErrors?.has('LastName')}`}
              onFocus={() => apiErrors?.deleteError('LastName')}
              onChange={e => customer.setLastName(e.currentTarget.value)} />
            {apiErrors?.has('LastName') && <div style={{ ...dim(5, 2, 5, 2)}} className={css.error}>{apiErrors?.getPropertyErrors('LastName')[0]}</div>}
            
            <div style={{ ...dim(1, 3, 1, 3)}} className={css.caption}>First Name</div>
            <input style={{ ...dim(3, 3, 3, 3) }} className={css.input} type="text" value={customer.firstName}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'firstName') || apiErrors?.has('FirstName')}`}
              onFocus={() => apiErrors?.deleteError('FirstName')}
              onChange={e => customer.setFirstName(e.currentTarget.value)}
            />
            {apiErrors?.has('FirstName') && <div style={{ ...dim(5, 3, 5, 3) }} className={css.error}>{apiErrors?.getPropertyErrors('FirstName')[0]}</div>}
            
            <div style={{ ...dim(1, 4, 1, 4)}} className={css.caption}>Middle Name</div>
            <input style={{ ...dim(3, 4, 3, 4) }} className={css.input} type="text" value={customer.middleName}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'middleName') || apiErrors?.has('MiddleName')}`}
              onFocus={() => apiErrors?.deleteError('MiddleName')}
              onChange={e => customer.setMiddleName(e.currentTarget.value)}
            />
            {apiErrors?.has('MiddleName') && <div style={{ ...dim(5, 4, 5, 4) }} className={css.error}>{apiErrors?.getPropertyErrors('MiddleName')[0]}</div>}
            
            <div style={{ ...dim(1, 5, 1, 5)}} className={css.caption}>Date Of Birth</div>
            <input style={{ ...dim(3, 5, 3, 5) }} className={css.input} type="date" value={customer.dateOfBirth}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'dateOfBirth') || apiErrors?.has('BirthInfo.DateOfBirth')}`}
              onFocus={() => apiErrors?.deleteError('BirthInfo.DateOfBirth')}
              onChange={e => customer.setDateOfBirth(e.currentTarget.value)}
            />
            {apiErrors?.has('BirthInfo.DateOfBirth') && <div style={{ ...dim(5, 5, 5, 5) }} className={css.error}>{apiErrors?.getPropertyErrors('BirthInfo.DateOfBirth')[0]}</div>}
            
            <div style={{ ...dim(1, 6, 1, 6)}} className={css.caption}>Gender</div>
            <div style={{ ...dim(3, 6, 3, 6), display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', fontSize: '0.9em' }}>
              {Object.keys(Gender).map((v, i) => (
                <React.Fragment key={`${i}:${v}`}>
                  <input type="radio" name="gender" checked={v === customer.gender ? true : false}
                    onChange={() => customer.setGender(v as Gender)} />&nbsp;{v}
                </React.Fragment>
              ))}
            </div>
            {apiErrors?.has('Gender') && <div style={{ ...dim(5, 6, 5, 6) }} className={css.error}>{apiErrors?.getPropertyErrors('Gender')[0]}</div>}
            
            <div style={{ ...dim(1, 7, 1, 7)}} className={css.header}>Passport Information</div>
            {apiErrors?.has('Passport') && <div style={{ ...dim(3, 7, 5, 7) }} className={css.error}>{apiErrors?.getPropertyErrors('Passport')[0]}</div>}
            
            <div style={{ ...dim(1, 8, 1, 8)}} className={css.caption}>Citizenship</div>
            <select style={{ ...dim(3, 8, 3, 8)}} className={css.input} value={customer.citizenshipId}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'citizenshipId') || apiErrors?.has('Passport.CitizenshipId')}`}
              onFocus={() => apiErrors?.deleteError('Passport.CitizenshipId')}
              onChange={e => customer.setCitizenshipId(parseInt(e.currentTarget.value))}
            >
              {auxiliary.countriesOfCitizenship.map((v, i) => (
                <option key={`${v.id}:${v.country}`} value={v.id}>{v.country}</option>
              ))}
            </select>
            {apiErrors?.has('Passport.CitizenshipId') && <div style={{ ...dim(5, 8, 5, 8) }} className={css.error}>{apiErrors?.getPropertyErrors('Passport.CitizenshipId')[0]}</div>}
            
            <div style={{ ...dim(1, 9, 1, 9)}} className={css.caption}>Passport Series</div>
            <input style={{ ...dim(3, 9, 3, 9) }} className={css.input} type="text" value={customer.series}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'series') || apiErrors?.has('Passport.Series')}`}
              onFocus={() => apiErrors?.deleteError('Passport.Series')}
              onChange={e => customer.setSeries(e.currentTarget.value)}
            />
            {apiErrors?.has('Passport.Series') && <div style={{ ...dim(5, 9, 5, 9) }} className={css.error}>{apiErrors?.getPropertyErrors('Passport.Series')[0]}</div>}
            
            <div style={{ ...dim(1, 10, 1, 10)}} className={css.caption}>Passport Number</div>
            <input style={{ ...dim(3, 10, 3, 10) }} className={css.input} type="text" value={customer.passportNumber}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'passportNumber') || apiErrors?.has('Passport.PassportNumber')}`}
              onFocus={() => apiErrors?.deleteError('Passport.PassportNumber')}
              onChange={e => customer.setPassportNumber(e.currentTarget.value)}
            />
            {apiErrors?.has('Passport.PassportNumber') && <div style={{ ...dim(5, 10, 5, 10) }} className={css.error}>{apiErrors?.getPropertyErrors('Passport.PassportNumber')[0]}</div>}
            
            <div style={{ ...dim(1, 11, 1, 11)}} className={css.caption}>Issuing Authority</div>
            <input style={{ ...dim(3, 11, 3, 11) }} className={css.input} type="text" value={customer.issuingAuthority}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'issuingAuthority') || apiErrors?.has('Passport.IssuingAuthority')}`}
              onFocus={() => apiErrors?.deleteError('Passport.IssuingAuthority')}
              onChange={e => customer.setIssuingAuthority(e.currentTarget.value)}
            />
            {apiErrors?.has('Passport.IssuingAuthority') && <div style={{ ...dim(5, 11, 5, 11) }} className={css.error}>{apiErrors?.getPropertyErrors('Passport.IssuingAuthority')[0]}</div>}
            
            <div style={{ ...dim(1, 12, 1, 12)}} className={css.caption}>Issued At</div>
            <input style={{ ...dim(3, 12, 3, 12) }} className={css.input} type="date" value={customer.issuedAt}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'issuedAt') || apiErrors?.has('Passport.IssuedAt')}`}
              onFocus={() => apiErrors?.deleteError('Passport.IssuedAt')}
              onChange={e => customer.setIssuedAt(e.currentTarget.value)}
            />
            {apiErrors?.has('Passport.IssuedAt') && <div style={{ ...dim(5, 12, 5, 12) }} className={css.error}>{apiErrors?.getPropertyErrors('Passport.IssuedAt')[0]}</div>}
            
            <div style={{ ...dim(1, 13, 1, 13)}} className={css.caption}>Id Number</div>
            <input style={{ ...dim(3, 13, 3, 13) }} className={css.input} type="text" value={customer.idNumber}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'idNumber') || apiErrors?.has('Passport.IdNumber')}`}
              onFocus={() => apiErrors?.deleteError('Passport.IdNumber')}
              onChange={e => customer.setIdNumber(e.currentTarget.value)}
            />
            {apiErrors?.has('Passport.IdNumber') && <div style={{ ...dim(5, 13, 5, 13) }} className={css.error}>{apiErrors?.getPropertyErrors('Passport.IdNumber')[0]}</div>}
            
            <div style={{ ...dim(1, 14, 1, 14)}} className={css.header}>Contact Information</div>

            <div style={{ ...dim(1, 15, 1, 15)}} className={css.caption}>Place Of Birth</div>
            <input style={{ ...dim(3, 15, 3, 15) }} className={css.input} type="text" value={customer.placeOfBirth}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfBirth') || apiErrors?.has('BirthInfo.PlaceOfBirth')}`}
              onFocus={() => apiErrors?.deleteError('BirthInfo.PlaceOfBirth')}
              onChange={e => customer.setPlaceOfBirth(e.currentTarget.value)}
            />
            {apiErrors?.has('BirthInfo.PlaceOfBirth') && <div style={{ ...dim(5, 15, 5, 15) }} className={css.error}>{apiErrors?.getPropertyErrors('BirthInfo.PlaceOfBirth')[0]}</div>}
            
            <div style={{ ...dim(1, 16, 1, 16)}} className={css.caption}>Place Of Living</div>
            <select style={{ ...dim(3, 16, 3, 16)}} className={css.input} value={customer.placeOfLivingCityId}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfLivingCityId') || apiErrors?.has('PlaceOfLiving.CityId')}`}
              onChange={e => customer.setPlaceOfLivingCityId(parseInt(e.currentTarget.value))}
            >
              {auxiliary.cities.map((v, i) => (
                <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
              ))}
            </select>
            {apiErrors?.has('PlaceOfLiving.CityId') && <div style={{ ...dim(5, 16, 5, 16) }} className={css.error}>{apiErrors?.getPropertyErrors('PlaceOfLiving.CityId')[0]}</div>}
            
            <div style={{ ...dim(1, 17, 1, 17)}} className={css.caption}>Address Of Living</div>
            <input style={{ ...dim(3, 17, 3, 17) }} className={css.input} type="text" value={customer.placeOfLivingAddress}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfLivingAddress') || apiErrors?.has('PlaceOfLiving.Address')}`}
              onFocus={() => apiErrors?.deleteError('PlaceOfLiving.Address')}
              onChange={e => customer.setPlaceOfLivingAddress(e.currentTarget.value)}
            />
            {apiErrors?.has('PlaceOfLiving.Address') && <div style={{ ...dim(5, 17, 5, 17) }} className={css.error}>{apiErrors?.getPropertyErrors('PlaceOfLiving.Address')[0]}</div>}
            
            <div style={{ ...dim(1, 18, 1, 18)}} className={css.caption}>Place Of Registration</div>
            <select style={{ ...dim(3, 18, 3, 18)}} className={css.input} value={customer.placeOfRegistrationCityId}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfRegistrationCityId') || apiErrors?.has('PlaceOfRegistration.CityId')}`}
              onChange={e => customer.setPlaceOfRegistrationCityId(parseInt(e.currentTarget.value))}
            >
              {auxiliary.cities.map((v, i) => (
                <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
              ))}
            </select>
            {apiErrors?.has('PlaceOfRegistration.CityId') && <div style={{ ...dim(5, 18, 5, 18) }} className={css.error}>{apiErrors?.getPropertyErrors('PlaceOfRegistration.CityId')[0]}</div>}
            
            <div style={{ ...dim(1, 19, 1, 19)}} className={css.caption}>Address Of Registration</div>
            <input style={{ ...dim(3, 19, 3, 19) }} className={css.input} type="text" value={customer.placeOfRegistrationAddress}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfRegistrationAddress') || apiErrors?.has('PlaceOfRegistration.Address')}`}
              onFocus={() => apiErrors?.deleteError('PlaceOfRegistration.Address')}
              onChange={e => customer.setPlaceOfRegistrationAddress(e.currentTarget.value)}
            />
            {apiErrors?.has('PlaceOfRegistration.Address') && <div style={{ ...dim(5, 19, 5, 19) }} className={css.error}>{apiErrors?.getPropertyErrors('PlaceOfRegistration.Address')[0]}</div>}
            
            <div style={{ ...dim(1, 20, 1, 20)}} className={css.caption}>Home Phone Number</div>
            <input style={{ ...dim(3, 20, 3, 20) }} className={css.input} type="text" value={customer.homePhoneNumber}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'homePhoneNumber') || apiErrors?.has('Contacts.HomePhoneNumber')}`}
              onFocus={() => apiErrors?.deleteError('Contacts.HomePhoneNumber')}
              onChange={e => customer.setHomePhoneNumber(e.currentTarget.value)}
            />
            {apiErrors?.has('Contacts.HomePhoneNumber') && <div style={{ ...dim(5, 20, 5, 20) }} className={css.error}>{apiErrors?.getPropertyErrors('Contacts.HomePhoneNumber')[0]}</div>}
            
            <div style={{ ...dim(1, 21, 1, 21)}} className={css.caption}>Mobile Phone Number</div>
            <input style={{ ...dim(3, 21, 3, 21) }} className={css.input} type="text" value={customer.mobilePhoneNumber}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'mobilePhoneNumber') || apiErrors?.has('Contacts.MobilePhoneNumber')}`}
              onFocus={() => apiErrors?.deleteError('Contacts.MobilePhoneNumber')}
              onChange={e => customer.setMobilePhoneNumber(e.currentTarget.value)}
            />
            {apiErrors?.has('Contacts.MobilePhoneNumber') && <div style={{ ...dim(5, 21, 5, 21) }} className={css.error}>{apiErrors?.getPropertyErrors('Contacts.MobilePhoneNumber')[0]}</div>}
            
            <div style={{ ...dim(1, 22, 1, 22)}} className={css.caption}>Email</div>
            <input style={{ ...dim(3, 22, 3, 22) }} className={css.input} type="text" value={customer.email}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'email') || apiErrors?.has('Contacts.Email')}`}
              onFocus={() => apiErrors?.deleteError('Contacts.Email')}
              onChange={e => customer.setEmail(e.currentTarget.value)}
            />
            {apiErrors?.has('Contacts.Email') && <div style={{ ...dim(5, 22, 5, 22) }} className={css.error}>{apiErrors?.getPropertyErrors('Contacts.Email')[0]}</div>}
            
            <div style={{ ...dim(1, 23, 3, 23)}} className={css.header}>Job Information</div>
            
            <div style={{ ...dim(1, 24, 1, 24)}} className={css.caption}>Company</div>
            <input style={{ ...dim(3, 24, 3, 24) }} className={css.input} type="text" value={customer.company}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'company') || apiErrors?.has('WorkInfo.Company')}`}
              onFocus={() => apiErrors?.deleteError('WorkInfo.Company')}
              onChange={e => customer.setCompany(e.currentTarget.value)}
            />
            {apiErrors?.has('WorkInfo.Company') && <div style={{ ...dim(5, 24, 5, 24) }} className={css.error}>{apiErrors?.getPropertyErrors('WorkInfo.Company')[0]}</div>}
            
            <div style={{ ...dim(1, 25, 1, 25)}} className={css.caption}>Position</div>
            <input style={{ ...dim(3, 25, 3, 25) }} className={css.input} type="text" value={customer.position}
              is-invalid={`${!p.customerInfo.validation.isValid(customer, 'position') || apiErrors?.has('WorkInfo.Position')}`}
              onFocus={() => apiErrors?.deleteError('WorkInfo.Position')}
              onChange={e => customer.setPosition(e.currentTarget.value)}
            />
            {apiErrors?.has('WorkInfo.Position') && <div style={{ ...dim(5, 25, 5, 25) }} className={css.error}>{apiErrors?.getPropertyErrors('WorkInfo.Position')[0]}</div>}
            
            <div style={{ ...dim(1, 26, 1, 26)}} className={css.caption}>Salary</div>
            <div style={{ ...dim(3, 26, 3, 26)}} className={cx(css.input, css.money)}
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
            {apiErrors?.has('IncomePerMonth.Amount') && <div style={{ ...dim(5, 26, 5, 26) }} className={css.error}>{apiErrors?.getPropertyErrors('IncomePerMonth.Amount')[0]}</div>}
            
            <div style={{ ...dim(1, 27, 1, 27)}} className={css.caption}>Marital Status</div>
            <select style={{ ...dim(3, 27, 3, 27)}} className={css.input} value={customer.maritalStatusId}
              is-invalid={`${apiErrors?.has('MaritalStatus')}`}
              onChange={e => customer.setMaritalStatusId(parseInt(e.currentTarget.value))}
            >
              {auxiliary.maritalStatuses.map((v, i) => (
                <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
              ))}
            </select>
            {apiErrors?.has('MaritalStatus') && <div style={{ ...dim(5, 27, 5, 27) }} className={css.error}>{apiErrors?.getPropertyErrors('MaritalStatus')[0]}</div>}
            
            <div style={{ ...dim(1, 28, 1, 28)}} className={css.caption}>Disability</div>
            <select style={{ ...dim(3, 28, 3, 28)}} className={css.input} value={customer.disabilityId ? customer.disabilityId : ''}
              is-invalid={`${apiErrors?.has('DisabilityId')}`}
              onChange={e => customer.setDisabilityId(parseInt(e.currentTarget.value))}
            >
              {auxiliary.disabilities.map((v, i) => (
                <option key={`${v.id}:${v.description}`} value={v.id}>{v.description}</option>
              ))}
            </select>
            {apiErrors?.has('DisabilityId') && <div style={{ ...dim(5, 28, 5, 28) }} className={css.error}>{apiErrors?.getPropertyErrors('DisabilityId')[0]}</div>}
            
            <div style={{ ...dim(1, 29, 1, 29)}} className={css.caption}>Is Retired</div>
            <input style={{ ...dim(3, 29, 3, 29) }} className={css.input} type="checkbox" checked={customer.isRetired}
              is-invalid={`${apiErrors?.has('IsRetired')}`}
              onChange={e => customer.setIsRetired(e.currentTarget.checked)}
            />
            {apiErrors?.has('IsRetired') && <div style={{ ...dim(5, 29, 5, 29) }} className={css.error}>{apiErrors?.getPropertyErrors('IsRetired')[0]}</div>}
            
            <div style={{ ...dim(1, 30, 1, 30)}} className={css.caption}>Is Liable For Military Service</div>
            <input style={{ ...dim(3, 30, 3, 30) }} className={css.input} type="checkbox" checked={customer.isLiableForMilitaryService}
              is-invalid={`${apiErrors?.has('IsLiableForMilitaryService')}`}
              onChange={e => customer.setIsLiableForMilitaryService(e.currentTarget.checked)}
            />
            {apiErrors?.has('IsLiableForMilitaryService') && <div style={{ ...dim(5, 30, 5, 30) }} className={css.error}>{apiErrors?.getPropertyErrors('IsLiableForMilitaryService')[0]}</div>}
          </div>
        )}
      </React.Fragment>
    )
  })
}
