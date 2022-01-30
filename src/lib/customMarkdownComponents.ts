import { ComponentType } from 'react'
import { PostCodeBlock, PostCodeBlockComponentName, PostCodeBlockMarkdownName } from '@/components/markdown/post-code-block';
import { PostImage, PostImageComponentName, PostImageMarkdownName } from '@/components/markdown/post-image'

type customMarkdownComponentsType = { markdownName: string, reactName: string, component: ComponentType };
const customMarkdownComponents: customMarkdownComponentsType[] = [
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

export const getCustomRehypeComponents: () => Record<string, ComponentType> = () => {
  return customMarkdownComponents.reduce((acc, item) => {
    return {
      ...acc,
      [item.markdownName]: item.component
    }
  }, {});
}

export const getCustomReactComponents: () => Record<string, ComponentType> = () => {
  return customMarkdownComponents.reduce((acc, item) => {
    return {
      ...acc,
      [item.reactName]: item.component
    }
  }, {});
}