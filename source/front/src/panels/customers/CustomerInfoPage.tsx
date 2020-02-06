import * as React from 'react'
import { reactive } from 'reactronic-toolkit-react'
import { dim } from '../../common/css'
import { App } from '../../models/App'
import { style } from './CustomerInfoPage.css'

export function CustomerInfoPageView(p: { app: App }): JSX.Element {
  return reactive(() => {
    const css = style.classes
    return (
      <div className={css.main}>
        <div className={css.headLine} style={{ ...dim(2, 1, 11, 1) }}>
          <div className='space' />
          <button className={css.backButton} onClick={() => p.app.setCurrentPageName('CustomersListPage')}>
            Back
          </button>
        </div>
        <div style={{ ...dim(2, 2, 11, 12) }}>
          
        </div>
      </div>
    )
  })
}
