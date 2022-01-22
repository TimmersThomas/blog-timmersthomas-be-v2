import { ComponentType } from 'react'
import { PostImage, PostImageComponentName, PostImageMarkdownName } from '../components/markdown/post-image'

type customMarkdownComponentsType = { markdownName: string, reactName: string, component: ComponentType };
const customMarkdownComponents: customMarkdownComponentsType[] = [
  {
    markdownName: PostImageMarkdownName,
    reactName: PostImageComponentName,
    component: PostImage
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