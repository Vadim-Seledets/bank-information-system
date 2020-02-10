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

export function AppWindow(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.menu} style={{ ...dim(1, 1, 12, 1) }}>
          <img style={{ margin: '0 0.5em', width: '1.2em' }} src="assets/images/bank.png" onClick={() => themes.next()} />
          <div style={{ color: '#dddddd' }}>
            Bank Information System
          </div>
          <div className='space' />
          <div>{p.app.getCurrentDate()}</div>
          <button className={css.closeBankDayButton} onClick={() => {}}>Close Bank Day</button>
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
                  <DepositDetailsPageView  depositsPage={p.app.depositsPage} />
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    )
  })
}
