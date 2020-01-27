import { css, injectGlobal } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      label: main;

      background-color: ${theme.applicationBackground};
      color: ${theme.applicationForeground};
      display: grid;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      font-family: Calibri, Arial, Tahoma;
      font-size: calc(16px + (24 - 16) * (100vw - 640px) / (1920 - 640));
      font-weight: 300;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 2em 6fr 1fr;

      button {
        padding: 0.1em;
        margin: 0 0.25em;
        min-width: 1.75em;
        white-space: nowrap;
      }

      button:hover {
        cursor: pointer;
      }

      button, input {
        transition: background-color ease 0.5s, border-bottom ease 0.5s, box-shadow ease 0.5s;
        box-shadow: 0 0 1px 0 rbga(127, 127, 127, 0.5);
        padding: 0 0.2em;
      }
    `,

    property: css`
      display: flex;

      input:focus {
        border-bottom: 1px solid white;
      }
    `,

    propertyCaption: css`
      
    `,
    
    propertyInput: css`
      border-bottom: 1px solid grey;
    `,
  }
})
