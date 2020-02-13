import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      position: relative;
      display: flex;
      flex-direction: column;
      color: ${theme.applicationForeground};
      background-color: ${theme.applicationBackground};
    `,

    propertyGroupCaption: css`
      display: flex;
      align-items: center;
      padding: 0.5em 0;

      .caption {
        font-weight: bold;
      }

      .error {
        font-size: 0.9em;
        color: #ee3333;
       }
    `,

    property: css`
      display: flex;
      align-items: baseline;
      padding: 0.25em 0;

      .caption {
        font-size: 0.9em;
      }

      .input {
        width: 13em;
        margin: 0 1em;
        border: 1px solid ${theme.applicationForeground};
        border-radius: 0.2em;
        font-size: 0.9em;
        height: 1.25em;

        &[is-invalid=true] {
          border-color: #ee3333;
        }
      }

      .error {
        font-size: 0.9em;
        color: #ee3333;
       }
    `,

    verticallyCentered: css`
      align-items: center;  
    `,

    money: css`
      display: flex;
      align-items: center;

      .amount {
        flex-grow: 1;
      }

      .currency {
        border: none;
        outline: none;
        color: ${theme.applicationForeground};
        background-color: ${theme.applicationBackground};
      }
    `,
  }
})
