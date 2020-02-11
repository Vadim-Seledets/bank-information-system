import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './DepositDetailsPage.css'
import { DepositsPage } from '../../models/deposits/DepositsPage'
import { cx } from 'emotion'

export function DepositDetailsPageView(p: { depositsPage: DepositsPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const depositDetailes = p.depositsPage.depositDetailes
    const auxiliary = p.depositsPage.app.auxiliary
    return (
      <div className={css.main}>
        <div className={css.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={cx(css.button, css.deleteButton)}
            is-visible={`${depositDetailes?.depositTypeId === 1 && depositDetailes.isRevoked === false && depositDetailes.isCompleted === false}`}>
            <span className='las la-undo icon' style={{ marginRight: '0.5em' }} />
            <div onClick={() => p.depositsPage.setRevokeIsRequested(!p.depositsPage.revokeIsRequested)}>Revoke Deposit</div>
            <div className={css.deleteButtonYesNoButtonsContainer} is-visible={`${p.depositsPage.revokeIsRequested}`}>
              <div className='yesButton'
                onClick={() => {
                  p.depositsPage.revokeDeposit(depositDetailes?.contractNumber ?? '')
                  p.depositsPage.setRevokeIsRequested(false)
                }}>Yes</div>
              <div className='noButton'
                onClick={() => p.depositsPage.setRevokeIsRequested(false)}
              >No</div>
            </div>
          </button>
          <div className='space' />
          <button className={css.backButton} onClick={() => p.depositsPage.app.currentTab?.setCurrentPageName('DepositsListPage')}>
            Back
          </button>
        </div>
        <div style={{ ...dim(2, 2, 11, 12) }}>
          {depositDetailes && (
            <div className={css.customerInfo}>
              <div className={css.propertyGroupCaption}>Deposit's Information</div>
              <div className={css.property}>
                <div className='name'>Deposit Type</div>
                <div className={'value'}>{auxiliary.depositTypes.find(v => v.id === depositDetailes.depositTypeId)?.name}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Deposit Account Number</div>
                <div className={'value'}>{depositDetailes.depositAccountNumber}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Contract Number</div>
                <div className={'value'}>{depositDetailes.contractNumber}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Program Start Date</div>
                <div className={'value'}>{depositDetailes.programStartDate}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Program End Date</div>
                <div className={'value'}>{depositDetailes.programEndDate}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Valid Until</div>
                <div className={'value'}>{depositDetailes.validUntil}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Is Completed</div>
                <div className={`value ${depositDetailes.isCompleted ? 'highlighted-green' : ''}`}>{depositDetailes.isCompleted ? 'Yes' : 'No'}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Is Revoked</div>
                <div className={`value ${depositDetailes.isRevoked ? 'highlighted-red' : ''}`}>{depositDetailes.isRevoked ? 'Yes' : 'No'}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Completed At</div>
                <div className={'value'}>{depositDetailes.completedAt}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Rate</div>
                <div className={'value'}>{depositDetailes.rate}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Amount</div>
                <div className={'value'}>{`${depositDetailes.amount} ${auxiliary.currencies.find(v => v.id === depositDetailes.currencyId)?.code}`}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Regular Account Number</div>
                <div className={'value'}>{depositDetailes.regularAccountNumber}</div>
              </div>
              <div className={css.propertyGroupCaption}>Customer's Information</div>
              <div className={css.property}>
                <div className='name'>Last Name</div>
                <div className={'value'}>{depositDetailes.customer.lastName}</div>
              </div>
              <div className={css.property}>
                <div className='name'>First Name</div>
                <div className={'value'}>{depositDetailes.customer.firstName}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Middle Name</div>
                <div className={'value'}>{depositDetailes.customer.middleName}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Gender</div>
                <div className={'value'}>{depositDetailes.customer.gender}</div>
              </div>
              <div className={css.property}>
                <div className='name'>Email</div>
                <div className={'value'}>{depositDetailes.customer.email}</div>
              </div>
              <div className={css.propertyGroupCaption}>Transactions</div>
              <div className={css.transactions}>
                <div style={{ ...dim(1, 1, 1, 1) }}>Created At</div>
                <div style={{ ...dim(3, 1, 3, 1) }}>Amount</div>
                <div style={{ ...dim(5, 1, 5, 1) }}>Sender Account Number</div>
                <div style={{ ...dim(7, 1, 7, 1) }}>Receiver Account Number</div>
                <div style={{ ...dim(1, 1, 7, 1) }} className={cx(css.transactionRow, css.transactionFirstRow)} />
                {depositDetailes.transactions.map((t, i) => (
                  <React.Fragment key={i}>
                    <div style={{ ...dim(1, i + 2, 1, i + 2) }}>{t.createdAt}</div>
                    <div style={{ ...dim(3, i + 2, 3, i + 2) }}>{`${t.amount.toFixed(4)} ${auxiliary.currencies.find(v => v.id === t.currencyId)?.code}`}</div>
                    <div style={{ ...dim(5, i + 2, 5, i + 2), color: `hsl(${parseInt(t.senderAccountNumber?.substr(0, 2)) + parseInt(t.senderAccountNumber?.substr(11, 2))}, 100%, 50%)` }}>{t.senderAccountNumber}</div>
                    <div style={{ ...dim(6, i + 2, 6, i + 2) }} className='las la-long-arrow-alt-right' />
                    <div style={{ ...dim(7, i + 2, 7, i + 2), color: `hsl(${parseInt(t.receiverAccountNumber?.substr(0, 2)) + parseInt(t.receiverAccountNumber.substr(11, 2))}, 100%, 50%)` }}>{t.receiverAccountNumber}</div>
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
