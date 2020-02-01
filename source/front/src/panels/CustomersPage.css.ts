import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: 1.5em repeat(10, 1fr);
    `,

    actionsPanel: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8em;

      .addNewCustomerButton {
        color: ${theme.applicationForeground};
        user-select: none;
        cursor: pointer;

        &:hover {
          color: ${theme.buttonHover};
        }
      }

      .search {
        width: 8.1em;
        color: ${theme.applicationForeground};
        border-bottom: 1px solid ${theme.applicationForeground};
      }
    `,

    customerList: css`
      display: grid;
      align-items: center;
      justify-items: center;
      grid-template-columns: 1em 3em 1fr 4fr 1fr 3fr 1fr 3em 1em;
      color: ${theme.applicationForeground};
      font-size: 0.8em;
      user-select: none;

      .icon {
        font-size: 1.2em;
        z-index: 2;
      }

      .text {
        z-index: 2;
      }

      .action {
        cursor: pointer;
      }

      .row {
        z-index: 1;
        width: 100%;
        padding: 1em 0;
        border-bottom: 1px solid black;
      }

      .oddRow {
        background-color: #F9FAFB;
      }

      /* .rowHighlighter {
        &[is-hover] {
          background-color: #eaebec;
        }
      } */
    `,
  }
})
