import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './DepositCreationPage.css'
import { DepositsPage } from '../../models/deposits/DepositsPage'

export function DepositCreationPageView(p: { depositsPage: DepositsPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const creatingDeposit = p.depositsPage.depositCreationPage.creatingDeposit
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
        <div className={css.properties} style={{ ...dim(2, 2, 11, 12) }}>
          {/* <div className={css.propertyGroupCaption}>Personal Information</div> */}
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
        </div>
      </div>
    )
  })
}
