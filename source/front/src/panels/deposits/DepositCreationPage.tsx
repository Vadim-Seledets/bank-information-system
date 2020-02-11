import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './DepositCreationPage.css'
import { DepositsPage } from '../../models/deposits/DepositsPage'

export function DepositCreationPageView(p: { depositsPage: DepositsPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const creatingDeposit = p.depositsPage.depositCreationPage.creatingDeposit
    const auxiliary = p.depositsPage.app.auxiliary
    return (
      <div className={css.main}>
        <div className={css.headLine} style={{ ...dim(2, 1, 11, 1) }}>
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
          <button className={css.backButton} onClick={() => p.depositsPage.depositCreationPage.cancelCreation()}>
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
                  {creatingDeposit.infoErrors.has('DepositTypeId') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {creatingDeposit.infoErrors.getPropertyErrors('DepositTypeId').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={creatingDeposit.depositTypeId}
                  is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'depositTypeId') || creatingDeposit.infoErrors.has('DepositTypeId')}`}
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
                  {creatingDeposit.infoErrors.has('ContractNumber') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {creatingDeposit.infoErrors.getPropertyErrors('ContractNumber').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input className={'propertyInputColumn'} disabled={true} type="text" value={creatingDeposit.contractNumber} />
              </div>
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Program Start Date</div>
                  {creatingDeposit.infoErrors.has('ProgramStartDate') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {creatingDeposit.infoErrors.getPropertyErrors('ProgramStartDate').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input className={'propertyInputColumn'} type="date" value={creatingDeposit.programStartDate}
                  is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'programStartDate') || creatingDeposit.infoErrors.has('ProgramStartDate')}`}
                  onChange={e => creatingDeposit.setProgramStartDate(e.currentTarget.value)} />
              </div>
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Program End Date</div>
                  {creatingDeposit.infoErrors.has('ProgramEndDate') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {creatingDeposit.infoErrors.getPropertyErrors('ProgramEndDate').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input className={'propertyInputColumn'} type="date" value={creatingDeposit.programEndDate}
                  is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'programEndDate') || creatingDeposit.infoErrors.has('ProgramEndDate')}`}
                  onChange={e => creatingDeposit.setProgramEndDate(e.currentTarget.value)} />
              </div>
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Contract Valid Until</div>
                  {creatingDeposit.infoErrors.has('ContractValidUntil') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {creatingDeposit.infoErrors.getPropertyErrors('ContractValidUntil').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input className={'propertyInputColumn'} type="date" value={creatingDeposit.contractValidUntil}
                  is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'contractValidUntil') || creatingDeposit.infoErrors.has('ContractValidUntil')}`}
                  onChange={e => creatingDeposit.setContractValidUntil(e.currentTarget.value)} />
              </div>
              <div className={css.property}>
                <div className='propertyNameLine'>
                  <div className='name'>Customer</div>
                  {creatingDeposit.infoErrors.has('CustomerId') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {creatingDeposit.infoErrors.getPropertyErrors('CustomerId').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={creatingDeposit.customerId}
                  is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'customerId') || creatingDeposit.infoErrors.has('CustomerId')}`}
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
                  {creatingDeposit.infoErrors.has('Amount') && (
                    <div className='error las la-exclamation'>
                      <div className='errorPopUp'>
                        {creatingDeposit.infoErrors.getPropertyErrors('Amount').map((v, i) => (
                          <div key={i} className='errorRow'>{v}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className='propertyInputHorizontalLine'>
                  <input className={'propertyInputColumn'} type="number" value={creatingDeposit.amount}
                    is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'amount') || creatingDeposit.infoErrors.has('Amount')}`}
                    onChange={e => creatingDeposit.setAmount(parseInt(e.currentTarget.value))} />
                  <select className='propertyInputColumn' style={{ height: 'auto', marginTop: '0.3em' }} value={creatingDeposit.currencyId}
                    is-invalid={`${creatingDeposit.infoErrors.has('CurrencyId')}`}
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
                    {creatingDeposit.infoErrors.has('Rate') && (
                      <div className='error las la-exclamation'>
                        <div className='errorPopUp'>
                          {creatingDeposit.infoErrors.getPropertyErrors('Rate').map((v, i) => (
                            <div key={i} className='errorRow'>{v}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <input className={'propertyInputColumn'} type="number" max={1} min={0} step={0.001} value={creatingDeposit.rate}
                    is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'rate') || creatingDeposit.infoErrors.has('Rate')}`}
                    onChange={e => creatingDeposit.setRate(parseFloat(e.currentTarget.value))} />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    )
  })
}
