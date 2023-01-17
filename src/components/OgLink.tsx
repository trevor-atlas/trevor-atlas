import { OpenGraphResult } from 'lib/opengraph-scraper';
import React from 'react';
import { css } from '@emotion/css';
import { BiLinkExternal } from 'react-icons/bi';

const titleStyle = css`
  line-height: 1.6;
  font-size: 14px;
  flex-grow: 1.2;
  text-overflow: ellipsis;
`;

type OgLinkProps =
  | {
      title: string;
      url: string;
      ogData: null;
    }
  | {
      title: undefined;
      url: string;
      ogData: OpenGraphResult;
    };

export function OgLink({ title, url, ogData }: OgLinkProps) {
  if (!ogData) {
    return (
      <a href={url} rel="noopener noreferrer" target="_blank">
        {title}
      </a>
    );
  }

  const { ogUrl, ogDescription, ogImage, ogTitle } = ogData;
  return (
    <a
      href={ogUrl}
      rel="noopener noreferrer"
      target="_blank"
      className={css`
        margin: 0 0 8px 0;
        max-width: 500px;
        background-color: #eee;
        border: 1px solid transparent;
        color: #181919;
        overflow: hidden;
        display: flex;
        text-decoration: none !important;
        position: relative;
        transition-duration: 150ms;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
        transition-property: background, border-color;
        will-change: background, border-color;
        &:hover {
          background-color: #e1e8ed;
          border-color: rgba(0, 0, 0, 0.3);
        }
      `}
      title={ogTitle}
    >
      {ogImage && ogImage.url ? (
        <div
          className={css`
            display: block;
            overflow: hidden;
            height: auto;
            position: relative;
            flex: 0 0 150px;
          `}
        >
          <img
            src={ogImage.url}
            alt={ogTitle}
            loading="lazy"
            className={css`
              transition: transform 0.5s ease;
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
            `}
          />
        </div>
      ) : null}
      <div
        className={css`
          display: flex;
          padding: 10px 15px;
          min-width: 0px;
          box-sizing: border-box;
          flex: 1 1 0%;
          justify-content: space-around;
          flex-direction: column;
          align-items: stretch;
        `}
      >
        <h5
          title={ogTitle}
          className={`overflow-hidden whitespace-no-wrap m-0 w-full ${titleStyle}`}
        >
          {ogTitle}
        </h5>
        <div
          className={`text-left font-normal ${css`
            font-size: 12px;
            flex-grow: 2;
            margin: auto 0;
          `}`}
        >
          <p
            title={ogTitle}
            className={`m-0 ${css`
              font-size: inherit;
              text-align: inherit;
              font-weight: inherit;
              font-family: inherit;
              color: inherit;
            `}`}
          >
            {ogDescription?.length > 200
              ? ogDescription.split(/\s/gim).slice(0, 60).join(' ') + '...'
              : ogDescription}
          </p>
        </div>
        <footer
          className={`mt-2 flex items-center justify-between text-left flex-grow-0 font-normal text-xs w-full`}
        >
          <p
            className={css`
              font-size: 12px;
              margin: 0;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
            title={ogTitle}
          >
            {ogUrl}
          </p>
          <BiLinkExternal />
        </footer>
      </div>
    </a>
  );
}
