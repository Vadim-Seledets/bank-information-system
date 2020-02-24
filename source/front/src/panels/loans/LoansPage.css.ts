import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
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
