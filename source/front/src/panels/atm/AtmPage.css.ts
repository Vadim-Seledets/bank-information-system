import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return { 
    main: css`
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(24, 1fr);
      align-items: center;
      justify-items: center;
      border: 1px solid ${theme.highlighter};
      flex-grow: 1;
    `,

    centeredText: css`
      text-align: center;
      color: ${theme.applicationForeground};
    `,

    greenButton: css`
      background-color: ${theme.sidebarSelectedTabBackground};
    `,
  }
})
