import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

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

      .editButton {
        color: ${theme.applicationForeground};
        border-bottom: 1px solid ${theme.applicationForeground};
      }
    `,

    editOrPublishButton: css`
      color: ${theme.sidebarSelectedTabForeground};
      background-color: ${theme.sidebarSelectedTabBackground};

      &[is-enabled=false] {
        pointer-events: none;
        background-color: grey;
      }
    `,

    deleteButton: css`
      display: flex;
      justify-content: space-around;
      width: 8em;
      align-self: center;
      justify-self: center;
      font-size: 0.8em;
      padding: 0.25em 0.75em;
      user-select: none;
      cursor: pointer;
      border-radius: 0.2em;
      white-space: nowrap;
      background-color: red;
    `,

    backButton: css`
      color: ${theme.sidebarSelectedTabForeground};
      background-color: ${theme.sidebarSelectedTabBackground};
    `,
  }
})
