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
      overflow: scroll;
    `,

    property: css`
      display: flex;
      padding: 0.25em 0 0.25em 0.25em;

      .propertyName {

      }
    `,

    inputValue: css`
      :valid {
        color: green;
      }
    `,
  }
})
