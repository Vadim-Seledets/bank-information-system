import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './CustomerInfoPage.css'
import { CustomersPage } from '../../models/customers/CustomersPage'

export function CustomerInfoPageView(p: { customersPage: CustomersPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const customer = p.customersPage.selectedCustomer
    return (
      <div className={css.main}>
        <div className={css.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <div className='space' />
          <button className={css.backButton} onClick={() => p.customersPage.app.setCurrentPageName('CustomersListPage')}>
            Back
          </button>
        </div>
        <div style={{ ...dim(2, 2, 11, 12) }}>
          {customer && (
            <div className={css.customerInfo}>
              <div className={css.propertyGroup}>
                <div className={css.propertyGroupCaption}>Personal Information</div>
                <div className='hLine' />
                <div className={css.property}>
                  <div className='name'>Last Name</div>
                  <div className={'value'}>{customer.lastName}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>First Name</div>
                  <div className={'value'}>{customer.firstName}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Middle Name</div>
                  <div className={'value'}>{customer.middleName}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Date Of Birth</div>
                  <div className={'value'}>{customer.dateOfBirth}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Gender</div>
                  <div className={'value'}>{customer.gender}</div>
                </div>
              </div>
              <div className={css.propertyGroup}>
                <div className={css.propertyGroupCaption}>Passport Information</div>
                <div className='hLine' />
                <div className={css.property}>
                  <div className='name'>Citizenship</div>
                  <div className={'value'}>{p.customersPage.auxiliary.countriesOfCitizenship.find(v => v.id === customer.citizenshipId)?.country}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Passport Series</div>
                  <div className={'value'}>{customer.series}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Passport Number</div>
                  <div className={'value'}>{customer.passportNumber}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Issuing Authority</div>
                  <div className={'value'}>{customer.issuingAuthority}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Issued At</div>
                  <div className={'value'}>{customer.issuedAt}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Id Number</div>
                  <div className={'value'}>{customer.idNumber}</div>
                </div>
              </div>
              <div className={css.propertyGroup}>
                <div className={css.propertyGroupCaption}>Job Information</div>
                <div className='hLine' />
                <div className={css.property}>
                  <div className='name'>Company</div>
                  <div className={'value'}>{customer.company}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Position</div>
                  <div className={'value'}>{customer.position}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Salary</div>
                  <div className={'value'}>{`${customer.amount} ${p.customersPage.auxiliary.currencies.find(v => v.id === customer.currencyId)?.code}`}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Marital Status</div>
                  <div className={'value'}>{p.customersPage.auxiliary.maritalStatuses.find(v => v.id === customer.maritalStatusId)?.description}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Disability</div>
                  <div className={'value'}>{p.customersPage.auxiliary.disabilities.find(v => v.id === customer.disabilityId)?.description}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Is Retired</div>
                  <div className={'value'}>{customer.isRetired ? 'Yes' : 'No'}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Is Liable For Military Service</div>
                  <div className={'value'}>{customer.isLiableForMilitaryService ? 'Yes' : 'No'}</div>
                </div>
              </div>
              <div className={css.propertyGroup}>
                <div className={css.propertyGroupCaption}>Contact Information</div>
                <div className='hLine' />
                <div className={css.property}>
                  <div className='name'>Place Of Birth</div>
                  <div className={'value'}>{customer.placeOfBirth}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Place Of Living</div>
                  <div className={'value'}>{p.customersPage.auxiliary.cities.find(v => v.id === customer.placeOfLivingCityId)?.name}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Address Of Living</div>
                  <div className={'value'}>{customer.placeOfLivingAddress}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Place Of Registration</div>
                  <div className={'value'}>{p.customersPage.auxiliary.cities.find(v => v.id === customer.placeOfRegistrationCityId)?.name}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Address Of Registration</div>
                  <div className={'value'}>{customer.placeOfRegistrationAddress}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Home Phone Number</div>
                  <div className={'value'}>{customer.homePhoneNumber}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Mobile Phone Number</div>
                  <div className={'value'}>{customer.mobilePhoneNumber}</div>
                </div>
                <div className={css.property}>
                  <div className='name'>Email</div>
                  <div className={'value'}>{customer.email}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  })
}
