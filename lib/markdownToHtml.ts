import { unified } from 'unified'
import rehypeStringify from 'rehype-stringify'

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    // .use(remarkParse)
    // .use(remarkRehype)
    // .use(rehypeDocument)
    // .use(rehypeFormat)
    // .use(rehypePrism, { showLineNumbers: true })
    // .use(remarkGfm)
    // .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown)
  return result.toString()
}
