import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { style } from './LoansPage.css'
import { commonStyle } from '../../common/CommonStyles.css'
import { cx } from 'emotion'
import { LoansPage } from '../../models/loans/LoansPage'

export function LoansPageView(p: { loansPage: LoansPage }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    const commonCss = commonStyle.classes
    return (
      <div className={commonCss.main}>
        <div className={commonCss.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <button className={cx(css.addNewLoanButton, 'headLineItem')} onClick={() => p.loansPage.addNewLoan()}>
            <span className='las la-plus' style={{ marginRight: '0.5em' }} />
            <div>Add a New Loan</div>
          </button>
          <div className='space' />
          <div className={css.search}>
            <div className='las la-search icon' />
            <input className='input' type='text' placeholder='Search' value={p.loansPage.filter}
              onFocus={() => p.loansPage.setSelectedLoan(undefined)}  
              onChange={e => p.loansPage.setFilter(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className={css.depositList} style={{ ...dim(2, 2, 11, 12) }}>
          <div style={{ ...dim(2, 1, 2, 1) }}>Contract Number</div>
          <div style={{ ...dim(4, 1, 4, 1) }}>Customer's Full Name</div>
          <div style={{ ...dim(6, 1, 6, 1) }}>Start Date</div>
          <div style={{ ...dim(8, 1, 8, 1) }}>End Date</div>
          <div style={{ ...dim(1, 1, 9, 1) }} className={`row`} />
          {p.loansPage.filteredLoans.map((l, i) => (
            <React.Fragment key={i}>
              <div style={{ ...dim(2, i + 2, 2, i + 2) }}
                className={'contractNumber'}
                onClick={() => p.loansPage.showLoanDetails(l)}
                onPointerEnter={() => p.loansPage.setIsGenderHovered(true, i + 2)}
                onPointerLeave={() => p.loansPage.setIsGenderHovered(false, i + 2)}
              >{l.contractNumber}</div>
              <div style={{ ...dim(4, i + 2, 4, i + 2) }} className='customerFullName'
                onClick={() => p.loansPage.toggleLoanSelection(l)}
                onPointerEnter={() => p.loansPage.setIsFullNameHovered(true, i + 2)}
                onPointerLeave={() => p.loansPage.setIsFullNameHovered(false, i + 2)}
                dangerouslySetInnerHTML={{__html: `${l.getCustomerFullName()}`}} 
              />
              <div style={{ ...dim(6, i + 2, 6, i + 2) }} className='programDate'
                onClick={() => p.loansPage.toggleLoanSelection(l)}
                onPointerEnter={() => p.loansPage.setIsEmailHovered(true, i + 2)}
                onPointerLeave={() => p.loansPage.setIsEmailHovered(false, i + 2)}
              >{l.programStartDate}</div>
              <div style={{ ...dim(8, i + 2, 8, i + 2) }} className='programDate'
                onClick={() => p.loansPage.toggleLoanSelection(l)}
                onPointerEnter={() => p.loansPage.setIsActionsHovered(true, i + 2)}
                onPointerLeave={() => p.loansPage.setIsActionsHovered(false, i + 2)}
              >{l.programEndDate}</div>
              <div style={{ ...dim(1, i + 2, 9, i + 2) }} className={`row rowHighlighter ${(i + 1) % 2 === 0 ? 'evenRow' : 'oddRow'}`}
                is-hovered={`${p.loansPage.isRowHovered(i + 2)}`}
                is-selected={`${p.loansPage.selectedLoan?.contractNumber === l.contractNumber}`}
                onClick={() => p.loansPage.toggleLoanSelection(l)}
                onPointerEnter={() => p.loansPage.setIsRowWithCustomerHovered(true, i + 2)}
                onPointerLeave={() => p.loansPage.setIsRowWithCustomerHovered(false, i + 2)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  })
}
