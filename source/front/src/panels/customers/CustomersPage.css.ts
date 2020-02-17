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

    addNewOrEditCustomerButton: css`
      background-color: ${theme.sidebarSelectedTabBackground};
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
      
      .rowContent {
        z-index: 2;
      }

      .rowBase {
        z-index: 1;
        width: 100%;
        padding: 1em 0;
        border-bottom: 1px solid ${theme.customerListRowBottomBorder};
      }
      
      .row {
        transition: background-color ease 0.2s;

        &:hover {
          background-color: ${theme.customerListHoveredRowBackground};
        }

        &[is-selected=true] {
          background-color: ${theme.customerListHighlightedRowBackground};
        }
      }

      .oddRow {
        background-color: ${theme.customerListOddRowBackground};
      }

      .rowContent:hover ~ .row {
        background-color: ${theme.customerListHoveredRowBackground};

        &[is-selected=true] {
          background-color: ${theme.customerListHighlightedRowBackground};
        }
      }

      .rowContent:hover ~ .row + .rowContent ~ .row {
        background-color: transparent;

        &[is-selected=true] {
          background-color: ${theme.customerListHighlightedRowBackground};
        }
      }
    `,
  }
})
