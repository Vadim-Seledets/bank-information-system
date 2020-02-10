import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from '../deposits/DepositsPage.css'
import { cx } from 'emotion'
import { DepositsPage } from '../../models/deposits/DepositsPage'

export function DepositsPageView(p: { depositsPage: DepositsPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={cx(css.addNewDepositButton, 'headLineItem')} onClick={() => p.depositsPage.addNewDeposit()}>
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
        <div className={css.depositList} style={{ ...dim(2, 2, 11, 12) }}>
          <div style={{ ...dim(2, 1, 2, 1) }}>Contract Number</div>
          <div style={{ ...dim(4, 1, 4, 1) }}>Customer's Full Name</div>
          <div style={{ ...dim(6, 1, 6, 1) }}>Start Date</div>
          <div style={{ ...dim(8, 1, 8, 1) }}>End Date</div>
          <div style={{ ...dim(1, 1, 9, 1) }} className={`row`} />
          {p.depositsPage.filteredDeposits.map((d, i) => (
            <React.Fragment key={i}>
              <div style={{ ...dim(2, i + 2, 2, i + 2) }}
                className={'contractNumber'}
                onClick={() => p.depositsPage.showDepositDetails(d)}
                onPointerEnter={() => p.depositsPage.setIsGenderHovered(true, i + 2)}
                onPointerLeave={() => p.depositsPage.setIsGenderHovered(false, i + 2)}
              >{d.contractNumber}</div>
              <div style={{ ...dim(4, i + 2, 4, i + 2) }} className='customerFullName'
                onPointerEnter={() => p.depositsPage.setIsFullNameHovered(true, i + 2)}
                onPointerLeave={() => p.depositsPage.setIsFullNameHovered(false, i + 2)}
                dangerouslySetInnerHTML={{__html: `${d.getCustomerFullName()}`}} 
              />
              <div style={{ ...dim(6, i + 2, 6, i + 2) }} className='programDate'
                onPointerEnter={() => p.depositsPage.setIsEmailHovered(true, i + 2)}
                onPointerLeave={() => p.depositsPage.setIsEmailHovered(false, i + 2)}
              >{d.getProgramStartDate()}</div>
              <div style={{ ...dim(8, i + 2, 8, i + 2) }} className='programDate'
                onPointerEnter={() => p.depositsPage.setIsActionsHovered(true, i + 2)}
                onPointerLeave={() => p.depositsPage.setIsActionsHovered(false, i + 2)}
              >{d.getProgramEndDate()}</div>
              <div style={{ ...dim(1, i + 2, 9, i + 2) }} className={`row rowHighlighter ${(i + 1) % 2 === 0 ? 'evenRow' : 'oddRow'}`}
                is-hovered={`${p.depositsPage.isRowHovered(i + 2)}`}
                is-selected={`${p.depositsPage.selectedDeposit === d}`}
                onClick={() => {
                  if (p.depositsPage.selectedDeposit === d) {
                    p.depositsPage.setSelectedDeposit(undefined)
                  } else {
                    p.depositsPage.setSelectedDeposit(d)
                  }
                }}
                onPointerEnter={() => p.depositsPage.setIsRowWithCustomerHovered(true, i + 2)}
                onPointerLeave={() => p.depositsPage.setIsRowWithCustomerHovered(false, i + 2)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  })
}
