import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

import NewsletterForm from '@/components/NewsletterForm'
import IconChevronRight from '~icons/heroicons-outline/chevron-right.jsx'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
          <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block"></div>
          <div className="space-y-16">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <article className="relative group" key={slug}>
                  <div className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-50/70 dark:group-hover:bg-slate-800/50"></div>
                  {/* a dot */}
                  <svg
                    viewBox="0 0 9 9"
                    className="hidden absolute right-full mr-6 top-2 text-slate-200 dark:text-slate-600 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block"
                  >
                    <circle
                      cx="4.5"
                      cy="4.5"
                      r="4.5"
                      stroke="currentColor"
                      className="fill-white dark:fill-slate-900"
                      strokeWidth={2}
                    ></circle>
                  </svg>
                  <div className="relative">
                    <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 pt-8 lg:pt-0">
                      {title}
                    </h2>
                    <div className="flex flex-wrap sr-only">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>

                    <div className="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2">
                      <p> {summary}</p>
                    </div>
                    <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
                      <dt className="sr-only">Date</dt>
                      <dd className="whitespace-nowrap text-sm leading-6 text-slate-500 dark:text-slate-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                  </div>
                  {/* 链接 */}
                  <Link
                    href={`/blog/${slug}`}
                    className="flex items-center text-sm text-sky-500 font-medium"
                  >
                    <span className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl"></span>
                    <div className="inline-flex items-center z-10 h-9 rounded-full whitespace-nowrap px-3 text-sky-600 bg-sky-50 group-hover:bg-sky-100 group-hover:text-sky-700 focus:ring-sky-600 dark:bg-slate-700 dark:text-slate-100 dark:group-hover:bg-slate-600 dark:group-hover:text-white dark:focus:ring-slate-500">
                      Read more<span className="sr-only">, {title}</span>
                      <IconChevronRight className="overflow-visible  text-sky-300 group-hover:text-sky-400 dark:text-slate-500 dark:group-hover:text-slate-400" />
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            {/* FIXME */}
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
