import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../common/css'
import { App } from '../models/App'
import { style } from './AppWindow.css'
import { themes } from '../models/Theme'
import { cx } from 'emotion'
import { CustomersPageView } from './customers/CustomersPage'
import { EditCustomerInfoPageView } from './customers/EditCustomerInfoPage'
import { CustomerInfoPageView } from './customers/CustomerInfoPage'
import { DepositsPageView } from './deposits/DepositsPage'
import { DepositCreationPageView } from './deposits/DepositCreationPage'
import { DepositDetailsPageView } from './deposits/DepositDetailsPage'
import { LoansPageView } from './loans/LoansPage'
import { LoanCreationPageView } from './loans/LoanCreationPage'
import { LoanDetailsPageView } from './loans/LoanDetailsPage'

export function AppWindow(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.menu} style={{ ...dim(1, 1, 12, 1) }}>
          <img style={{ margin: '0 0.5em', width: '1.9em' }} src="assets/images/faith.png" onClick={() => themes.next()} />
          <div style={{ color: '#EEEEE1' }}>
            Bank Information System
          </div>
          <div className='space' />
          <div style={{ fontSize: '0.8em' }}>{p.app.getCurrentDate()}</div>
          <button className={css.closeBankDayButton} onClick={() => p.app.closeBankDayAndGetNewDateRequst()}>
            <div className={`container ${p.app.closeBankDayData.times === 1 ? 'short' : ''}`}>
              <span>Close</span>
              <input className='input' type='number' defaultValue={p.app.closeBankDayData.times}
                onClick={e => e.stopPropagation()}
                onChange={e => p.app.closeBankDayData.setTimes(e.currentTarget.value !== '' ? parseInt(e.currentTarget.value) : 0)} />
              <span>Bank {p.app.closeBankDayData.times === 1 ? 'Day' : 'Days'}</span>
            </div>
          </button>
        </div>
        <div className={css.sidebar} style={{ ...dim(1, 2, 1, 12) }}>
          {p.app.tabs.map((v, i) => (
            <div key={i} className={cx(css.sidebarElement, css.clicable)}
              is-selected={`${v === p.app.currentTab}`}
              onClick={() => p.app.setCurrentTab(v)}
            >
              <div className={`icon ${v.icon}`} />
              <div className={'caption'}>{v.caption}</div>
            </div>
          ))}
        </div>
        {p.app.currentTab?.name === 'customers' && (
          <React.Fragment>
            {p.app.currentTab.currentPage === 'CustomersListPage' && (
              <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                <CustomersPageView customersPage={p.app.customersPage} />
              </div>
            )}
            {p.app.currentTab.currentPage === 'EditCustomerPage' && (
              <React.Fragment>
                <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                  <EditCustomerInfoPageView customersPage={p.app.customersPage} />
                </div>
              </React.Fragment>
            )}
            {p.app.currentTab.currentPage === 'CustomerInfoPage' && (
              <React.Fragment>
                <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                  <CustomerInfoPageView customersPage={p.app.customersPage} />
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {p.app.currentTab?.name === 'deposits' && (
          <React.Fragment>
            {p.app.currentTab.currentPage === 'DepositsListPage' && (
              <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                <DepositsPageView depositsPage={p.app.depositsPage} />
              </div>
            )}
            {p.app.currentTab.currentPage === 'AddNewDepositPage' && (
              <React.Fragment>
                <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                  <DepositCreationPageView depositsPage={p.app.depositsPage} />
                </div>
              </React.Fragment>
            )}
            {p.app.currentTab.currentPage === 'DepositDetailsPage' && (
              <React.Fragment>
                <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                  <DepositDetailsPageView depositsPage={p.app.depositsPage} />
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {p.app.currentTab?.name === 'loans' && (
          <React.Fragment>
            {p.app.currentTab.currentPage === 'LoansListPage' && (
              <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                <LoansPageView loansPage={p.app.loansPage} />
              </div>
            )}
            {p.app.currentTab.currentPage === 'AddNewLoanPage' && (
              <React.Fragment>
                <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                  <LoanCreationPageView loansPage={p.app.loansPage} />
                </div>
              </React.Fragment>
            )}
            {p.app.currentTab.currentPage === 'LoanDetailsPage' && (
              <React.Fragment>
                <div style={{ ...dim(2, 2, 12, 12), overflow: 'scroll' }}>
                  <LoanDetailsPageView loansPage={p.app.loansPage} />
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    )
  })
}
