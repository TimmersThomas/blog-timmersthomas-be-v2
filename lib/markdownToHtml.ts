import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypePrism from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

import html from 'remark-html'

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypePrism, { showLineNumbers: true })
    .use(remarkGfm)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown)
  return result.toString()
}
