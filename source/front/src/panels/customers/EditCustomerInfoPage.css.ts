import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
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
      align-items: center;
      margin-left: 1em;
      background-color: #ee3333;
    `,

    deleteButtonYesNoButtonsContainer: css`
      display: flex;
      align-items: center;
      margin-left: 0.5em;
      border-left: 1px solid #aa2222;

      &[is-visible=false] {
        display: none;
      }

      .yesButton {
        padding: 0 0.5em;

        &:hover {
          color: ${theme.highlighter};
        }
      }

      .noButton {
        padding-left: 0.5em;

        &:hover {
          color: ${theme.highlighter};
        }
      }
    `,

  }
})
