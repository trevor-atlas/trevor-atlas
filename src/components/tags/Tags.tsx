import { css } from '@emotion/css';
import { m } from 'framer-motion';
import { useState } from 'react';
import styles from './tags.module.scss';

interface TagsProps {
  tags: string[];
}

function getTag(label: string, color: string) {
  return { label, color };
}

function getFormattedTag(name: string) {
  switch (name) {
    case 'javascript':
      return getTag('Javascript', 'bg-yellow-200 text-yellow-800');
    case 'react':
      return getTag('React', 'bg-blue-200 text-blue-600');
    case 'typescript':
      return getTag('Typescript', 'bg-blue-400 text-blue-900');
    case 'css':
      return getTag('CSS', 'bg-purple-100 text-purple-600');
    case 'html':
      return getTag('HTML', 'bg-red-100 text-red-600');
    case 'git':
      return getTag('Git', 'bg-black-100 text-white-600');
    case 'linux':
      return getTag('Linux', 'bg-green-100 text-green-600');
    case 'macos':
      return getTag('MacOS', 'bg-gray-100 text-gray-600');
    case 'rust':
      return getTag('Rust', 'bg-red-100 text-red-600');
    case 'go':
      return getTag('Go', 'bg-blue-100 text-blue-600');
    case 'shell':
      return getTag('Shell', 'bg-indigo-400 text-indigo-800');
    case 'macos':
      return getTag('MacOS', 'bg-slate-400 text-slate-800');
    case 'ios':
      return getTag('iOS', 'bg-slate-400 text-slate-800');
    case 'productivity':
      return getTag('Productivity', 'bg-cyan-400 text-cyan-800');
    case 'node':
      return getTag('Node', 'bg-green-200 text-green-700');
    case 'npm':
      return getTag('Npm', 'bg-red-300 text-slate-100');
    case 'wordpress':
      return getTag('Wordpress', 'bg-stone-300 text-stone-900');
    case 'philosophy':
      return getTag('Philosophy', 'bg-gray-400 text-gray-800');
    case 'consulting':
      return getTag('Consulting', 'bg-gray-200 text-yellow-700');
    case 'books':
      return getTag('Books', 'bg-gray-600 text-gray-100');
    case 'music':
      return getTag('Music', 'bg-teal-500 text-slate-800');
    case 'ERROR':
      return getTag('No Tag!', 'bg-red-400 text-red-900');
    default:
      return getTag(name, 'bg-gray-100 text-gray-600');
  }
}

const tagstyles = css`
  font-size: 0.7rem;
  margin-right: 0.5rem;
  border-radius: 3px;
  text-transform: capitalize;
  padding: 0.2rem 0.5rem;
  color: rgba(0, 0, 0, 0.8);
`;

export function Tag({ name }: { name: string }) {
  const { label, color } = getFormattedTag(name);
  return (
    <span className={`${styles.tagContainer} ${color} ${tagstyles} `}>
      {label}
    </span>
  );
}

// T-32 add a callback for tags to be clicked.
// jump to the blog page with url queryparam from clicked tag
// use that to filter the posts on the blog page
export function Tags(props: TagsProps) {
  if (!props || !props.tags || props.tags.length === 0) {
    return <Tag name="ERROR" />;
  }

  return (
    <div>
      {props.tags.sort().map((name) => (
        <Tag key={name} name={name} />
      ))}
    </div>
  );
}
