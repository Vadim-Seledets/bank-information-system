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

    depositList: css`
      display: grid;
      align-items: center;
      justify-items: center;
      grid-template-columns: 1em 5fr 0.5fr 4fr 0.5fr 2fr 0.5fr 2fr 1em;
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

      .contractNumber {
        z-index: 2;

        &:hover {
          color: ${theme.highlighter};
          cursor: pointer;
        }
      }

      .customerFullName {
        z-index: 2;

        mark {
          color: ${theme.markForeground};
          background-color: transparent;
        }
      }

      .programDate {
        z-index: 2;
        /* color: #629D30; */
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
        border-bottom: 1px solid ${theme.customerListRowBottomBorder};
        transition: background-color ease 0.2s;
      }

      .oddRow {
        background-color: ${theme.customerListOddRowBackground};
      }

      .rowHighlighter {
        &[is-hovered=true] {
          background-color: ${theme.customerListHoveredRowBackground};
        }
        
        &[is-selected=true] {
          background-color: ${theme.customerListHighlightedRowBackground};
        }
      }
    `,
  }
})
