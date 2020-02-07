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
      color: ${theme.applicationForeground};
      background-color: ${theme.applicationBackground};
    `,

    propertyGroupCaption: css`
      font-size: 0.9em;
      font-weight: bold;
      padding: 0.5em 0;
    `,

    property: css`
      display: flex;
      padding: 0.25em 1em;
      font-size: 0.8em;

      .name {
        
      }

      .value {
        margin-left: 1em;
      }
    `,
  }
})
