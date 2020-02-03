import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: 1.5em repeat(10, 1fr);
    `,

    search: css`
      align-self: center;
      justify-self: center;
      display: flex;
      align-items: center;
      padding: 0.1em 0.3em;
      color: ${theme.applicationForeground};
      background-color: ${theme.customerSearchBackground};
      border-bottom: 1px solid ${theme.customerSearchBorderColor};
      border-radius: 0.2em;
      font-size: 0.8em;

      .icon {

      }

      .input {
        
      }
    `,

    customerList: css`
      display: grid;
      align-items: center;
      justify-items: center;
      grid-template-columns: 1em 3em 1fr 4fr 1fr 3fr 1fr 4em 1em;
      color: ${theme.applicationForeground};
      font-size: 0.8em;
      user-select: none;

      .icon {
        font-size: 1.2em;
        z-index: 2;

        &:hover {
          z-index: 4;
        }
      }

      .text {
        z-index: 2;
      }

      .email {
        color: #629D30;
      }

      .action {
        cursor: pointer;
        color: #dddddd;
      }

      .editButton {
        &[is-hovered=true] {
          color: #5889D1;
        }
      }

      .deleteButton {
        &[is-hovered=true] {
          color: red;
        }
      }

      .uploadButton {
        color: ${theme.sidebarSelectedTabBackground};
      }

      .errors {
        color: red;

        &:hover {
          .errorsPopUp {
            display: flex;
          }
        }

        .errorsPopUp {
          display: none;
          position: absolute;
          margin-bottom: -1em;
          margin-left: -15em;
          flex-direction: column;
          font-size: 0.7em;
          background-color: ${theme.applicationBackground};
          box-shadow: 0 0 0.4em ${theme.applicationForeground}; 
          border-radius: 0.3em;

          .errorRow {
            padding: 0.25em;
          }
        }
      }

      .row {
        z-index: 1;
        width: 100%;
        padding: 1em 0;
        border-bottom: 1px solid black;
      }

      .oddRow {
        background-color: ${theme.customerListOddRowBackground};
      }

      .rowHighlighter {
        &[is-hovered=true] {
          background-color: ${theme.customerListHighlightedRowBackground};
        }
      }
    `,
  }
})
