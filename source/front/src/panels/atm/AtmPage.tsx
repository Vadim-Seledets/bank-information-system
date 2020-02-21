import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { style } from './AtmPage.css'
import { AtmPage } from '../../models/atm/AtmPage'
import { dim } from '../../common/css'
import { cx } from 'emotion'

export function AtmPageView(p: { atmPage: AtmPage }): JSX.Element {
  const setReceiptElement = React.useCallback(element => {
    p.atmPage.setReceiptElement(element)
  }, [])
  return reactive(() => {
    const css = style.classes
    const apiErrors = p.atmPage.apiErrors
    const auxiliary = p.atmPage.app.auxiliary
    const atmRoutineInfo = p.atmPage.atmRoutineInfo
    return (
      <div className={css.main}>
        {p.atmPage.currentPageName === 'WelcomePage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(10, 2, 14, 4), fontSize: '2em' }}>WELCOME to</div>
            <img style={{ ...dim(10, 6, 14, 11), width: '13em'}} src="assets/images/faith.png" />
            <div className={css.centeredText} style={{ ...dim(10, 14, 14, 16), fontSize: '2em' }}>BIS ATM SERVICES</div>
            <div className={css.centeredText} style={{ ...dim(10, 18, 14, 18) }}>Please insert card</div>
            <button style={{ ...dim(12, 20, 12, 20) }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('AccountNumberPage')}
            >
              <span className='las la-credit-card' style={{ marginRight: '0.5em' }} />
              <div>Insert card</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'AccountNumberPage' && (
          <React.Fragment>
            <div className={cx(css.centeredText, css.tip)} style={{ ...dim(1, 11, 24, 11) }}>Please enter your account number</div>
            <input style={{ ...dim(12, 12, 12, 12) }} className={css.input} type="text"
              is-invalid={`${!p.atmPage.validation.isValid(atmRoutineInfo, 'accountNumber') || apiErrors?.has('')}`}
              // onFocus={() => apiErrors?.deleteError('ProgramStartDate')}
              onChange={e => atmRoutineInfo.setAccountNumber(e.currentTarget.value)}
            />
            <button style={{ ...dim(12, 20, 12, 20) }} className={cx(css.greenButton, css.disable)}
              is-enabled={`${p.atmPage.validation.isValid(atmRoutineInfo, 'accountNumber')}`}
              onClick={() => p.atmPage.setCurrentPage('PinCodePage')}
            >
              <div>Enter</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'PinCodePage' && (
          <React.Fragment>
            <div className={cx(css.centeredText, css.tip)} style={{ ...dim(1, 11, 24, 11) }}>Please enter your PIN</div>
            <input style={{ ...dim(12, 12, 12, 12) }} className={css.input} type="text" size={12}
              is-invalid={`${!p.atmPage.validation.isValid(atmRoutineInfo, 'pin') || apiErrors?.has('')}`}
              // onFocus={() => apiErrors?.deleteError('ProgramStartDate')}
              onChange={e => atmRoutineInfo.setPin(e.currentTarget.value)}
            />
            <button style={{ ...dim(12, 20, 12, 20) }} className={cx(css.greenButton, css.disable)}
              is-enabled={`${p.atmPage.validation.isValid(atmRoutineInfo, 'pin')}`}
              onClick={() => p.atmPage.checkPin()}
            >
              <div>Enter</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'MainMenuPage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(10, 6, 14, 6) }}>Choose the operation</div>
            <button style={{ ...dim(12, 8, 12, 8), justifySelf: 'stretch' }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('WithdrawPage')}
            >
              <span className='las la-coins' style={{ marginRight: '0.5em' }} />
              <div>Withdraw</div>
            </button>
            <button style={{ ...dim(12, 10, 12, 10), justifySelf: 'stretch' }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('AccountBalancePage')}
            >
              <span className='las la-wallet' style={{ marginRight: '0.5em' }} />
              <div>Account Balance</div>
            </button>
            <button style={{ ...dim(12, 12, 12, 12), justifySelf: 'stretch' }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('MobilePaymentPage')}
            >
              <span className='las la-money-bill' style={{ marginRight: '0.5em' }} />
              <div>Mobile Payment</div>
            </button>
            <button style={{ ...dim(20, 20, 21, 20) }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('WelcomePage')}
            >
              <span className='las la-door-open' style={{ marginRight: '0.5em' }} />
              <div>Exit</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'WithdrawPage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(10, 6, 14, 6) }}>Cash Withdrawal</div>
            <div className={cx(css.centeredText, css.tip)} style={{ ...dim(10, 9, 14, 9) }}>Please enter the amount</div>
            <div style={{ ...dim(12, 10, 12, 10) }} className={cx(css.input, css.money)}
              is-invalid={`${!p.atmPage.validation.isValid(atmRoutineInfo, 'amount') || apiErrors?.has('')}`}
            >
              <input className='amount' type="text" defaultValue={atmRoutineInfo.amount}
                onChange={e => atmRoutineInfo.setAmount(parseFloat(e.currentTarget.value))}
              />
              <span className='currency'>
                {auxiliary.currencies.find(v => v.id === atmRoutineInfo.currencyId)?.code}
              </span>
            </div>
            <button style={{ ...dim(12, 20, 12, 20) }}  className={cx(css.greenButton, css.disable)}
              is-enabled={`${p.atmPage.validation.isValid(atmRoutineInfo, 'amount')}`}
              onClick={() => p.atmPage.withdrawCashRequest()}
            >
              <div>Enter</div>
            </button>
            <button style={{ ...dim(20, 20, 21, 20) }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('MainMenuPage')}
            >
              <span className='las la-undo' style={{ marginRight: '0.5em' }} />
              <div>Back</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'AccountBalancePage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 10, 24, 10) }}>Account Balance</div>
            <div style={{ ...dim(10, 12, 15, 12) }}>
              {`${atmRoutineInfo.amount.toFixed(2)} ${auxiliary.currencies.find(v => v.id === atmRoutineInfo.currencyId)?.code}`}
            </div>
            <button style={{ ...dim(20, 20, 21, 20) }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('MainMenuPage')}
            >
              <span className='las la-undo' style={{ marginRight: '0.5em' }} />
              <div>Back</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'MobilePaymentPage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 8, 24, 8) }}>Mobile Payment</div>
            <div style={{ ...dim(6, 10, 9, 10) }} className={css.caption}>Carrier</div>
            <select style={{ ...dim(11, 10, 14, 10) }} className={css.input}
              is-invalid={`${!p.atmPage.validation.isValid(atmRoutineInfo, 'carrierId') || apiErrors?.has('')}`}
              onChange={e => atmRoutineInfo.setCarrierId(parseInt(e.currentTarget.value))}
            >
              {auxiliary.mobileCarriers.map((v, i) => (
                <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
              ))}
            </select>
            <div style={{ ...dim(6, 12, 9, 12) }} className={css.caption}>Phone Number</div>
            <input style={{ ...dim(11, 12, 14, 12) }} className={css.input} type="text"
              is-invalid={`${!p.atmPage.validation.isValid(atmRoutineInfo, 'phoneNumber') || apiErrors?.has('')}`}
              // onFocus={() => apiErrors?.deleteError('Contacts.MobilePhoneNumber')}
              onChange={e => atmRoutineInfo.setPhoneNumber(e.currentTarget.value)}
            />
            <div style={{ ...dim(6, 14, 9, 14) }} className={css.caption}>Amount</div>
            <div style={{ ...dim(11, 14, 14, 14) }} className={cx(css.input, css.money)}
              is-invalid={`${!p.atmPage.validation.isValid(atmRoutineInfo, 'amount') || apiErrors?.has('')}`}
            >
              <input className='amount' type="text" defaultValue={`${atmRoutineInfo.amount}`}
                onChange={e => atmRoutineInfo.setAmount(parseFloat(e.currentTarget.value))}
              />
              <select className='currency'
                onChange={e => atmRoutineInfo.setCurrencyId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.currencies.map((v, i) => (
                  <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
                ))}
              </select>
            </div>
            <button style={{ ...dim(18, 20, 19, 20) }} className={cx(css.greenButton, css.disable)}
              is-enabled={`${p.atmPage.validation.isValid(atmRoutineInfo, 'amount') && p.atmPage.validation.isValid(atmRoutineInfo, 'phoneNumber')}`}
              onClick={() => p.atmPage.payForMobilePhoneRequest()}
            >
              <span className='las la-money-bill-wave' style={{ marginRight: '0.5em' }} />
              <div>Pay</div>
            </button>
            <button style={{ ...dim(20, 20, 21, 20) }} className={cx(css.greenButton, css.disable)}
              onClick={() => p.atmPage.setCurrentPage('MainMenuPage')}
            >
              <span className='las la-undo' style={{ marginRight: '0.5em' }} />
              <div>Back</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'ShouldShowReceiptPage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 10, 24, 10) }}>Do you need a receipt?</div>
            <div style={{ ...dim(10, 12, 15, 12), display: 'flex', justifySelf: 'stretch', justifyContent: 'center' }}>
              <button className={css.greenButton}
                onClick={() => p.atmPage.setCurrentPage('ReceiptPage')}
              >
                <div>Yes</div>
              </button>
              <button className={css.greenButton} style={{ marginLeft: '3em' }}
                onClick={() => p.atmPage.setCurrentPage('ShouldDoAnotherOperation')}
              >
                <div>No</div>
              </button>
            </div>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'ShouldDoAnotherOperation' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 10, 24, 10) }}>Do you want to do another operation?</div>
            <div style={{ ...dim(10, 12, 15, 12), display: 'flex', justifySelf: 'stretch', justifyContent: 'center' }}>
              <button className={css.greenButton}
                onClick={() => p.atmPage.setCurrentPage('PinCodePage')}
              >
                <div>Yes</div>
              </button>
              <button className={css.greenButton} style={{ marginLeft: '3em' }}
                onClick={() => p.atmPage.setCurrentPage('WelcomePage')}
              >
                <div>No</div>
              </button>
            </div>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'ReceiptPage' && atmRoutineInfo.operation === 'withdraw' && (
          <React.Fragment>
            <div ref={setReceiptElement} className={css.receipt} style={{ ...dim(9, 7, 16, 11) }}>
              <div style={{ ...dim(1, 1, 3, 1) }} className='title'>RECEIPT</div>
              <div style={{ ...dim(1, 2, 1, 2) }} className='caption'>Account Number</div>
              <div style={{ ...dim(2, 2, 2, 2) }} className='delimiter'>:</div>
              <div style={{ ...dim(3, 2, 3, 2) }} className='value'>{atmRoutineInfo.accountNumber}</div>
              <div style={{ ...dim(1, 3, 1, 3) }} className='caption'>Amount</div>
              <div style={{ ...dim(2, 3, 2, 3) }} className='delimiter'>:</div>
              <div style={{ ...dim(3, 3, 3, 3) }} className='value'>{`${atmRoutineInfo.amount} ${auxiliary.currencies.find(v => v.id === atmRoutineInfo.currencyId)?.code}`}</div>
              <div style={{ ...dim(1, 4, 1, 4) }} className='caption'>Withdrawn At</div>
              <div style={{ ...dim(2, 4, 2, 4) }} className='delimiter'>:</div>
              <div style={{ ...dim(3, 4, 3, 4) }} className='value'>{atmRoutineInfo.withdrawnAt.substr(0, 10)}</div>
            </div>
            <button style={{ ...dim(18, 20, 19, 20) }} className={cx(css.greenButton, css.disable)}
              onClick={() => p.atmPage.printReceipt()}
            >
              <span className='las la-print' style={{ marginRight: '0.5em' }} />
              <div>Print</div>
            </button>
            <button style={{ ...dim(20, 20, 21, 20) }} className={cx(css.greenButton, css.disable)}
              onClick={() => p.atmPage.setCurrentPage('ShouldDoAnotherOperation')}
            >
              <div>Done</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'ReceiptPage' && atmRoutineInfo.operation === 'phonePayment' && (
          <React.Fragment>
            <div ref={setReceiptElement} className={css.receipt} style={{ ...dim(9, 7, 16, 11) }}>
              <div style={{ ...dim(1, 1, 3, 1) }} className='title'>RECEIPT</div>
              <div style={{ ...dim(1, 2, 1, 2) }} className='caption'>Account Number</div>
              <div style={{ ...dim(2, 2, 2, 2) }} className='delimiter'>:</div>
              <div style={{ ...dim(3, 2, 3, 2) }} className='value'>{atmRoutineInfo.accountNumber}</div>
              <div style={{ ...dim(1, 3, 1, 3) }} className='caption'>Amount</div>
              <div style={{ ...dim(2, 3, 2, 3) }} className='delimiter'>:</div>
              <div style={{ ...dim(3, 3, 3, 3) }} className='value'>{`${atmRoutineInfo.amount} ${auxiliary.currencies.find(v => v.id === atmRoutineInfo.currencyId)?.code}`}</div>
              <div style={{ ...dim(1, 4, 1, 4) }} className='caption'>Carrier</div>
              <div style={{ ...dim(2, 4, 2, 4) }} className='delimiter'>:</div>
              <div style={{ ...dim(3, 4, 3, 4) }} className='value'>{auxiliary.mobileCarriers.find(v => v.id === atmRoutineInfo.carrierId)?.name}</div>
              <div style={{ ...dim(1, 5, 1, 4) }} className='caption'>Phone number</div>
              <div style={{ ...dim(2, 5, 2, 4) }} className='delimiter'>:</div>
              <div style={{ ...dim(3, 5, 3, 4) }} className='value'>{atmRoutineInfo.phoneNumber}</div>
              <div style={{ ...dim(1, 6, 1, 4) }} className='caption'>Payed At</div>
              <div style={{ ...dim(2, 6, 2, 4) }} className='delimiter'>:</div>
              <div style={{ ...dim(3, 6, 3, 4) }} className='value'>{atmRoutineInfo.payedAt.substr(0, 10)}</div>
            </div>
            <button style={{ ...dim(18, 20, 19, 20) }} className={cx(css.greenButton, css.disable)}
              onClick={() => p.atmPage.printReceipt()}
            >
              <span className='las la-print' style={{ marginRight: '0.5em' }} />
              <div>Print</div>
            </button>
            <button style={{ ...dim(20, 20, 21, 20) }} className={cx(css.greenButton, css.disable)}
              onClick={() => p.atmPage.setCurrentPage('ShouldDoAnotherOperation')}
            >
              <div>Done</div>
            </button>
          </React.Fragment>
        )}
      </div>
    )
  })
}
