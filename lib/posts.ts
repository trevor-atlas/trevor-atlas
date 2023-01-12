import { readFile, readdir } from 'fs';
import util from 'util';
import path from 'path';
import { getReadingTime, IReadTime } from './read-time';
import Markdoc, {
  Node,
  RenderableTreeNode,
  RenderableTreeNodes,
  Tag
} from '@markdoc/markdoc';
import markdocConfig from './markdocConfig';
// @ts-expect-error no types
import yaml from 'js-yaml';
import { getOpengraphDataForPost, OGMap } from './opengraph-scraper';
import { isOgLinkNode, isTagNode } from './typeguards';

const readdirAsync = util.promisify(readdir);
const readFileAsync = util.promisify(readFile);

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');

export interface IRawPost {
  slug: string;
  filename: string;
  content: Node;
}

export interface SerializableBlogpost
  extends Omit<Blogpost, 'contentReactAst'> {
  contentReactAst: string;
}

export interface Blogpost {
  draft: boolean;
  date: number;
  title: string;
  slug: string;
  filename: string;
  tags: string[];
  featuredImage: string;
  contentReactAst: RenderableTreeNodes;
  excerpt: string;
  readTime: IReadTime;
}

export function getSerializablePost(post: Blogpost): SerializableBlogpost {
  return {
    ...post,
    contentReactAst: post.contentReactAst
      ? JSON.stringify(post.contentReactAst)
      : '{}'
  };
}

export function walkMarkdocAst(
  nodes: RenderableTreeNodes,
  callback: (childNode: RenderableTreeNode) => void
) {
  if (!nodes) return;
  if (Array.isArray(nodes)) {
    for (const child of nodes) {
      walkMarkdocAst(child, callback);
    }
    return;
  }
  callback(nodes);
  if (isTagNode(nodes)) {
    for (const child of nodes.children) {
      walkMarkdocAst(child, callback);
    }
  }
}

function getExcerpt(text: string, maxExcerptLength = 140): string {
  const contentText = text.trim().replace(/[\n]{2,}/gm, '');
  const excerpt = contentText.split(/\s/).reduce((acc, word) => {
    if (acc.length + word.length < maxExcerptLength) {
      return `${acc} ${word}`;
    }
    return acc;
  }, '');

  return `${excerpt}...`;
}

async function getFileContents(filename: string) {
  const fullPath = path.join(POSTS_DIRECTORY, filename);
  return readFileAsync(fullPath, 'utf8');
}

function flattenPostContentToText(
  text: { content: string },
  children: any[]
): string {
  for (const child of children) {
    if (typeof child === 'string') {
      text.content += `\n${child}`;
    } else {
      flattenPostContentToText(text, child.children);
    }
  }
  return text.content;
}

export async function processPostContent({
  slug,
  content,
  filename
}: IRawPost): Promise<Blogpost> {
  const frontmatter = content.attributes.frontmatter
    ? yaml.load(content.attributes.frontmatter)
    : {};
  const { title, date, tags, draft, banner, excerpt } = frontmatter;
  markdocConfig.setVariable('frontmatter', frontmatter);
  const contentReactAst = markdocConfig.transform(content);
  let text = '';
  walkMarkdocAst(contentReactAst, (node) => {
    if (isTagNode(node)) {
      return;
    }
    text += node;
  });

  const readTime = getReadingTime(text);

  return {
    slug,
    filename,
    title,
    contentReactAst,
    tags: tags ?? [],
    draft: Boolean(draft),
    date: new Date(date).getTime(),
    excerpt: excerpt ?? getExcerpt(text),
    readTime,
    featuredImage: banner ?? null
  };
}

const SUPPORTED_EXTENSIONS = ['md'];
const VALID_POST_FILETYPES = SUPPORTED_EXTENSIONS.map(
  (str) => new RegExp(`\.${str}$`)
);

async function getPostsFileNames() {
  const filenames = await readdirAsync(POSTS_DIRECTORY);
  return filenames.filter((filename) =>
    VALID_POST_FILETYPES.every((regex) => regex.test(filename))
  );
}

const getSlugFromFilename = (filename: string) => {
  const extension = path.extname(filename);
  return filename.replace(extension, '');
};

async function parseMDFile(filename: string): Promise<IRawPost> {
  const file = await getFileContents(filename);

  return {
    slug: getSlugFromFilename(filename),
    filename,
    content: markdocConfig.parse(file)
  };
}

export const getSortedPostsData = async (): Promise<Blogpost[]> => {
  const filenames = await getPostsFileNames();
  const parsedMDFiles = await Promise.all(filenames.map(parseMDFile));
  const posts = await Promise.all(parsedMDFiles.map(processPostContent));

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      return -1;
    })
    .map(getSerializablePost);
};

interface IPostID {
  params: {
    id: string; // id is the name of the file in `posts` with `.md` removed
  };
}

export async function getAllPostIds(): Promise<IPostID[]> {
  const filenames = await getPostsFileNames();
  return filenames.map((fileName) => ({
    params: {
      id: getSlugFromFilename(fileName)
    }
  }));
}

export async function getPostData(slug: string): Promise<Blogpost> {
  const filenames = await getPostsFileNames();
  const filename = filenames.find(
    (filename) => getSlugFromFilename(filename) === slug
  );
  const markdoc = await parseMDFile(filename!);
  const post = await processPostContent(markdoc);
  const opengraph = await getOpengraphDataForPost(post);

  // this isn't working for some reason, maybe here, maybe in the markdoc configurator :shrug:
  walkMarkdocAst(post.contentReactAst, (node) => {
    if (isOgLinkNode(node)) {
      const url = node.attributes.url;
      const ogData = opengraph[url];
      if (ogData) {
        node.attributes.ogData = ogData;
      }
    }
  });

  return getSerializablePost(post);
}
