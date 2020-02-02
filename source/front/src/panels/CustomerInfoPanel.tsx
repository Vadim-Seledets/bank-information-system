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
                {customer.errors?.errors?.some(v => v.name === 'Customer.LastName') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Customer.LastName')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.lastName}
                is-invalid={`${!p.customerInfo.validation.isValid('lastName') || customer.errors?.errors?.some(v => v.name === 'Customer.LastName')}`}
                onChange={e => customer.setLastName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>First name</div>
                {customer.errors?.errors?.some(v => v.name === 'Customer.FirstName') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Customer.FirstName')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.firstName}
                is-invalid={`${!p.customerInfo.validation.isValid('firstName') || customer.errors?.errors?.some(v => v.name === 'Customer.FirstName')}`}
                onChange={e => customer.setFirstName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Middle name</div>
                {customer.errors?.errors?.some(v => v.name === 'Customer.MiddleName') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Customer.MiddleName')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.middleName}
                is-invalid={`${!p.customerInfo.validation.isValid('middleName') || customer.errors?.errors?.some(v => v.name === 'Customer.MiddleName')}`}
                onChange={e => customer.setMiddleName(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Date of birth</div>
                {customer.errors?.errors?.some(v => v.name === 'BirthInfo.DateOfBirth') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'BirthInfo.DateOfBirth')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="date" value={customer.dateOfBirth}
                is-invalid={`${!p.customerInfo.validation.isValid('dateOfBirth') || customer.errors?.errors?.some(v => v.name === 'BirthInfo.DateOfBirth')}`}
                onChange={e => customer.setDateOfBirth(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Gender</div>
                {customer.errors?.errors?.some(v => v.name === 'Customer.Gender') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Customer.Gender')?.message}</div>
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
                {customer.errors?.errors?.some(v => v.name === 'Passport.CitizenshipId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Passport.CitizenshipId')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.citizenshipId}
                is-invalid={`${!p.customerInfo.validation.isValid('citizenshipId') || customer.errors?.errors?.some(v => v.name === 'Passport.CitizenshipId')}`}
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
                {customer.errors?.errors?.some(v => v.name === 'Passport.Series') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Passport.Series')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.series}
                is-invalid={`${!p.customerInfo.validation.isValid('series') || customer.errors?.errors?.some(v => v.name === 'Passport.Series')}`}
                onChange={e => customer.setSeries(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Passport number</div>
                {customer.errors?.errors?.some(v => v.name === 'Passport.PassportNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Passport.PassportNumber')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.passportNumber}
                is-invalid={`${!p.customerInfo.validation.isValid('passportNumber') || customer.errors?.errors?.some(v => v.name === 'Passport.PassportNumber')}`}
                onChange={e => customer.setPassportNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Issuing authority</div>
                {customer.errors?.errors?.some(v => v.name === 'Passport.IssuingAuthority') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Passport.IssuingAuthority')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.issuingAuthority}
                is-invalid={`${!p.customerInfo.validation.isValid('issuingAuthority') || customer.errors?.errors?.some(v => v.name === 'Passport.IssuingAuthority')}`}
                onChange={e => customer.setIssuingAuthority(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Issued at</div>
                {customer.errors?.errors?.some(v => v.name === 'Passport.IssuedAt') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Passport.IssuedAt')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="date" value={customer.issuedAt}
                is-invalid={`${!p.customerInfo.validation.isValid('issuedAt') || customer.errors?.errors?.some(v => v.name === 'Passport.IssuedAt')}`}
                onChange={e => customer.setIssuedAt(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Id number</div>
                {customer.errors?.errors?.some(v => v.name === 'Passport.IdNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Passport.IdNumber')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.idNumber}
                is-invalid={`${!p.customerInfo.validation.isValid('idNumber') || customer.errors?.errors?.some(v => v.name === 'Passport.IdNumber')}`}
                onChange={e => customer.setIdNumber(e.currentTarget.value)} />
            </div>
            <div className={css.propertyGroupCaption}>Contact Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place of birth</div>
                {customer.errors?.errors?.some(v => v.name === 'BirthInfo.PlaceOfBirth') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'BirthInfo.PlaceOfBirth')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfBirth}
                is-invalid={`${!p.customerInfo.validation.isValid('placeOfBirth') || customer.errors?.errors?.some(v => v.name === 'BirthInfo.PlaceOfBirth')}`}
                onChange={e => customer.setPlaceOfBirth(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place of living</div>
                {customer.errors?.errors?.some(v => v.name === 'PlaceOfLiving.CityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'PlaceOfLiving.CityId')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfLivingCityId}
                is-invalid={`${!p.customerInfo.validation.isValid('placeOfLivingCityId') || customer.errors?.errors?.some(v => v.name === 'PlaceOfLiving.CityId')}`}
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
                {customer.errors?.errors?.some(v => v.name === 'PlaceOfLiving.Address') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'PlaceOfLiving.Address')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfLivingAddress}
                is-invalid={`${!p.customerInfo.validation.isValid('placeOfLivingAddress') || customer.errors?.errors?.some(v => v.name === 'PlaceOfLiving.Address')}`}
                onChange={e => customer.setPlaceOfLivingAddress(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Place of registration</div>
                {customer.errors?.errors?.some(v => v.name === 'PlaceOfRegistration.CityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'PlaceOfRegistration.CityId')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfRegistrationCityId}
                is-invalid={`${!p.customerInfo.validation.isValid('placeOfRegistrationCityId') || customer.errors?.errors?.some(v => v.name === 'PlaceOfRegistration.CityId')}`}
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
                {customer.errors?.errors?.some(v => v.name === 'PlaceOfRegistration.CityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'PlaceOfRegistration.CityId')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.placeOfRegistration.cityId}
                is-invalid={`${customer.errors?.errors?.some(v => v.name === 'PlaceOfRegistration.CityId')}`}
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
                {customer.errors?.errors?.some(v => v.name === 'PlaceOfRegistration.Address') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'PlaceOfRegistration.Address')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.placeOfRegistrationAddress}
                is-invalid={`${!p.customerInfo.validation.isValid('placeOfRegistrationAddress') || customer.errors?.errors?.some(v => v.name === 'PlaceOfRegistration.Address')}`}
                onChange={e => customer.setPlaceOfRegistrationAddress(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Home phone number</div>
                {customer.errors?.errors?.some(v => v.name === 'Contacts.HomePhoneNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Contacts.HomePhoneNumber')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.homePhoneNumber}
                is-invalid={`${!p.customerInfo.validation.isValid('homePhoneNumber') || customer.errors?.errors?.some(v => v.name === 'Contacts.HomePhoneNumber')}`}
                onChange={e => customer.setHomePhoneNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Mobile phone number</div>
                {customer.errors?.errors?.some(v => v.name === 'Contacts.MobilePhoneNumber') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Contacts.MobilePhoneNumber')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.mobilePhoneNumber}
                is-invalid={`${!p.customerInfo.validation.isValid('mobilePhoneNumber') || customer.errors?.errors?.some(v => v.name === 'Contacts.MobilePhoneNumber')}`}
                onChange={e => customer.setMobilePhoneNumber(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Email</div>
                {customer.errors?.errors?.some(v => v.name === 'Contacts.Email') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Contacts.Email')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.email}
                is-invalid={`${!p.customerInfo.validation.isValid('email') || customer.errors?.errors?.some(v => v.name === 'Contacts.Email')}`}
                onChange={e => customer.setEmail(e.currentTarget.value)} />
            </div>
            <div className={css.propertyGroupCaption}>Job Information</div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Company</div>
                {customer.errors?.errors?.some(v => v.name === 'WorkInfo.Company') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'WorkInfo.Company')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.company}
                is-invalid={`${!p.customerInfo.validation.isValid('company') || customer.errors?.errors?.some(v => v.name === 'WorkInfo.Company')}`}
                onChange={e => customer.setCompany(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Position</div>
                {customer.errors?.errors?.some(v => v.name === 'WorkInfo.Position') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'WorkInfo.Position')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <input className={'propertyInputColumn'} type="text" value={customer.position}
                is-invalid={`${!p.customerInfo.validation.isValid('position') || customer.errors?.errors?.some(v => v.name === 'WorkInfo.Position')}`}
                onChange={e => customer.setPosition(e.currentTarget.value)} />
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Salary</div>
                {customer.errors?.errors?.some(v => v.name === 'IncomePerMonth.Amount') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'IncomePerMonth.Amount')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <div className='propertyInputHorizontalLine'>
                <input className={'propertyInputColumn'} type="number" value={customer.amount}
                  is-invalid={`${!p.customerInfo.validation.isValid('amount') || customer.errors?.errors?.some(v => v.name === 'IncomePerMonth.Amount')}`}
                  onChange={e => customer.setAmount(e.currentTarget.value)} />
                <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.currencyId}
                  is-invalid={`${customer.errors?.errors?.some(v => v.name === 'IncomePerMonth.CurrencyId')}`}
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
                {customer.errors?.errors?.some(v => v.name === 'Customer.MaritalStatus') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Customer.MaritalStatus')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.maritalStatusId}
                is-invalid={`${customer.errors?.errors?.some(v => v.name === 'Customer.MaritalStatus')}`}
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
                {customer.errors?.errors?.some(v => v.name === 'Customer.DisabilityId') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Customer.DisabilityId')?.message}</div>
                    </div>
                  </div>
                )}
              </div>
              <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={customer.disabilityId ? customer.disabilityId : ''}
                is-invalid={`${customer.errors?.errors?.some(v => v.name === 'Customer.DisabilityId')}`}
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
                {customer.errors?.errors?.some(v => v.name === 'Customer.IsRetired') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Customer.IsRetired')?.message}</div>
                    </div>
                  </div>
                )}
                <input className={'input'} style={{alignSelf: 'center'}} type="checkbox" checked={customer.isRetired}
                  is-invalid={`${customer.errors?.errors?.some(v => v.name === 'Customer.IsRetired')}`}
                  onChange={e => customer.setIsRetired(e.currentTarget.checked)} />
              </div>
            </div>
            <div className={css.property}>
              <div className='propertyNameLine'>
                <div className='name'>Is liable for military service</div>
                {customer.errors?.errors?.some(v => v.name === 'Customer.IsLiableForMilitaryService') && (
                  <div className='error las la-exclamation'>
                    <div className='errorPopUp'>
                      <div className='errorRow'>{customer.errors.errors.find(v => v.name === 'Customer.IsLiableForMilitaryService')?.message}</div>
                    </div>
                  </div>
                )}
                <input className={'input'} style={{alignSelf: 'center'}} type="checkbox" checked={customer.isLiableForMilitaryService}
                  is-invalid={`${customer.errors?.errors?.some(v => v.name === 'Customer.IsLiableForMilitaryService')}`}
                  onChange={e => customer.setIsLiableForMilitaryService(e.currentTarget.checked)} />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  })
}
