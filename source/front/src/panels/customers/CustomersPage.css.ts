import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
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
        color: ${theme.inputForeground};
      }

      .fullName {
        color: ${theme.inputForeground};

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
        color: ${theme.emailForeground};
      }
    `,
  }
})
