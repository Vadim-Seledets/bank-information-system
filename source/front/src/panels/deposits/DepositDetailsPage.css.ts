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

    button: css`
      justify-self: left;
      color: ${theme.sidebarSelectedTabForeground};
      transition: opacity 0.2s ease;

      &[is-visible=false] {
        opacity: 0;
        pointer-events: none;
      }

      &[is-visible=true] {
        opacity: 1;
      }
    `,

    deleteButton: css`
      display: flex;
      align-items: center;
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
      color: ${theme.customerInfoBubbleValueForeground}; 
    `,

    property: css`
      display: flex;
      align-items: baseline;
      padding: 0.25em 0;
      font-size: 0.8em;

      .name {
        color: ${theme.customerInfoBubbleForeground};
      }

      .value {
        margin-left: 1em;
        padding: 0.25em 0.25em;
        color: ${theme.customerInfoBubbleValueForeground};
        background-color: ${theme.customerInfoBubbleBackground};
        border-radius: 0.2em;
      }
    `,

    transactions: css`
      display: grid;
      align-items: center;
      justify-items: center;
      font-size: 0.8em;
      grid-template-columns: 4fr 1fr 3fr 1fr 4fr 2em 4fr;
    `,

    transactionRow: css`
      padding: 1em 0;
      width: 100%;
    `,

    transactionFirstRow: css`
      border-bottom: 1px solid ${theme.customerListRowBottomBorder};
    `,
  }
})
