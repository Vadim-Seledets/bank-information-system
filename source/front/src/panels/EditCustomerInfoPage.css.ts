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
      height: 100%;
    `,

    actionsPanel: css`
      display: flex;
      align-items: center;
      justify-content: space-between;

      .editButton {
        color: ${theme.applicationForeground};
        border-bottom: 1px solid ${theme.applicationForeground};
      }
    `,
  }
})