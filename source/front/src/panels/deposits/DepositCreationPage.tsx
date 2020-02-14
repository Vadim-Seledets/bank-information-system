import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './DepositCreationPage.css'
import { commonStyle } from '../../common/CommonStyles.css'
import { DepositsPage } from '../../models/deposits/DepositsPage'
import { cx } from 'emotion'

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
              <div style={{ ...dim(1, 1, 5, 1) }} className={css.header}>
                <div className='caption'>Deposit Information</div>
                {apiErrors?.has('') && <div style={{ ...dim(3, 1, 5, 1) }} className={css.error}>{apiErrors?.getPropertyErrors('')[0]}</div>}
              </div>

              <div style={{ ...dim(1, 2, 1, 2) }} className={css.caption}>Deposit Type</div>
              <select style={{ ...dim(3, 2, 3, 2) }} className={css.input} value={creatingDeposit.depositTypeId}
                is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'depositTypeId') || apiErrors?.has('DepositTypeId')}`}
                onChange={e => creatingDeposit.setDepositTypeId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.depositTypes.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
              {apiErrors?.has('DepositTypeId') && <div style={{ ...dim(5, 2, 5, 2) }} className={css.error}>{apiErrors?.getPropertyErrors('DepositTypeId')[0]}</div>}

              <div style={{ ...dim(1, 3, 1, 3) }} className={css.caption}>Contract Number</div>
              <input style={{ ...dim(3, 3, 3, 3) }} className={css.input} disabled={true} type="text" value={creatingDeposit.contractNumber}
                onFocus={() => apiErrors?.deleteError('ContractNumber')}
              />
              {apiErrors?.has('ContractNumber') && <div style={{ ...dim(5, 3, 5, 3) }} className={css.error}>{apiErrors?.getPropertyErrors('ContractNumber')[0]}</div>}

              <div style={{ ...dim(1, 4, 1, 4) }} className={css.caption}>Program Start Date</div>
              <input style={{ ...dim(3, 4, 3, 4) }} className={css.input} type="date" value={creatingDeposit.programStartDate}
                is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'programStartDate') || apiErrors?.has('ProgramStartDate')}`}
                onFocus={() => apiErrors?.deleteError('ProgramStartDate')}
                onChange={e => creatingDeposit.setProgramStartDate(e.currentTarget.value)}
              />
              {apiErrors?.has('ProgramStartDate') && <div style={{ ...dim(5, 4, 5, 4) }} className={css.error}>{apiErrors?.getPropertyErrors('ProgramStartDate')[0]}</div>}

              <div style={{ ...dim(1, 5, 1, 5) }} className={css.caption}>Program End Date</div>
              <input style={{ ...dim(3, 5, 3, 5) }} className={css.input} type="date" value={creatingDeposit.programEndDate}
                is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'programEndDate') || apiErrors?.has('ProgramEndDate')}`}
                onFocus={() => apiErrors?.deleteError('ProgramEndDate')}
                onChange={e => creatingDeposit.setProgramEndDate(e.currentTarget.value)}
              />
              {apiErrors?.has('ProgramEndDate') && <div style={{ ...dim(5, 5, 5, 5) }} className={css.error}>{apiErrors?.getPropertyErrors('ProgramEndDate')[0]}</div>}

              <div style={{ ...dim(1, 6, 1, 6) }} className={css.caption}>Contract Valid Until</div>
              <input style={{ ...dim(3, 6, 3, 6) }} className={css.input} type="date" value={creatingDeposit.contractValidUntil}
                is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'contractValidUntil') || apiErrors?.has('ContractValidUntil')}`}
                onFocus={() => apiErrors?.deleteError('ContractValidUntil')}
                onChange={e => creatingDeposit.setContractValidUntil(e.currentTarget.value)}
              />
              {apiErrors?.has('ContractValidUntil') && <div style={{ ...dim(5, 6, 5, 6) }} className={css.error}>{apiErrors?.getPropertyErrors('ContractValidUntil')[0]}</div>}

              <div style={{ ...dim(1, 7, 1, 7) }} className={css.caption}>Customer</div>
              <select style={{ ...dim(3, 7, 3, 7) }} className={css.input} value={creatingDeposit.customerId}
                is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'customerId') || apiErrors?.has('CustomerId')}`}
                onChange={e => creatingDeposit.setCustomerId(parseInt(e.currentTarget.value))}
              >
                {p.depositsPage.app.customersPage.customers.map((v, i) => (
                  <option key={`${v.id}`} value={v.id}>{`${v.firstName} ${v.middleName} ${v.lastName}`}</option>
                ))}
              </select>
              {apiErrors?.has('CustomerId') && <div style={{ ...dim(5, 7, 5, 7) }} className={css.error}>{apiErrors?.getPropertyErrors('CustomerId')[0]}</div>}

              <div style={{ ...dim(1, 8, 1, 8) }} className={css.caption}>Amount</div>
              <div style={{ ...dim(3, 8, 3, 8) }} className={cx(css.input, css.money)}
                is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'amount') || apiErrors?.has('Amount')}`}
              >
                <input className='amount' type="text" defaultValue={creatingDeposit.amount}
                  onChange={e => creatingDeposit.setAmount(parseFloat(e.currentTarget.value))}
                />
                <select className='currency' defaultValue={creatingDeposit.currencyId}
                  onChange={e => creatingDeposit.setCurrencyId(parseInt(e.currentTarget.value))}
                >
                  {auxiliary.currencies.map((v, i) => (
                    <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
                  ))}
                </select>
              </div>
              {apiErrors?.has('Amount') && <div style={{ ...dim(5, 8, 5, 8) }} className={css.error}>{apiErrors?.getPropertyErrors('Amount')[0]}</div>}

              <div style={{ ...dim(1, 9, 1, 9) }} className={css.caption}>Rate</div>
              <input style={{ ...dim(3, 9, 3, 9) }} className={css.input} type="number" max={1} min={0} step={0.001} defaultValue={creatingDeposit.rate}
                is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'rate') || apiErrors?.has('Rate')}`}
                onFocus={() => apiErrors?.deleteError('Rate')}
                onChange={e => creatingDeposit.setRate(e.currentTarget.value !== '' ? parseFloat(e.currentTarget.value) : 0)}
              />
              {apiErrors?.has('Rate') && <div style={{ ...dim(5, 9, 5, 9) }} className={css.error}>{apiErrors?.getPropertyErrors('Rate')[0]}</div>}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  })
}
