import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return { 
    main: css`
      display: grid;
      grid-template-columns: repeat(11, 1fr) 12em repeat(11, 1fr);
      grid-template-rows: repeat(24, 1fr);
      align-items: center;
      justify-items: center;
      /* border: 1px solid ${theme.highlighter}; */
      flex-grow: 1;
      color: ${theme.applicationForeground};
    `,

    centeredText: css`
      text-align: center;
      color: ${theme.applicationForeground};
    `,

    tip: css`
      font-size: 0.8em;
      color: ${theme.customerInfoBubbleForeground};
      text-align: center;
    `,
    
    propertyValueTuple: css`
      display: flex;
      align-items: baseline;
      font-size: 0.8em;

      .caption {
        color: ${theme.customerInfoBubbleForeground};
      }

      .value {
        padding: 0.25em;
        margin-left: 1em;
        border-radius: 0.2em;
        color: ${theme.customerInfoBubbleValueForeground};
        background-color: ${theme.customerInfoBubbleBackground};
      }
    `,
    
    pin: css`
      display: flex;
      align-items: center;
      justify-content: center;

      .digit {
        padding: 0.25em;
        min-width: calc(1ch + 0.25em);
        text-align: center;
        margin-left: 1em;
        border-radius: 0.2em;
        color: ${theme.customerInfoBubbleValueForeground};
        background-color: ${theme.customerInfoBubbleBackground};
        border: 1px solid ${theme.applicationForeground};
      }
      
      &[is-correct=true] {
        .digit {
          animation: correct-pin 0.6s ease;

          @keyframes correct-pin {
            from {
              border-color: ${theme.applicationForeground};
            }
            to {
              border-color: lime;
            }
          }
        }
      }

      &[is-invalid=true] {
        .digit {
          border-color: #ee3333;
        }

        animation: incorrect-pin 0.3s ease;

        @keyframes incorrect-pin {
          from {
            margin: 0;
          }
          30% {
            margin-left: -2em;
          }
          70% {
            margin-right: -2em;
          }
          to {
            margin: 0;
          }
        }
      }
    `,
    
    disable: css`
      &[is-enabled=false] {
        pointer-events: none;
        background-color: grey;
      }
    `,

    greenButton: css`
      display: flex;
      justify-content: center;
      color: ${theme.sidebarSelectedTabForeground};
      background-color: ${theme.sidebarSelectedTabBackground};
    `,
    
    redButton: css`
      display: flex;
      justify-content: center;
      color: ${theme.sidebarSelectedTabForeground};
      background-color: #ee3333;
    `,

    caption: css`
      justify-self: right;
      font-size: 0.8em;
      color: ${theme.customerInfoBubbleForeground};
    `,

    money: css`
      display: flex;
      align-items: center;

      .amount {
        flex-grow: 1;
      }

      .currency {
        margin-right: 0.3em;
        font-size: 0.9em;
        border: none;
        outline: none;
        color: ${theme.applicationForeground};
        background-color: ${theme.applicationBackground};
      }
    `,

    receipt: css`
      display: grid;
      grid-template-columns: 1fr 1em 1fr;
      align-items: center;
      padding: 0.5em;
      font-size: 0.8em;
      font-family: monospace;
      border-radius: 0.2em;
      color: ${theme.customerInfoBubbleValueForeground};
      background-color: ${theme.customerInfoBubbleBackground};

      .title {
        justify-self: center;
        font-size: 1.2em;
        padding: 0.25em 0;
      }

      .caption {
        justify-self: left;
        padding: 0.25em 0;
      }

      .delimiter {
        justify-self: center;
      }

      .value {
        justify-self: right;
      }
    `,
  }
})
