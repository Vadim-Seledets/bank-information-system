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
      background-color: ${theme.customerSearchBackground};
      border-bottom: 1px solid ${theme.customerSearchBorderColor};
      border-radius: 0.2em;
      font-size: 0.8em;
    `,

    button: css`
      justify-self: left;
      color: ${theme.sidebarSelectedTabForeground};

      &[is-visible=false] {
        opacity: 0;
        pointer-events: none;
      }

      &[is-visible=true] {
        opacity: 1;
      }
    `,

    addNewOrEditCustomerButton: css`
      background-color: ${theme.sidebarSelectedTabBackground};
    `,

    customerList: css`
      grid-template-columns: 1em 3em 1fr 4fr 1fr 3fr 1fr 4em 1em;
      
      .icon {
        font-size: 1.2em;
      }

      .fullName {
        mark {
          color: ${theme.markForeground};
          background-color: transparent;
        }

        &:hover {
          color: ${theme.highlighter};
          cursor: pointer;
        }
      }

      .email {
        color: #629D30;
      }
    `,
  }
})
