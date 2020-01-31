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

      .addNewCustomerButton {
        color: ${theme.applicationForeground};
      }

      .search {
        width: 8.1em;
        color: ${theme.applicationForeground};
        border-bottom: 1px solid ${theme.applicationForeground};
      }
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
  }
})
