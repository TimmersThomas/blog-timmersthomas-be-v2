import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

export const rehypePlugins: [() => void,Record<string, Boolean|string|Number> | undefined][] = [
  [rehypeSlug, undefined],
  [rehypeFormat, undefined]
]
export const remarkPlugins: [() => void,Record<string, Boolean|string|Number> | undefined][] = [
  [remarkGfm, undefined]
]

export const parseMarkdownToHtml = async (markdown: string) => {
  const engine = await unified()
    .use(remarkParse)
    .use(remarkRehype);

  rehypePlugins.forEach(([plugin, options]) => {
    if (options !== undefined){
      engine.use<Record<string,Boolean|string|Number>[]> (plugin, {
        ...options
      });
    } else {
      engine.use(plugin);
    }
  });

  remarkPlugins.forEach(([plugin, options]) => {
    if (options !== undefined){
      engine.use<Record<string,Boolean|string|Number>[]> (plugin, {
        ...options
      });
    } else {
      engine.use(plugin);
    }
  });

  // engine.use(rehypeReact, {
  //   createElement: createElement,
  //   Fragment: Fragment,
  //   components: {
  //     img: PostImage
  //   }

  // })
  engine.use(rehypeStringify)

  return await engine.process(markdown);
}