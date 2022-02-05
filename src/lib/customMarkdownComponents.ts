import { ComponentType } from 'react'
import { PostCodeBlock, PostCodeBlockComponentName, PostCodeBlockMarkdownName } from '@/components/markdown/post-code-block';
import { PostImage, PostImageComponentName, PostImageMarkdownName } from '@/components/markdown/post-image'

type CustomMarkdownComponentsType = { markdownName: string, reactName: string, component: ComponentType };
const customMarkdownComponents: CustomMarkdownComponentsType[] = [
  {
    markdownName: PostImageMarkdownName,
    reactName: PostImageComponentName,
    component: PostImage
  },
  {
    markdownName: PostCodeBlockMarkdownName,
    reactName: PostCodeBlockComponentName,
    component: PostCodeBlock
  }
];

export const getCustomRehypeComponents: () => Record<string, ComponentType> = () => customMarkdownComponents.reduce((acc, item) => ({
      ...acc,
      [item.markdownName]: item.component
    }), {})

export const getCustomReactComponents: () => Record<string, ComponentType> = () => customMarkdownComponents.reduce((acc, item) => ({
      ...acc,
      [item.reactName]: item.component
    }), {})