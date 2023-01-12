import { RenderableTreeNode, Tag } from '@markdoc/markdoc';

export const isTagNode = (node: RenderableTreeNode): node is Tag => {
  if (!node) {
    return false;
  }

  return typeof node === 'object' && 'name' in node;
};

export const isTextNode = (node: RenderableTreeNode): node is string => {
  return typeof node === 'string';
};

export const isOgLinkNode = (
  node: RenderableTreeNode
): node is Tag & { attributes: { url: string; ogData: any } } => {
  return isTagNode(node) && node.name === 'OgLink';
};
