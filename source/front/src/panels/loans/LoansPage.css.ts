import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return { 
    search: css`
      align-self: center;
      justify-self: right;
      display: flex;
      align-items: center;
      padding: 0.1em 0.3em;
      color: ${theme.applicationForeground};
      background-color: ${theme.searchInputBackground};
      border-bottom: 1px solid ${theme.searchInputBorderColor};
      border-radius: 0.2em;
      font-size: 0.8em;
    `,

    button: css`
      justify-self: left;
      color: ${theme.sidebarSelectedTabForeground};
      transition: opacity 0.2s ease;

      &[is-visible=false] {
        opacity: 0;
        pointer-events: none;
      }

      &[is-visible=true] {
        opacity: 1;
      }
    `,

    addNewLoanButton: css`
      background-color: ${theme.sidebarSelectedTabBackground};
      pointer-events: none;
    `,

    loanList: css`
      grid-template-columns: 1em 5fr 0.5fr 4fr 0.5fr 2fr 0.5fr 2fr 1em;

      .icon {
        font-size: 1.2em;
      }

      .contractNumber {
        &:hover {
          color: ${theme.highlighter};
          cursor: pointer;
        }
      }

      .customerFullName {
        mark {
          color: ${theme.markForeground};
          background-color: transparent;
        }
      }

      .programDate {

      }
    `,
  }
})
