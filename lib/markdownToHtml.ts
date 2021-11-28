// import { unified } from 'unified'
import {remark} from 'remark'
import html from 'remark-html'

// import rehypeStringify from 'rehype-stringify'

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    // .use(remarkParse)
    // .use(remarkRehype)
    // .use(rehypeDocument)
    // .use(rehypeFormat)
    // .use(rehypePrism, { showLineNumbers: true })
    // .use(remarkGfm)
    // .use(rehypeSlug)
    // .use(rehypeStringify)
    .use(html)
    .process(markdown)
  return result.toString()
}
