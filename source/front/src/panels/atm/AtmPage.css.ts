import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return { 
    main: css`
      display: grid;
      grid-template-columns: repeat(24, 1fr);
      grid-template-rows: repeat(24, 1fr);
      align-items: center;
      justify-items: center;
      /* border: 1px solid ${theme.highlighter}; */
      flex-grow: 1;
    `,

    centeredText: css`
      text-align: center;
      color: ${theme.applicationForeground};
    `,

    greenButton: css`
      display: flex;
      justify-content: center;
      background-color: ${theme.sidebarSelectedTabBackground};
    `,

    caption: css`
      justify-self: right;
      font-size: 0.8em;
      color: ${theme.customerInfoBubbleForeground};
    `,

    input: css`
      /* margin: 0.25em 0; */
      /* justify-self: stretch; */
      padding: 0;
      border: 1px solid ${theme.applicationForeground};
      border-radius: 0.2em;
      font-size: 0.8em;
      height: 1.4em;
      min-width: 15em;
      outline: none;
      color: ${theme.applicationForeground};
      background-color: ${theme.applicationBackground};

      &[is-invalid=true] {
        border-color: #ee3333;
      }

      &:disabled {
        color: ${theme.customerInfoBubbleForeground};
      }
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
