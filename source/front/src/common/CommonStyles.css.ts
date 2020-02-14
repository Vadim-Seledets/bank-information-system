import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../models/Theme'

export const commonStyle = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      position: relative;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: 2em repeat(10, 1fr);
    `,

    headLine: css`
      position: sticky;
      top: 0;
      z-index: 2;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background-color: ${theme.applicationBackground}bb;

      .headLineItem {
        margin-right: 1em;
      }

      .space {
        flex-grow: 1;
      }

      .error {
        margin-left: 1em;
        font-size: 0.8em;
        color: #ee3333;
      }
    `,

    backButton: css`
      color: ${theme.sidebarSelectedTabForeground};
      background-color: ${theme.sidebarSelectedTabBackground};
    `,
  }
})
