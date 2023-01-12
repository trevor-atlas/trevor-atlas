import React from 'react';
import Markdoc, { RenderableTreeNodes } from '@markdoc/markdoc';
import markdocConfig from '../../lib/markdocConfig';

export default function MarkdocRoot({ ast }: { ast: RenderableTreeNodes }) {
  return Markdoc.renderers.react(ast, React, {
    components: markdocConfig.getComponents()
  });
}
