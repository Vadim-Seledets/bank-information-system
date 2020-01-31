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
      margin-right: 1em;
      /* overflow: scroll; */
    `,

    property: css`
      display: flex;
      justify-content: space-between;
      padding: 0.25em 0;

      .propertyName {

      }

      .propertyInput {
        width: 8em;
        border-bottom: 1px solid grey;
      }
    `,

    inputValue: css`
      
    `,
  }
})
