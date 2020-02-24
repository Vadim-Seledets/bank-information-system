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
          <button className={cx(commonCss.button, css.addNewLoanButton, 'headLineItem')} onClick={() => p.loansPage.addNewLoan()}>
            <span className='las la-plus' style={{ marginRight: '0.5em' }} />
            <div>Add a New Loan</div>
          </button>
          <div className='space' />
          <div className={commonCss.search}>
            <div className='las la-search icon' />
            <input className='input' type='text' placeholder='Search' value={p.loansPage.filter}
              onFocus={() => p.loansPage.setSelectedLoan(undefined)}  
              onChange={e => p.loansPage.setFilter(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className={cx(commonCss.list, css.loanList)} style={{ ...dim(2, 2, 11, 12) }}>
          <div style={{ ...dim(2, 1, 2, 1) }}>Contract Number</div>
          <div style={{ ...dim(4, 1, 4, 1) }}>Customer's Full Name</div>
          <div style={{ ...dim(6, 1, 6, 1) }}>Start Date</div>
          <div style={{ ...dim(8, 1, 8, 1) }}>End Date</div>
          <div style={{ ...dim(1, 1, 9, 1) }} className={`rowBase`} />
          {p.loansPage.filteredLoans.map((l, i) => (
            <React.Fragment key={i}>
              <div style={{ ...dim(2, i + 2, 2, i + 2) }} className={'rowContent contractNumber'}
                onClick={() => p.loansPage.showLoanDetails(l)}
              >{l.contractNumber}</div>
              <div style={{ ...dim(4, i + 2, 4, i + 2) }} className='rowContent customerFullName'
                onClick={() => p.loansPage.toggleLoanSelection(l)}
                dangerouslySetInnerHTML={{__html: `${l.getCustomerFullName()}`}} 
              />
              <div style={{ ...dim(6, i + 2, 6, i + 2) }} className='rowContent programDate'
                onClick={() => p.loansPage.toggleLoanSelection(l)}
              >{l.programStartDate}</div>
              <div style={{ ...dim(8, i + 2, 8, i + 2) }} className='rowContent programDate'
                onClick={() => p.loansPage.toggleLoanSelection(l)}
              >{l.programEndDate}</div>
              <div style={{ ...dim(1, i + 2, 9, i + 2) }} className={`rowBase row`}
                is-selected={`${p.loansPage.selectedLoan?.contractNumber === l.contractNumber}`}
                is-odd={`${(i + 1) % 2 === 1}`}
                onClick={() => p.loansPage.toggleLoanSelection(l)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  })
}
