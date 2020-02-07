import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './CustomerInfoPage.css'
import { CustomersPage } from '../../models/CustomersPage'

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
              <div className={css.propertyGroupCaption}>Personal Information</div>
              <div className={css.property}>
                <div className='name'>Last name</div>
                <div className={'value'}>{customer.lastName}</div>
              </div>
              <div className={css.property}>
                <div className='name'>First name</div>
                <div className={'value'}>{customer.firstName}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Middle name</div>
                <div className={'value'}>{customer.middleName}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Date of birth</div>
                <div className={'value'}>{customer.dateOfBirth}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Gender</div>
                <div className={'value'}>{customer.gender}</div>
              </div>
              <div className={css.propertyGroupCaption}>Passport Information</div>
              <div className={css.property}>
                <div className='name'>Citizenship</div>
                {/* {p.customerInfo.auxiliary.countriesOfCitizenship.map((v, i) => (
                    <option key={`${v.id}:${v.country}`} value={v.id}>{v.country}</option>
                  ))} */}
                <div className={'value'}>[Citizenship]</div>
              </div>
              <div className={css.property}>
                <div className='name'>Passport series</div>
                <div className={'value'}>{customer.series}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Passport number</div>
                <div className={'value'}>{customer.passportNumber}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Issuing authority</div>
                <div className={'value'}>{customer.issuingAuthority}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Issued at</div>
                <div className={'value'}>{customer.issuedAt}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Id number</div>
                <div className={'value'}>{customer.idNumber}</div>
              </div>
              <div className={css.propertyGroupCaption}>Contact Information</div>
              <div className={css.property}>
                <div className='name'>Place of birth</div>
                <div className={'value'}>{customer.placeOfBirth}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Place of living</div>
                <div className={'value'}>[City]</div>
              </div>
              <div className={css.property}>
                <div className='name'>Address of living</div>
                <div className={'value'}>{customer.placeOfLivingAddress}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Place of registration</div>
                <div className={'value'}>[City]</div>
              </div>
              <div className={css.property}>
                <div className='name'>Address of registration</div>
                <div className={'value'}>{customer.placeOfRegistrationAddress}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Home phone number</div>
                <div className={'value'}>{customer.homePhoneNumber}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Mobile phone number</div>
                <div className={'value'}>{customer.mobilePhoneNumber}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Email</div>
                <div className={'value'}>{customer.email}</div>
              </div>
              <div className={css.propertyGroupCaption}>Job Information</div>
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
                <div className={'value'}>{`${customer.amount} ${customer.currencyId}`}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Marital status</div>
                <div className={'value'}>{customer.maritalStatusId}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Disability</div>
                <div className={'value'}>{customer.disabilityId}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Is retired</div>
                <div className={'value'}>{customer.isRetired ? 'Yes' : 'No'}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Is liable for military service</div>
                <div className={'value'}>{customer.isLiableForMilitaryService ? 'Yes' : 'No'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  })
}
