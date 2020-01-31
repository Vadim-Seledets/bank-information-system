import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      label: main;

      background-color: ${theme.applicationBackground};
      display: grid;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      font-family: Calibri, Arial, Tahoma;
      font-size: calc(16px + (24 - 16) * (100vw - 640px) / (1920 - 640));
      font-weight: 300;
      grid-template-columns: 2fr repeat(11, 1fr);
      grid-template-rows: 1.5em 1.5em repeat(10, 1fr);

      button {
        padding: 0.1em;
        margin: 0 0.25em;
        min-width: 1.75em;
        white-space: nowrap;
      }

      button:hover {
        cursor: pointer;
      }

      button, input {
        transition: background-color ease 0.5s, border-bottom ease 0.5s, box-shadow ease 0.5s;
        box-shadow: 0 0 1px 0 rbga(127, 127, 127, 0.5);
        padding: 0 0.2em;
      }
    `,

    menu: css`
      display: flex;
      align-items: center;
      background-color: ${theme.menuBackground};
    `,

    actionPanel: css`
      display: flex;
      align-items: center;
      justify-content: space-between;

      .addNewCustomerButton {
        color: ${theme.applicationForeground};
      }

      .search {
        width: 8.1em;
        color: ${theme.applicationForeground};
        border-bottom: 1px solid ${theme.applicationForeground};
      }
    `,

    customersPage: css`
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: 1.5em repeat(10, 1fr);
    `,

    caption: css`
      color: ${theme.applicationForeground};
      text-align: center;
      align-self: center;
    `,

    actionsOnEditPanel: css`
      display: flex;
      align-self: center;
      align-items: center;
    `,
    
    editButton: css`
      color: ${theme.applicationForeground};

      &:hover {
        color: #aaa;
      }
    `,

    closeEditPanel: css`
      color: ${theme.applicationForeground};
    `,

    sidebar: css`
      display: flex;
      flex-direction: column;
      background: ${theme.sidebarBackground}
    `,

    sidebarElement: css`
      padding: 0.25em 0;

      &[is-selected=true] {
        color: ${theme.applicationForeground};
        background: ${theme.applicationBackground};
      }
    `,

    editCustomerButton: css`
      color: grey;
      pointer-events: none;

      &[is-enabled=true] {
        color: white;
      }
    `,

    clicable: css`
      cursor: pointer;
    `,

    addCustomerButton: css`
      color: ${theme.applicationForeground};
      align-self: center;
      justify-self: center;
    `,

    customerList: css`
      display: flex;
      flex-direction: column;
      color: ${theme.applicationForeground};
    `,
    
    customerListElement: css`
      display: flex;
      box-sizing: border-box;
      line-height: 1.2em;
      padding: 0.25em 0;
      border-bottom: 1px solid ${theme.applicationForeground};
      transition: background-color ease 0.5s, border-bottom ease 0.5s, box-shadow ease 0.5s;

      &[is-selected=true] {
        border-bottom: 1px solid ${theme.highlighter};
      }

      .action {
        display: none;
        cursor: pointer;
      }

      .space {
        flex-grow: 1;
      }

      .edit {

      }

      &:hover {
        .action {
          display: initial;
        }
      }
    `,

    customerInfoPanel: css`
      display: flex;
    `,
  }
})
