import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { style } from './AtmPage.css'
import { AtmPage } from '../../models/atm/AtmPage'
import { dim } from '../../common/css'
import { cx } from 'emotion'

export function AtmPageView(p: { atmPage: AtmPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const auxiliary = p.atmPage.app.auxiliary
    return (
      <div className={css.main}>
        {p.atmPage.currentPageName === 'WelcomePage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 3, 12, 3), fontSize: '2em' }}>WELCOME to</div>
            <img style={{ ...dim(1, 6, 12, 11), width: '13em', justifySelf: 'center' }} src="assets/images/faith.png" />
            <div className={css.centeredText} style={{ ...dim(1, 14, 12, 14), fontSize: '2em' }}>BIS ATM SERVICES</div>
            <div className={css.centeredText} style={{ ...dim(1, 18, 12, 18), fontSize: '1em' }}>Please insert card</div>
            <button style={{ ...dim(6, 20, 7, 20) }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('AccountNumberPage')}
            >
              <span className='las la-credit-card' style={{ marginRight: '0.5em' }} />
              <div>Insert card</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'AccountNumberPage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 10, 12, 10), fontSize: '1em' }}>Please enter your account number</div>
            <div style={{ ...dim(4, 12, 9, 12), display: 'flex', justifySelf: 'stretch', justifyContent: 'center' }}>
              <input className={css.input} type="text"
              // is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'programStartDate') || apiErrors?.has('ProgramStartDate')}`}
              // onFocus={() => apiErrors?.deleteError('ProgramStartDate')}
              // onChange={e => creatingDeposit.setProgramStartDate(e.currentTarget.value)}
              />
              <button className={css.greenButton} style={{ marginLeft: '1em' }}
                onClick={() => p.atmPage.setCurrentPage('PinCodePage')}
              >
                <span className='las la-check' style={{ marginRight: '0.5em' }} />
                <div>Enter</div>
              </button>
            </div>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'PinCodePage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 10, 12, 10), fontSize: '1em' }}>Please enter your PIN</div>
            <div style={{ ...dim(4, 12, 9, 12), display: 'flex', justifySelf: 'stretch', justifyContent: 'center' }}>
              <input className={css.input} type="text"
              // is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'programStartDate') || apiErrors?.has('ProgramStartDate')}`}
              // onFocus={() => apiErrors?.deleteError('ProgramStartDate')}
              // onChange={e => creatingDeposit.setProgramStartDate(e.currentTarget.value)}
              />
              <button className={css.greenButton} style={{ marginLeft: '1em' }}
                onClick={() => p.atmPage.setCurrentPage('MainMenuPage')}
              >
                <span className='las la-check' style={{ marginRight: '0.5em' }} />
                <div>Enter</div>
              </button>
            </div>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'MainMenuPage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 7, 12, 7), fontSize: '1em' }}>Choose the operation</div>
            <button style={{ ...dim(6, 10, 7, 10), justifySelf: 'stretch' }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('WithdrawPage')}
            >
              <span className='las la-coins' style={{ marginRight: '0.5em' }} />
              <div>Withdraw</div>
            </button>
            <button style={{ ...dim(6, 12, 7, 12), justifySelf: 'stretch' }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('AccountBalancePage')}
            >
              <span className='las la-wallet' style={{ marginRight: '0.5em' }} />
              <div>Account Balance</div>
            </button>
            <button style={{ ...dim(6, 14, 7, 14), justifySelf: 'stretch' }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('MobilePaymentPage')}
            >
              <span className='las la-money-bill' style={{ marginRight: '0.5em' }} />
              <div>Mobile Payment</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'WithdrawPage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 10, 12, 10), fontSize: '1em' }}>Please enter the amount</div>
            <div style={{ ...dim(4, 12, 9, 12), display: 'flex', justifySelf: 'stretch', justifyContent: 'center' }}>
              <div className={cx(css.input, css.money)}
                // is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'amount') || apiErrors?.has('Amount')}`}
              >
                <input className='amount' type="text"
                  // onChange={e => creatingDeposit.setAmount(parseFloat(e.currentTarget.value))}
                />
                <select className='currency'
                  // onChange={e => creatingDeposit.setCurrencyId(parseInt(e.currentTarget.value))}
                >
                  {auxiliary.currencies.map((v, i) => (
                    <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
                  ))}
                </select>
              </div>
              <button className={css.greenButton} style={{ marginLeft: '1em' }}
                onClick={() => p.atmPage.setCurrentPage('ShouldShowReceiptPage')}
              >
                <span className='las la-check' style={{ marginRight: '0.5em' }} />
                <div>Enter</div>
              </button>
            </div>
            <button style={{ ...dim(9, 20, 11, 20) }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('MainMenuPage')}
            >
              <span className='las la-undo' style={{ marginRight: '0.5em' }} />
              <div>Back</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'AccountBalancePage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 10, 12, 10), fontSize: '1em' }}>Account Balance</div>
            <div style={{ ...dim(4, 12, 9, 12) }}>
              {'1240 $'}
            </div>
            <button style={{ ...dim(9, 20, 11, 20) }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('MainMenuPage')}
            >
              <span className='las la-undo' style={{ marginRight: '0.5em' }} />
              <div>Back</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'MobilePaymentPage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 8, 12, 8), fontSize: '1em' }}>Mobile Payment</div>
            <div style={{ ...dim(3, 10, 4, 10)}} className={css.caption}>Carrier</div>
            <select style={{ ...dim(5, 10, 8, 10)}} className={css.input}
              // is-invalid={`${!p.customerInfo.validation.isValid(customer, 'placeOfRegistrationCityId') || apiErrors?.has('PlaceOfRegistration.CityId')}`}
              // onChange={e => customer.setPlaceOfRegistrationCityId(parseInt(e.currentTarget.value))}
            >
              {auxiliary.mobileCarriers.map((v, i) => (
                <option key={`${v.id}:${v.name}`} value={v.id}>{v.name}</option>
              ))}
            </select>
            <div style={{ ...dim(3, 12, 4, 12)}} className={css.caption}>Mobile Phone Number</div>
            <input style={{ ...dim(5, 12, 8, 12) }} className={css.input} type="text"
              // is-invalid={`${!p.customerInfo.validation.isValid(customer, 'mobilePhoneNumber') || apiErrors?.has('Contacts.MobilePhoneNumber')}`}
              // onFocus={() => apiErrors?.deleteError('Contacts.MobilePhoneNumber')}
              // onChange={e => customer.setMobilePhoneNumber(e.currentTarget.value)}
            />
            <div style={{ ...dim(5, 14, 8, 14) }} className={cx(css.input, css.money)}
              // is-invalid={`${!p.depositsPage.depositCreationPage.validation.isValid(creatingDeposit, 'amount') || apiErrors?.has('Amount')}`}
            >
              <input className='amount' type="text"
                // onChange={e => creatingDeposit.setAmount(parseFloat(e.currentTarget.value))}
              />
              <select className='currency'
                // onChange={e => creatingDeposit.setCurrencyId(parseInt(e.currentTarget.value))}
              >
                {auxiliary.currencies.map((v, i) => (
                  <option key={`${v.id}:${v.code}`} value={v.id}>{v.code}</option>
                ))}
              </select>
            </div>
            <button style={{ ...dim(9, 20, 11, 20) }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('MainMenuPage')}
            >
              <span className='las la-undo' style={{ marginRight: '0.5em' }} />
              <div>Back</div>
            </button>
          </React.Fragment>
        )}
        {p.atmPage.currentPageName === 'ShouldShowReceiptPage' && (
          <React.Fragment>
            <div className={css.centeredText} style={{ ...dim(1, 10, 12, 10), fontSize: '1em' }}>Do you need a receipt?</div>
            <div style={{ ...dim(4, 12, 9, 12), display: 'flex', justifySelf: 'stretch', justifyContent: 'center' }}>
              <button className={css.greenButton}
                onClick={() => p.atmPage.setCurrentPage('ReceiptPage')}
              >
                <div>Yes</div>
              </button>
              <button className={css.greenButton} style={{ marginLeft: '3em' }}
                onClick={() => p.atmPage.setCurrentPage('MainMenuPage')}
              >
                <div>No</div>
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  })
}
