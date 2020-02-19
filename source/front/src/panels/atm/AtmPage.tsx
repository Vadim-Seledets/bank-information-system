import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { style } from './AtmPage.css'
import { AtmPage } from '../../models/atm/AtmPage'
import { dim } from '../../common/css'

export function AtmPageView(p: { atmPage: AtmPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
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
            <div className={css.centeredText} style={{ ...dim(1, 3, 12, 3), fontSize: '2em' }}>WELCOME to</div>
            <img style={{ ...dim(1, 6, 12, 11), width: '13em', justifySelf: 'center' }} src="assets/images/faith.png" />
            <div className={css.centeredText} style={{ ...dim(1, 14, 12, 14), fontSize: '2em' }}>BIS ATM SERVICES</div>
            <div className={css.centeredText} style={{ ...dim(1, 18, 12, 18), fontSize: '1em' }}>Please insert card</div>
            <button style={{ ...dim(6, 20, 7, 20) }} className={css.greenButton}
              onClick={() => p.atmPage.setCurrentPage('PinCodePage')}
            >
              <span className='las la-credit-card' style={{ marginRight: '0.5em' }} />
              <div>Insert card</div>
            </button>
          </React.Fragment>
        )}
      </div>
    )
  })
}
