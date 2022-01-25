import { createElement } from 'react'
import { getCustomRehypeComponents } from "./customMarkdownComponents";

import { Preset, unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeReact from "rehype-react";
import rehypePrismGenerator from 'rehype-prism-plus/generator';
import { refractor } from 'refractor/lib/core';

import refactorLangTypescript from 'refractor/lang/typescript';
import refactorLangBash from 'refractor/lang/bash';
import refactorLangJavascript from 'refractor/lang/javascript';
import refactorLangJson from 'refractor/lang/json';
import refactorLangJsx from 'refractor/lang/jsx';
import refactorLangCss from 'refractor/lang/css';
import refactorLangSass from 'refractor/lang/sass';
import refactorLangScss from 'refractor/lang/scss';
import refactorLangMarkup from 'refractor/lang/markup';
import refactorLangYaml from 'refractor/lang/yaml';

refractor.register(refactorLangTypescript);
refractor.register(refactorLangBash);
refractor.register(refactorLangJavascript);
refractor.register(refactorLangJson);
refractor.register(refactorLangJsx);
refractor.register(refactorLangCss);
refractor.register(refactorLangSass);
refractor.register(refactorLangScss);
refractor.register(refactorLangMarkup);
refractor.register(refactorLangYaml);

const rehypePlugins: Preset[] = [
  {
    plugins: [rehypeSlug]
  },
  {
    plugins: [rehypeFormat]
  },
  {
    plugins: [rehypePrismGenerator(refractor)]
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
    .use(remarkRehype);

  rehypePlugins.forEach(engine.use);
  remarkPlugins.forEach(engine.use);

  engine.use(rehypeReact, {
    createElement: createElement,
    components: getCustomRehypeComponents()
  })

  return engine.process(markdown);
}