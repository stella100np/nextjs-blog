import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import IconHashtag from '~icons/heroicons-outline/hashtag.jsx'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className=" inline-flex items-center mr-3 text-sm font-medium uppercase  text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        <IconHashtag />
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
