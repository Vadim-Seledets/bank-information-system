import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from '../deposits/DepositsPage.css'
import { commonStyle } from '../../common/CommonStyles.css'
import { cx } from 'emotion'
import { DepositsPage } from '../../models/deposits/DepositsPage'

export function DepositsPageView(p: { depositsPage: DepositsPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const commonCss = commonStyle.classes
    return (
      <div className={commonCss.main}>
        <div className={commonCss.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={cx(commonCss.button, css.addNewDepositButton, 'headLineItem')} onClick={() => p.depositsPage.addNewDeposit()}>
            <span className='las la-plus' style={{ marginRight: '0.5em' }} />
            <div>Add a New Deposit</div>
          </button>
          <div className='space' />
          <div className={css.search}>
            <div className='las la-search icon' />
            <input className='input' type='text' placeholder='Search' value={p.depositsPage.filter}
              onFocus={() => p.depositsPage.setSelectedDeposit(undefined)}  
              onChange={e => p.depositsPage.setFilter(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className={cx(commonCss.list, css.depositList)} style={{ ...dim(2, 2, 11, 12) }}>
          <div style={{ ...dim(2, 1, 2, 1) }}>Contract Number</div>
          <div style={{ ...dim(4, 1, 4, 1) }}>Customer's Full Name</div>
          <div style={{ ...dim(6, 1, 6, 1) }}>Start Date</div>
          <div style={{ ...dim(8, 1, 8, 1) }}>End Date</div>
          <div style={{ ...dim(1, 1, 9, 1) }} className={`rowBase`} />
          {p.depositsPage.filteredDeposits.map((d, i) => (
            <React.Fragment key={i}>
              <div style={{ ...dim(2, i + 2, 2, i + 2) }} className={'rowContent contractNumber'}
                onClick={() => p.depositsPage.showDepositDetails(d)}
              >{d.contractNumber}</div>
              <div style={{ ...dim(4, i + 2, 4, i + 2) }} className='rowContent customerFullName'
                onClick={() => p.depositsPage.toggleDepositSelection(d)}
                dangerouslySetInnerHTML={{__html: `${d.getCustomerFullName()}`}} 
              />
              <div style={{ ...dim(6, i + 2, 6, i + 2) }} className='rowContent programDate'
                onClick={() => p.depositsPage.toggleDepositSelection(d)}
              >{d.programStartDate}</div>
              <div style={{ ...dim(8, i + 2, 8, i + 2) }} className='rowContent programDate'
                onClick={() => p.depositsPage.toggleDepositSelection(d)}
              >{d.programEndDate}</div>
              <div style={{ ...dim(1, i + 2, 9, i + 2) }} className={`rowBase row ${(i + 1) % 2 === 0 ? 'evenRow' : 'oddRow'}`}
                is-selected={`${p.depositsPage.selectedDeposit?.contractNumber === d.contractNumber}`}
                onClick={() => p.depositsPage.toggleDepositSelection(d)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  })
}
