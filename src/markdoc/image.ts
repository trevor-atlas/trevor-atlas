import { Tag } from '@markdoc/markdoc';

export const image = {
  children: ['inline'],
  attributes: {
    src: { type: String },
    alt: { type: String }
  },
  // not sure what type these are and I couldn't find any docs :/
  transform(node: any, config: any) {
    const attributes = node.transformAttributes(config);

    return new Tag('img', { ...attributes, class: 'post-image' });
  }
};
