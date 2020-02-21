import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return { 
    main: css`
      display: grid;
      grid-template-columns: repeat(11, 1fr) 11em repeat(11, 1fr);
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

    disable: css`
      &[is-enabled=false] {
        pointer-events: none;
        background-color: grey;
      }
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
      justify-self: stretch;
      padding: 0;
      border: 1px solid ${theme.applicationForeground};
      border-radius: 0.2em;
      font-size: 0.8em;
      height: 1.4em;
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
        margin-right: 0.3em;
        font-size: 0.9em;
        border: none;
        outline: none;
        color: ${theme.applicationForeground};
        background-color: ${theme.applicationBackground};
      }
    `,

    receipt: css`
      justify-self: center;
      align-self: start;
      display: grid;
      grid-template-columns: 2fr 1em 1fr;
      align-items: center;
      padding: 0.25em;
      font-size: 0.8em;
      font-family: monospace;
      color: ${theme.customerInfoBubbleValueForeground};
      background-color: ${theme.customerInfoBubbleBackground};

      .title {
        justify-self: center;
        font-size: 1.2em;
        padding: 0.25em 0;
      }

      .caption {
        justify-self: left;
        padding: 0.25em 0;
      }

      .delimiter {
        justify-self: center;
      }

      .value {
        justify-self: right;
      }
    `,
  }
})
