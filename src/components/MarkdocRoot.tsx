import React from 'react';
import { RenderableTreeNodes } from '@markdoc/markdoc';
import markdocConfig from '../../lib/markdocConfig';
import { OGMap } from '../../lib/opengraph-scraper';

export function MarkdocRoot({
  ast
}: {
  ast: RenderableTreeNodes;
}): JSX.Element {
  return markdocConfig.renderReact(ast, React) as JSX.Element;
}
