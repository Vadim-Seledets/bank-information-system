import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './DepositCreationPage.css'
import { DepositsPage } from '../../models/deposits/DepositsPage'

export function DepositCreationPageView(p: { depositsPage: DepositsPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={css.editOrPublishButton}
            is-enabled={`${p.depositsPage.depositCreationPage.validation.areAllValid()}`}
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
        <div style={{ ...dim(2, 2, 11, 12) }}>
          
        </div>
      </div>
    )
  })
}
