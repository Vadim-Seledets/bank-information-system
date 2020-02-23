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
      padding-top: 0.5em;
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

    button: css`
      align-self: center;
      font-size: 0.8em;
      padding: 0.25em 0.75em;
      border-radius: 0.2em;
      white-space: nowrap;
      user-select: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      border: ${theme.buttonBorder};
      background: ${theme.buttonBackground};

      &:hover {
        box-shadow: ${theme.buttonBoxShadow};
      }

        transition: opacity 0.2s ease, box-shadow ease 0.2s;
    `,

    backButton: css`
      color: ${theme.sidebarSelectedTabForeground};
      background-color: ${theme.sidebarSelectedTabBackground};
    `,

    list: css`
      display: grid;
      align-items: center;
      justify-items: center;
      color: ${theme.applicationForeground};
      font-size: 0.8em;
      user-select: none;

      .rowContent {
        z-index: 2;
      }

      .rowBase {
        z-index: 1;
        width: 100%;
        padding: 1em 0;
        border-bottom: 1px solid ${theme.customerListRowBottomBorder};
      }
      
      .row {
        transition: background-color ease 0.2s;

        &:hover {
          background-color: ${theme.customerListHoveredRowBackground};
        }

        &[is-selected=true] {
          background-color: ${theme.customerListHighlightedRowBackground};
        }

        &[is-odd=true][is-selected=false]:not(:hover) {
          background-color: ${theme.customerListOddRowBackground};
        }
      }

      .rowContent:hover ~ .row {
        background-color: ${theme.customerListHoveredRowBackground};

        &:not(:hover) {
          background-color: ${theme.customerListHoveredRowBackground};
        }

        &[is-selected=true] {
          background-color: ${theme.customerListHighlightedRowBackground};
        }
      }

      .rowContent:hover ~ .row + .rowContent ~ .row {
        background-color: transparent;

        &[is-selected=true] {
          background-color: ${theme.customerListHighlightedRowBackground};
        }

        &[is-odd=true][is-selected=false] {
          background-color: ${theme.customerListOddRowBackground};
        }
      }
    `,
  }
})
