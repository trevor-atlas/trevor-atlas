import ogs from 'open-graph-scraper';
import path from 'path';
import { isNone, isSome } from 'src/utils/helpers';
import { Blogpost, walkMarkdocAst } from './posts';
import { readFile, writeFile } from 'fs';
import util from 'util';
import { isOgLinkNode } from './typeguards';
import { Nullable } from 'src/types';
const readFileAsync = util.promisify(readFile);
const writeFileAsync = util.promisify(writeFile);

export const CACHE_DIRECTORY = path.join(process.cwd(), 'public', 'cache');
export const CACHE_FILE = path.join(CACHE_DIRECTORY, 'opengraph.json');

export interface OpenGraphEntry {
  generationDate: number;
  ogTitle: string;
  ogDescription: string;
  ogImage: Nullable<{
    url: string;
    width: number;
    height: number;
    type: string;
  }>;
  ogUrl: string;
}

export interface OpenGraphResult {
  ogTitle: string;
  ogType: string;
  ogUrl: string;
  ogDescription: string;
  ogImage: Nullable<{
    url: string;
    width: number;
    height: number;
    type: string;
  }>;
  twitterImage: Nullable<{
    url: string;
    width: number;
    height: number;
    type: string;
  }>;
  twitterTitle: string;
  twitterDescription: string;
  requestUrl: string;
  success: boolean;
}

export type OGMap = Record<string, OpenGraphEntry | null>;

export function getAllPostOpengraphLinks(post: Blogpost) {
  const links: string[] = [];

  walkMarkdocAst(post.contentReactAst, (node) => {
    if (isOgLinkNode(node)) {
      links.push(node.attributes.url);
    }
  });
  return links;
}

export async function getOpenGraphData(
  url: string
): Promise<OpenGraphEntry | null> {
  try {
    const { error, result } = await ogs({ url, downloadLimit: 10000000 });
    if (error) throw result;
    const {
      ogTitle,
      ogDescription,
      ogUrl,
      ogImage,
      twitterImage,
      twitterTitle
    } = result as OpenGraphResult;
    return {
      generationDate: Date.now(),
      ogTitle: ogTitle || twitterTitle,
      ogImage: (ogImage || twitterImage) ?? null,
      ogDescription: ogDescription,
      ogUrl
    };
  } catch (e) {
    console.log('error fetching opengraph for', url, e);
    return null;
  }
}

export async function getOpenGraphDataForLinks(links: string[]) {
  const ogMap: OGMap = {};
  for (const link of links) {
    const result = await getOpenGraphData(link);
    if (result) {
      ogMap[link] = result;
    }
  }
  return ogMap;
}

// ~30 days
const MAX_AGE_DIFFERENCE = 1000 * 60 * 60 * 24 * 30;

async function getOpenGraphDataFromCache(
  post: Blogpost,
  links: string[],
  cache: Record<Blogpost['slug'], OGMap>
): Promise<OGMap | null> {
  if (isNone(cache[post.slug]) || isNone(post)) {
    console.error('no cache found for', post.slug);
    return null;
  }
  const ogMap = cache[post.slug];
  if (isNone(ogMap)) {
    console.error('no cache found for', post.slug);
    return null;
  }
  for (const link of links) {
    if (!(link in ogMap)) {
      // if we don't have a cache value for a link, we need to generate it
      console.error('cache is missing a link for', post.slug, link);
      return null;
    }

    // if we have a cache value for a link, but it is null because the link is bad - skip it.
    if (isNone(ogMap[link])) {
      continue;
    }

    // @ts-expect-error TS is too dumb to understand this can't be null by this point
    if (Date.now() - ogMap[link].generationDate > MAX_AGE_DIFFERENCE) {
      // if the cache value is too old, we need to regenerate it
      console.error('cache entry is stale for', post.slug, ogMap[link]);
      return null;
    }
  }
  return ogMap;
}

export async function getOpengraphDataForPost(post: Blogpost): Promise<OGMap> {
  const cache = JSON.parse((await readFileAsync(CACHE_FILE)).toString());
  const links = getAllPostOpengraphLinks(post);

  if (links.length === 0) {
    console.log('no OgLinks found for', post.slug);
    return {};
  }

  const cachedPostValue = await getOpenGraphDataFromCache(post, links, cache);
  if (isSome(cachedPostValue)) {
    console.log('using cached OG data for', post.slug);
    return cachedPostValue;
  }

  console.log('generating OG data for', post.slug);
  // if we don't have a cache value, we need to generate it
  const ogMap = await getOpenGraphDataForLinks(links);
  for (const [key, value] of Object.entries(ogMap)) {
    if (isNone(value)) {
      console.log(`skipping OG data for "${key}" because it is null`);
      ogMap[key] = null;
      continue;
    }
    if (isNone(value.ogImage) || isNone(value.ogTitle)) {
      console.log(`skipping OG data for "${key}" because it is missing data`);
      ogMap[key] = null;
      continue;
    }
    console.log(`caching OG data for "${key}"`);
    ogMap[key] = value;
  }
  cache[post.slug] = ogMap;
  await writeFileAsync(CACHE_FILE, JSON.stringify(cache));
  return ogMap;
}
