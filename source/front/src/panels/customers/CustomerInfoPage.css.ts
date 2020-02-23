import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    customerInfo: css`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      color: ${theme.applicationForeground};
      background-color: ${theme.applicationBackground};
    `,

    propertyGroup: css`
      display: flex;
      flex-direction: column;
      padding: 0.5em;
      margin: 1em;
      border-radius: 0.2em;
      color: ${theme.customerInfoBubbleForeground};
      background-color: ${theme.customerInfoBubbleBackground};

      .hLine {
        border-bottom: ${theme.listRowBottomBorder};
        margin: 0.3em 0.25em 0.5em 0.25em;
      }
    `,
    
    propertyGroupCaption: css`
      font-size: 0.9em;
      font-weight: bold;
      padding: 0.5em 0;
      color: ${theme.customerInfoBubbleValueForeground}; 
    `,

    property: css`
      display: flex;
      padding: 0.25em 0;
      font-size: 0.8em;

      .name {
        
      }

      .value {
        margin-left: 1em;
        color: ${theme.customerInfoBubbleValueForeground};
      }
    `,
  }
})
