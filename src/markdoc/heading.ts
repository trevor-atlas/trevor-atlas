import { Tag } from '@markdoc/markdoc';

function generateID(
  children: Array<string | Tag>,
  attributes: { level: number; id?: string }
) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[^a-z\s\d]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export const heading = {
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 }
  },
  // not sure what type these are and I couldn't find any docs :/
  transform(node: any, config: any) {
    const attributes = node.transformAttributes(config);
    const children: Array<string | Tag> = node.transformChildren(config);

    const id = generateID(children, attributes);
    children.push(new Tag('div', { id, class: 'header-hash' }, ['#']));
    return new Tag(`h${node.attributes['level']}`, { ...attributes }, children);
  }
};
