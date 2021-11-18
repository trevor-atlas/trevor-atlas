import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import removeMd from 'remove-markdown';
import highlight from 'remark-highlight.js';
import { serialize } from 'next-mdx-remote/serialize';
import { IReadTime, readingTime } from './read-time';

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');

export interface IRawPost extends Record<string, unknown> {
  id: string;
  draft: boolean;
  content: string; // raw html
  date: string;
  title: string;
  slug: string;
  categories: string[];
  featured_image?: string;
  thumbnail?: string;
  contentHtml: string;
  contentText: string;
  isMDX: boolean;
}

export interface IPost {
  id: string;
  draft: boolean;
  content: string; // '<h1>Hello world!</h1>',
  date: number;
  title: string;
  slug: string;
  categories: string[];
  featuredImage?: string;
  thumbnail?: string;
  contentHtml: string;
  contentText: string;
  excerpt: string;
  readTime: IReadTime;
  isMDX: boolean;
}

const getFile = (filename: string): string => {
  const fullPath = path.join(POSTS_DIRECTORY, filename);
  return fs.readFileSync(fullPath, 'utf8');
};

export const processPostContent = ({
  id,
  title,
  slug,
  categories,
  content,
  contentHtml,
  contentText,
  date,
  draft,
  featured_image,
  isMDX
}: IRawPost): IPost => ({
  id,
  title,
  slug: slug || id,
  content,
  contentHtml: contentHtml || '',
  categories: categories || [],
  draft: draft || false,
  date: new Date(date).getTime(),
  excerpt: getExcerpt(contentText),
  contentText,
  readTime: readingTime(contentText),
  featuredImage: featured_image || null,
  isMDX
});

const processMDFile = async (filename: string): Promise<IRawPost> => {
  const id = filename.replace(/\.(md)$/, '');
  const fileContents = getFile(filename);
  const { content, data } = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .use(highlight)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    content,
    contentHtml,
    contentText: getRawText(content),
    ...data, // frontmatter content like date, draft etc
    isMDX: false
  } as IRawPost;
};

const processMD = async (filenames: string[]): Promise<IRawPost[]> => {
  const result: IRawPost[] = [];
  for (const filename of filenames) {
    const processed = await processMDFile(filename);
    result.push(processed);
  }
  return result;
};

const processMDXFile = async (filename: string): Promise<IRawPost> => {
  const id = filename.replace(/\.(mdx)$/, '');
  const fileContents = getFile(filename);
  const { content, data } = matter(fileContents);

  const mdxSource = await serialize(content, {
    scope: data
  });

  return {
    id,
    content: mdxSource,
    contentText: getRawText(content),
    ...data,
    isMDX: true
  } as unknown as IRawPost;
};

const processMDX = async (filenames: string[]): Promise<IRawPost[]> => {
  const result: IRawPost[] = [];
  for (const filename of filenames) {
    const processed = await processMDXFile(filename);
    result.push(processed);
  }
  return result;
};

export const getSortedPostsData = async (): Promise<IPost[]> => {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const MD = /\.md$/;
  const MDX = /\.mdx$/;
  const mdNames = fileNames.filter((name) => MD.test(name));
  const mdxNames = fileNames.filter((name) => MDX.test(name));
  const mdPosts: IRawPost[] = await processMD(mdNames);
  const mdxPosts: IRawPost[] = await processMDX(mdxNames);

  return [...mdPosts, ...mdxPosts]
    .filter((p) => !p.draft)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      return -1;
    })
    .map(processPostContent);
};

interface IPostID {
  params: {
    id: string; // id is the name of the file in `posts` with `.md` removed
  };
}

export function getAllPostIds(): IPostID[] {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.(md|mdx)$/, '')
    }
  }));
}

export const getPostFromID = async (id: string): Promise<IRawPost> => {
  if (!fs.existsSync(path.join(POSTS_DIRECTORY, `${id}.md`))) {
    return processMDXFile(`${id}.mdx`);
  }
  return processMDFile(`${id}.md`);
};

export async function getPostData(id: string): Promise<IPost> {
  const post = await getPostFromID(id);
  return processPostContent(post);
}

function getRawText(markdown: string): string {
  const contentText = removeMd(markdown);
  return contentText.trim().replace(/\s+/gm, ' ');
}

function getExcerpt(markdown: string, maxExcerptLength = 200): string {
  const contentText = getRawText(markdown)
    .trim()
    .replace(/[\n\\]/gm, '');
  const excerpt = contentText.slice(0, maxExcerptLength);

  if (contentText.length > maxExcerptLength) {
    return `${excerpt}...`;
  }

  return excerpt;
}
