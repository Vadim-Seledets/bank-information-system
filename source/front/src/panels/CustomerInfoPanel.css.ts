import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      position: relative;
      background-color: ${theme.applicationBackground};
      color: ${theme.applicationForeground};
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin: 0 1em;
      
    `,

    propertyGroupCaption: css`
      font-size: 0.9em;
      font-weight: bold;
      padding: 0.5em 0;
    `,

    property: css`
      display: flex;
      flex-direction: column;
      margin-left: 1em;
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
      }
    `,
  }
})
