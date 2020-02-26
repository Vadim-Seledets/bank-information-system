import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { cx } from 'emotion'
import { dim } from '../../common/css'
import { style } from './LoanCreationPage.css'
import { commonStyle } from '../../common/CommonStyles.css'
import { LoansPage } from '../../models/loans/LoansPage'

export function LoanCreationPageView(p: { loansPage: LoansPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const commonCss = commonStyle.classes
    const creatingLoan = p.loansPage.loanCreationPage.creatingLoan
    const auxiliary = p.loansPage.app.auxiliary
    const apiErrors = p.loansPage.loanCreationPage.apiErrors
    return (
      <div className={commonCss.main}>
        <div className={commonCss.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={cx(commonCss.button, css.editOrPublishButton)}
            is-enabled={`${p.loansPage.loanCreationPage.validation.areAllValid(creatingLoan!)}`}
            onClick={() => p.loansPage.loanCreationPage.publishNewLoanRequest()}
          >
            <React.Fragment>
              <span className='las la-upload' style={{ marginRight: '0.5em' }} />
              Publish a New Loan
            </React.Fragment>
          </button>
          <div className='space' />
          <button className={cx(commonCss.button, commonCss.backButton)} onClick={() => p.loansPage.loanCreationPage.cancelCreation()}>
            Cancel
          </button>
        </div>
        <div className={css.properties} style={{ ...dim(2, 2, 11, 12) }}>
          {creatingLoan && (
            <React.Fragment>
              <div style={{ ...dim(1, 1, 5, 1) }} className={css.header}>
                <div className='caption'>Loan Information</div>
                {apiErrors?.has('') && <div style={{ ...dim(3, 1, 5, 1) }} className={css.error}>{apiErrors?.getPropertyErrors('')[0]}</div>}
              </div>

              <div style={{ ...dim(1, 2, 1, 2) }} className={css.caption}>Loan Type</div>
              <select style={{ ...dim(3, 2, 3, 2) }} className={commonCss.input} value={creatingLoan.loanTypeId}
                is-invalid={`${!p.loansPage.loanCreationPage.validation.isValid(creatingLoan, 'loanTypeId') || apiErrors?.has('LoanTypeId')}`}
                onChange={e => creatingLoan.setLoanTypeId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.loanTypes.map((v, i) => (
                  <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
                ))}
              </select>
              {apiErrors?.has('LoanTypeId') && <div style={{ ...dim(5, 2, 5, 2) }} className={css.error}>{apiErrors?.getPropertyErrors('LoanTypeId')[0]}</div>}

              <div style={{ ...dim(1, 3, 1, 3) }} className={css.caption}>Contract Number</div>
              <input style={{ ...dim(3, 3, 3, 3) }} className={commonCss.input} disabled={true} type="text" value={creatingLoan.contractNumber}
                onFocus={() => apiErrors?.deleteError('ContractNumber')}
              />
              {apiErrors?.has('ContractNumber') && <div style={{ ...dim(5, 3, 5, 3) }} className={css.error}>{apiErrors?.getPropertyErrors('ContractNumber')[0]}</div>}

              <div style={{ ...dim(1, 4, 1, 4) }} className={css.caption}>Program Start Date</div>
              <input style={{ ...dim(3, 4, 3, 4) }} className={commonCss.input} type="date" defaultValue={creatingLoan.programStartDate}
                is-invalid={`${!p.loansPage.loanCreationPage.validation.isValid(creatingLoan, 'programStartDate') || apiErrors?.has('ProgramStartDate')}`}
                onFocus={() => apiErrors?.deleteError('ProgramStartDate')}
                onChange={e => creatingLoan.setProgramStartDate(e.currentTarget.value)}
              />
              {apiErrors?.has('ProgramStartDate') && <div style={{ ...dim(5, 4, 5, 4) }} className={css.error}>{apiErrors?.getPropertyErrors('ProgramStartDate')[0]}</div>}

              <div style={{ ...dim(1, 5, 1, 5) }} className={css.caption}>Number of Payment Terms</div>
              <input style={{ ...dim(3, 5, 3, 5) }} className={commonCss.input} type="number" min={1} max={500} step={1} defaultValue={creatingLoan.numberOfPaymentTerms}
                onFocus={() => apiErrors?.deleteError('ProgramEndDate')}
                onChange={e => creatingLoan.setNumberOfPaymentTerms(parseInt(e.currentTarget.value))}
              />
              
              <div style={{ ...dim(1, 6, 1, 6) }} className={css.caption}>Program End Date</div>
              <input style={{ ...dim(3, 6, 3, 6) }} className={commonCss.input} type="date" disabled={true} value={creatingLoan.getProgramEndDate()}
                is-invalid={`${!p.loansPage.loanCreationPage.validation.isValid(creatingLoan, 'programEndDate') || apiErrors?.has('ProgramEndDate')}`}
              />
              {apiErrors?.has('ProgramEndDate') && <div style={{ ...dim(5, 6, 5, 6) }} className={css.error}>{apiErrors?.getPropertyErrors('ProgramEndDate')[0]}</div>}

              <div style={{ ...dim(1, 7, 1, 7) }} className={css.caption}>Contract Valid Until</div>
              <input style={{ ...dim(3, 7, 3, 7) }} className={commonCss.input} type="date" defaultValue={creatingLoan.contractValidUntil}
                is-invalid={`${!p.loansPage.loanCreationPage.validation.isValid(creatingLoan, 'contractValidUntil') || apiErrors?.has('ContractValidUntil')}`}
                onFocus={() => apiErrors?.deleteError('ContractValidUntil')}
                onChange={e => creatingLoan.setContractValidUntil(e.currentTarget.value)}
              />
              {apiErrors?.has('ContractValidUntil') && <div style={{ ...dim(5, 7, 5, 7) }} className={css.error}>{apiErrors?.getPropertyErrors('ContractValidUntil')[0]}</div>}

              <div style={{ ...dim(1, 8, 1, 8) }} className={css.caption}>Customer</div>
              <select style={{ ...dim(3, 8, 3, 8) }} className={commonCss.input} value={creatingLoan.customerId}
                is-invalid={`${!p.loansPage.loanCreationPage.validation.isValid(creatingLoan, 'customerId') || apiErrors?.has('CustomerId')}`}
                onChange={e => creatingLoan.setCustomerId(parseInt(e.currentTarget.value))}
              >
                <option value={0}>Not selected</option>
                {p.loansPage.app.customersPage.customers.map((v, i) => (
                  <option key={`${v.id}`} value={v.id}>{`${v.firstName} ${v.middleName} ${v.lastName}`}</option>
                ))}
              </select>
              {apiErrors?.has('CustomerId') && <div style={{ ...dim(5, 8, 5, 8) }} className={css.error}>{apiErrors?.getPropertyErrors('CustomerId')[0]}</div>}

              <div style={{ ...dim(1, 9, 1, 9) }} className={css.caption}>Amount</div>
              <div style={{ ...dim(3, 9, 3, 9) }} className={cx(commonCss.input, css.money)}
                is-invalid={`${!p.loansPage.loanCreationPage.validation.isValid(creatingLoan, 'amount') || apiErrors?.has('Amount')}`}
              >
                <input className='amount' type="text" defaultValue={creatingLoan.amount}
                  onChange={e => creatingLoan.setAmount(parseFloat(e.currentTarget.value))}
                />
                <select className='currency' defaultValue={creatingLoan.currencyId}
                  onChange={e => creatingLoan.setCurrencyId(parseInt(e.currentTarget.value))}
                >
                  {auxiliary.currencies.map((v, i) => (
                    <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
                  ))}
                </select>
              </div>
              {apiErrors?.has('Amount') && <div style={{ ...dim(5, 9, 5, 9) }} className={css.error}>{apiErrors?.getPropertyErrors('Amount')[0]}</div>}

              <div style={{ ...dim(1, 10, 1, 10) }} className={css.caption}>Rate</div>
              <input style={{ ...dim(3, 10, 3, 10) }} className={commonCss.input} type="number" max={100} min={0} step={1} defaultValue={creatingLoan.rate}
                is-invalid={`${!p.loansPage.loanCreationPage.validation.isValid(creatingLoan, 'rate') || apiErrors?.has('Rate')}`}
                onFocus={() => apiErrors?.deleteError('Rate')}
                onChange={e => creatingLoan.setRate(e.currentTarget.value !== '' ? parseFloat(e.currentTarget.value) : 0)}
              />
              {apiErrors?.has('Rate') && <div style={{ ...dim(5, 10, 5, 10) }} className={css.error}>{apiErrors?.getPropertyErrors('Rate')[0]}</div>}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  })
}
