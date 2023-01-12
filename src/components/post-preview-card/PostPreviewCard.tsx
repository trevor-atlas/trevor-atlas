import { Blogpost } from 'lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import { Tags } from '../tags/Tags';

export function PostPreviewCard(props: Blogpost) {
  return (
    <div className="mb-8 group overflow-hidden relative mx-auto drop-shadow-xl ring-1 ring-black/5 rounded-xl flex items-center gap-6 dark:bg-slate-800 dark:highlight-white/5">
      <Link href="/blog/[id]" as={`/blog/${props.slug}`}>
        <div className="opacity-40 absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-slate-700 group-hover:animate-shine" />
        <div className="relative z-10 flex items-center">
          {props.featuredImage ? (
            <Image
              width={250}
              height={250}
              className="p-2 mr-4 w-28 h-28 z-0 rounded-full shadow-lg"
              src={props.featuredImage}
              alt={props.slug}
            />
          ) : null}
          <div className="min-w-0 py-4 pr-5">
            <h5
              title={props.title}
              className="mt-0 mb-2 text-base truncate text-slate-300"
            >
              {props.title}
            </h5>
            <p
              className="text-slate-500 m-0 text-xs leading-tight dark:text-slate-400"
              style={{ fontSize: '.8rem' }}
            >
              {props.excerpt}
            </p>
            <div className="flex flex-row justify-between items-center mt-3 mx-0">
              <Tags tags={props.tags} />
              <small className="m-0 muted text-xs tracking-tighter">
                {props.readTime.text}
              </small>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
