import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: 2em repeat(11, 1fr);
    `,

    headLine: css`
      display: flex;
      flex-wrap: wrap;

      .headLineItem {
        margin-right: 1em;
      }

      .space {
        flex-grow: 1;
      }
    `,
    
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

    addNewOrEditCustomerButton: css`
      justify-self: left;
      color: ${theme.sidebarSelectedTabForeground};
      background-color: ${theme.sidebarSelectedTabBackground};
    `,

    deleteButton: css`
      align-self: center;
      justify-self: left;
      padding: 0.25em 0.75em;
      font-size: 0.8em;
      user-select: none;
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      align-items: center;
      /* margin-left: 1em; */
      color: ${theme.sidebarSelectedTabForeground};
      background-color: #ee3333;
      border-radius: 0.2em;
      width: 7.5em;
      transition: width 0.2s ease;
      
      &[is-visible=true] {
        width: 12.5em;
      }
    `,

    deleteButtonYesNoButtonsContainer: css`
      display: flex;
      align-items: center;
      margin-left: 0.5em;
      border-left: 1px solid #aa2222;

      &[is-visible=false] {
        display: none;
      }

      .yesNoButton {
        padding: 0 0.5em;

        &:hover {
          color: ${theme.highlighter};
        }
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

      .fullName {
        z-index: 2;

        &:hover {
          color: ${theme.highlighter};
          cursor: pointer;
        }
      }

      .email {
        z-index: 2;
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
          background-color: ${theme.customerListHoveredRowBackground};
        }
        
        &[is-selected=true] {
          background-color: ${theme.customerListHighlightedRowBackground};
          /* z-index: 1000; */
        }
      }
    `,
  }
})
