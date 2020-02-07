import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: 2em repeat(10, 1fr);
    `,

    headLine: css`
      display: flex;
      flex-wrap: wrap;

      .space {
        flex-grow: 1;
      }
    `,

    backButton: css`
      color: ${theme.sidebarSelectedTabForeground};
      background-color: ${theme.sidebarSelectedTabBackground};
    `,

    customerInfo: css`
      display: flex;
      flex-direction: column;
    `,

    propertyGroupCaption: css`
      font-size: 0.9em;
      font-weight: bold;
      padding: 0.5em 0;
    `,

    property: css`
      display: flex;
      flex-direction: column;
      padding: 0.25em 0;
      
      .propertyNameLine {
        display: flex;
        align-items: baseline;
        line-height: 1.1em;

        .name {
          font-size: 0.7em;
          color: grey;
        }

        .error {
          font-size: 0.9em;
          color: red;

          &:hover {
            .errorPopUp {
              display: flex;
            }
          }

          .errorPopUp {
            z-index: 3;
            display: none;
            position: absolute;
            margin-left: -2em;
            flex-direction: column;
            font-size: 0.8em;
            background-color: ${theme.applicationBackground};
            box-shadow: 0 0 0.4em ${theme.applicationForeground}; 
            border-radius: 0.3em;
            
            .errorRow { 
              padding: 0.25em;
            }
          }
        }

        .input {
          margin-left: 1em;
          height: 1em;
        }
      }

      .propertyInputColumn {
        height: 1em;
        font-size: 0.8em;
        padding: 0.25em 0;
        border-bottom: 1px solid grey;
        color: ${theme.applicationForeground};
        background-color: ${theme.applicationBackground};

        &[is-invalid=true] {
          border-bottom: 1px solid red;
        }
      }

      .propertyInputHorizontalLine {
        display: flex;
        align-items: baseline;
        height: 1em;
        font-size: 0.8em;
        padding: 0.25em 0;
        color: ${theme.applicationForeground};
        background-color: ${theme.applicationBackground};
      }
    `,
  }
})
