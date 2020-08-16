import fs from 'fs';
import { IReadTime, readingTime } from './read-time';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import removeMd from 'remove-markdown';
import highlight from 'remark-highlight.js';
const postsDirectory = path.join(process.cwd(), 'posts');

export interface IPost {
	id: string;
	content: string; // '<h1>Hello world!</h1>',
	date: number;
	title: string;
	slug: string;
	categories: string[];
	featuredImage: string;
	thumbnail: string;
	contentHtml: string;
	contentText: string;
	excerpt: string;
	readTime: IReadTime;
}

export const processPostContent = (post: any): IPost => {
	post.date = new Date(post.date).getTime();
	post.excerpt = getExcerpt(post.content);
	post.contentText = getRawText(post.content);
	post.readTime = readingTime(post.contentText);
	if (post.featured_image) {
		post.featuredImage = post.featured_image;
	}
	return post;
};

export function getSortedPostsData(): IPost[] {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, '');

		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const matterResult = matter(fileContents);

		return {
			id,
			content: matterResult.content,
			contentText: getRawText(matterResult.content),
			...matterResult.data
		};
	});

	return allPostsData
		.sort((a, b) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (a.date < b.date) {
				return 1;
			} else {
				return -1;
			}
		})
		.map(processPostContent);
}

interface IPostID {
	params: {
		id: string; // id is the name of the file in `posts` with `.md` removed
	};
}

export function getAllPostIds(): IPostID[] {
	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, '')
			}
		};
	});
}

export async function getPostData(id: string): Promise<IPost> {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	const processedContent = await remark()
		.use(html)
		.use(highlight)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();

	// Combine the data with the id
	return processPostContent({
		id,
		contentHtml,
		contentText: getRawText(matterResult.content),
		content: matterResult.content,
		...matterResult.data
	});
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
		return excerpt + '...';
	}

	return excerpt;
}
