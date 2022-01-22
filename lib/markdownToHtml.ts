import { Preset, unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
// import rehypeShiki from "@leafac/rehype-shiki";
import rehypeReact from "rehype-react";
import { createElement } from 'react'
import {getCustomRehypeComponents} from "./customMarkdownComponents";
// import rehypeHighlight from 'rehype-highlight';
// import highlightTs from 'highlight.js/lib/languages/typescript'
// import highlightJs from 'highlight.js/lib/languages/javascript'
// import highlightJson from 'highlight.js/lib/languages/json'
// import highlightScss from 'highlight.js/lib/languages/scss'
// import highlightBash from 'highlight.js/lib/languages/bash'
// import highlightYaml from 'highlight.js/lib/languages/yaml'
// import { LanguageFn } from 'highlight.js'




const rehypePlugins: Preset[] = [
  {
    plugins: [rehypeSlug]
  },
  {
    plugins: [rehypeFormat]
  }
]

const remarkPlugins: Preset[] = [
  {
    plugins: [remarkGfm]
  },
]

export const parseMarkdownToHtml = async (markdown: string) => {
  const engine = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    // .use(rehypeShiki, { highlighter: await getHighlighter({ theme: "light-plus" }) });

  rehypePlugins.forEach(engine.use);
  remarkPlugins.forEach(engine.use);

  // engine.use(rehypeReact, {
  //   createElement: createElement,
  //   Fragment: Fragment,
  //   components: {
  //     img: PostImage
  //   }

  // })

  engine.use(rehypeReact, {
    createElement: createElement,
    components: getCustomRehypeComponents()
  })

  return engine.processSync(markdown);
}