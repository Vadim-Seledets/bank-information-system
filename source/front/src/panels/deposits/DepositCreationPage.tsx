import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './DepositCreationPage.css'
import { commonStyle } from '../../common/CommonStyles.css'
import { DepositsPage } from '../../models/deposits/DepositsPage'

export function DepositCreationPageView(p: { depositsPage: DepositsPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const commonCss = commonStyle.classes
    const creatingDeposit = p.depositsPage.depositCreationPage.creatingDeposit
    const auxiliary = p.depositsPage.app.auxiliary
    const apiErrors = p.depositsPage.depositCreationPage.apiErrors
    return (
      <div className={commonCss.main}>
        <div className={commonCss.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={css.editOrPublishButton}
            is-enabled={`${p.depositsPage.depositCreationPage.validation.areAllValid(creatingDeposit!)}`}
            onClick={() => p.depositsPage.depositCreationPage.publishNewDepositRequest()}
          >
            <React.Fragment>
              <span className='las la-upload' style={{ marginRight: '0.5em' }} />
              Publish a New Deposit
            </React.Fragment>
          </button>
          <div className='space' />
          <button className={commonCss.backButton} onClick={() => p.depositsPage.depositCreationPage.cancelCreation()}>
            Cancel
          </button>
        </div>
        <div className={css.properties} style={{ ...dim(2, 2, 11, 12) }}>
          {creatingDeposit && (
            <React.Fragment>
              {/* <div className={css.propertyGroupCaption}>Personal Information</div> */}
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Deposit Type</div>
                  {apiErrors?.has('DepositTypeId') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {apiErrors?.getPropertyErrors('DepositTypeId').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={creatingDeposit.depositTypeId}
                  is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'depositTypeId') || apiErrors?.has('DepositTypeId')}`}
                  onChange={e => creatingDeposit.setDepositTypeId(parseInt(e.currentTarget.value))}
                >
                  {auxiliary.depositTypes.map((v, i) => (
                    <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Contract Number</div>
                  {apiErrors?.has('ContractNumber') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {apiErrors?.getPropertyErrors('ContractNumber').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input className={'propertyInputColumn'} disabled={true} type="text" value={creatingDeposit.contractNumber}
                  onFocus={() => apiErrors?.deleteError('ContractNumber')}
                />
              </div>
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Program Start Date</div>
                  {apiErrors?.has('ProgramStartDate') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {apiErrors?.getPropertyErrors('ProgramStartDate').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input className={'propertyInputColumn'} type="date" value={creatingDeposit.programStartDate}
                  is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'programStartDate') || apiErrors?.has('ProgramStartDate')}`}
                  onFocus={() => apiErrors?.deleteError('ProgramStartDate')}
                  onChange={e => creatingDeposit.setProgramStartDate(e.currentTarget.value)} />
              </div>
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Program End Date</div>
                  {apiErrors?.has('ProgramEndDate') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {apiErrors?.getPropertyErrors('ProgramEndDate').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input className={'propertyInputColumn'} type="date" value={creatingDeposit.programEndDate}
                  is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'programEndDate') || apiErrors?.has('ProgramEndDate')}`}
                  onFocus={() => apiErrors?.deleteError('ProgramEndDate')}
                  onChange={e => creatingDeposit.setProgramEndDate(e.currentTarget.value)} />
              </div>
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Contract Valid Until</div>
                  {apiErrors?.has('ContractValidUntil') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {apiErrors?.getPropertyErrors('ContractValidUntil').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input className={'propertyInputColumn'} type="date" value={creatingDeposit.contractValidUntil}
                  is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'contractValidUntil') || apiErrors?.has('ContractValidUntil')}`}
                  onFocus={() => apiErrors?.deleteError('ContractValidUntil')}
                  onChange={e => creatingDeposit.setContractValidUntil(e.currentTarget.value)} />
              </div>
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Customer</div>
                  {apiErrors?.has('CustomerId') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {apiErrors?.getPropertyErrors('CustomerId').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={creatingDeposit.customerId}
                  is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'customerId') || apiErrors?.has('CustomerId')}`}
                  onChange={e => creatingDeposit.setCustomerId(parseInt(e.currentTarget.value))}
                >
                  {p.depositsPage.app.customersPage.customers.map((v, i) => (
                    <option key={`${v.id}`} value={v.id}>{`${v.firstName} ${v.middleName} ${v.lastName}`}</option>
                  ))}
                </select>
              </div>
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Amount</div>
                  {apiErrors?.has('Amount') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {apiErrors?.getPropertyErrors('Amount').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className='propertyInputHorizontalLine'>
                  <input className={'propertyInputColumn'} type="number" defaultValue={creatingDeposit.amount}
                    is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'amount') || apiErrors?.has('Amount')}`}
                    onFocus={() => apiErrors?.deleteError('Amount')} 
                    onChange={e => creatingDeposit.setAmount(e.currentTarget.value !== '' ? parseFloat(e.currentTarget.value) : 0)} />
                  <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={creatingDeposit.currencyId}
                    is-invalid={`${apiErrors?.has('CurrencyId')}`}
                    onChange={e => creatingDeposit.setCurrencyId(parseInt(e.currentTarget.value))}
                  >
                    {auxiliary.currencies.map((v, i) => (
                      <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
                    ))}
                  </select>
                </div>
                <div className={css.property}>
                  <div className='propertyNameLine'>
                    <div className='name'>Rate</div>
                    {apiErrors?.has('Rate') && (
                      <div className='error las la-exclamation'>
                        <div className='errorPopUp'>
                          {apiErrors?.getPropertyErrors('Rate').map((v, i) => (
                            <div key={i} className='errorRow'>{v}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <input className={'propertyInputColumn'} type="number" max={1} min={0} step={0.001} defaultValue={creatingDeposit.rate}
                    is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'rate') || apiErrors?.has('Rate')}`}
                    onFocus={() => apiErrors?.deleteError('Rate')}
                    onChange={e => creatingDeposit.setRate(e.currentTarget.value !== '' ? parseFloat(e.currentTarget.value) : 0)} />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    )
  })
}
