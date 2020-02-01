import { css } from 'emotion'
import { restyle } from 'reactronic-toolkit-react'
import { themes } from '../models/Theme'

export const style = restyle(() => {
  const theme = themes.active
  return {
    main: css`
      label: main;

      background-color: ${theme.applicationBackground};
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
      grid-template-columns: 2fr repeat(11, 1fr);
      grid-template-rows: 2em 1.5em repeat(10, 1fr);

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

    menu: css`
      display: flex;
      align-items: center;
      background-color: ${theme.menuBackground};
    `,

    sidebar: css`
      display: flex;
      flex-direction: column;
      background: ${theme.sidebarBackground};
      color: ${theme.sidebarForeground};
    `,

    sidebarElement: css`
      display: flex;
      align-items: center;
      padding: 0.4em 0;
      text-transform: uppercase;

      &:hover {
        background: ${theme.applicationBackgroundDemmed};
      }

      &[is-selected=true] {
        color: ${theme.sidebarTabSelectedForeground};
        background: ${theme.sidebarTabSelectedBackground};
      }

      .icon {
        margin: 0 0.5em;
        font-size: 1.2em;
      }

      .caption {
        font-size: 0.6em;
      }
    `,

    clicable: css`
      cursor: pointer;
    `,
  }
})
