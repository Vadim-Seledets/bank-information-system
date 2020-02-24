import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    editOrPublishButton: css`
      color: ${theme.sidebarSelectedTabForeground};
      background-color: ${theme.sidebarSelectedTabBackground};

      &[is-enabled=false] {
        pointer-events: none;
        background-color: grey;
      }
    `,

    properties: css`
      display: grid;
      grid-template-columns: 10.5em 1em 3.8fr 1em 5fr;
      align-items: center;
      color: ${theme.applicationForeground};
      background-color: ${theme.applicationBackground};
    `,
    
    header: css`
      display: flex;
      align-items: baseline;
      margin: 0.5em 0;
      font-size: 1em;

      .caption {
        margin-right: 1em;
        font-weight: bold;
      }
    `,

    caption: css`
      justify-self: right;
      font-size: 0.8em;
      color: ${theme.customerInfoBubbleForeground};
    `,

    error: css`
      font-size: 0.8em;
      color: #ee3333;
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
