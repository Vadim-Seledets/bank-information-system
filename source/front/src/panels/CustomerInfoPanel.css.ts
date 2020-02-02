import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      label: main;
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
        align-items: center;
        
        .name {
          font-size: 0.7em;
          color: grey;
        }

        .error {
          color: red;
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
