import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './LoanDetailsPage.css'
import { commonStyle } from '../../common/CommonStyles.css'
import { cx } from 'emotion'
import { LoansPage } from '../../models/loans/LoansPage'
import { getFormatedDateFromString } from '../../models/atm/PaymentAndAccountModels'

export function LoanDetailsPageView(p: { loansPage: LoansPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const commonCss = commonStyle.classes
    const loanDetailes = p.loansPage.loanDetailes
    const auxiliary = p.loansPage.app.auxiliary
    return (
      <div className={commonCss.main}>
        <div className={commonCss.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <div className='space' />
          <button className={cx(commonCss.button, commonCss.backButton)} onClick={() => p.loansPage.app.currentTab?.setCurrentPageName('LoansListPage')}>
            Back
          </button>
        </div>
        <div style={{ ...dim(2, 2, 11, 12) }}>
          {loanDetailes && (
            <div className={css.customerInfo}>
              <div className={css.propertyGroupCaption}>Loan's Information</div>
              <div className={css.property}>
                <div className='name'>Loan Type</div>
                <div className={'value'}>{auxiliary.loanTypes.find(v => v.id === loanDetailes.loanTypeId)?.name}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Loan Payment Account Number</div>
                <div className={'value'}>{loanDetailes.loanPaymentAccountNumber}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Contract Number</div>
                <div className={'value'}>{loanDetailes.contractNumber}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Program Start Date</div>
                <div className={'value'}>{loanDetailes.programStartDate}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Program End Date</div>
                <div className={'value'}>{loanDetailes.programEndDate}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Valid Until</div>
                <div className={'value'}>{loanDetailes.validUntil}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Is Completed</div>
                <div className={`value ${loanDetailes.isCompleted ? 'highlighted-green' : ''}`}>{loanDetailes.isCompleted ? 'Yes' : 'No'}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Completed At</div>
                <div className={`value ${loanDetailes.isCompleted ? 'highlighted-green' : ''}`}>{getFormatedDateFromString(loanDetailes.completedAt)}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Rate</div>
                <div className={'value'}>{loanDetailes.rate}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Amount</div>
                <div className={'value'}>{`${loanDetailes.amount} ${auxiliary.currencies.find(v => v.id === loanDetailes.currencyId)?.code}`}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Regular Account Number</div>
                <div className={'value'}>{loanDetailes.regularAccountNumber}</div>
              </div>
              <div className={css.propertyGroupCaption}>Customer's Information</div>
              <div className={css.property}>
                <div className='name'>Last Name</div>
                <div className={'value'}>{loanDetailes.customer.lastName}</div>
              </div>
              <div className={css.property}>
                <div className='name'>First Name</div>
                <div className={'value'}>{loanDetailes.customer.firstName}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Middle Name</div>
                <div className={'value'}>{loanDetailes.customer.middleName}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Gender</div>
                <div className={'value'}>{loanDetailes.customer.gender}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Email</div>
                <div className={'value'}>{loanDetailes.customer.email}</div>
              </div>
              <div className={css.propertyGroupCaption}>Transactions</div>
              <div className={css.transactions}>
                <div style={{ ...dim(1, 1, 1, 1) }}>Created At</div>
                <div style={{ ...dim(3, 1, 3, 1) }}>Amount</div>
                <div style={{ ...dim(5, 1, 5, 1) }}>Sender Account Number</div>
                <div style={{ ...dim(7, 1, 7, 1) }}>Receiver Account Number</div>
                <div style={{ ...dim(1, 1, 7, 1) }} className={cx(css.transactionRow, css.transactionFirstRow)} />
                {loanDetailes.transactions.map((t, i) => (
                  <React.Fragment key={i}>
                    <div style={{ ...dim(1, i + 2, 1, i + 2) }}>{getFormatedDateFromString(t.createdAt)}</div>
                    <div style={{ ...dim(3, i + 2, 3, i + 2) }}>{`${t.amount.toFixed(4)} ${auxiliary.currencies.find(v => v.id === t.currencyId)?.code}`}</div>
                    <div style={{ ...dim(5, i + 2, 5, i + 2), color: `hsl(${parseInt(t.senderAccountNumber?.substr(0, 2)) + parseInt(t.senderAccountNumber?.substr(11, 2))}, 70%, 50%)` }} className='accountNumber'>{t.senderAccountNumber}</div>
                    <div style={{ ...dim(6, i + 2, 6, i + 2) }} className='las la-long-arrow-alt-right' />
                    <div style={{ ...dim(7, i + 2, 7, i + 2), color: `hsl(${parseInt(t.receiverAccountNumber?.substr(0, 2)) + parseInt(t.receiverAccountNumber.substr(11, 2))}, 70%, 50%)` }} className='accountNumber'>{t.receiverAccountNumber}</div>
                    <div style={{ ...dim(1, i + 2, 7, i + 2) }} className={css.transactionRow} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  })
}
