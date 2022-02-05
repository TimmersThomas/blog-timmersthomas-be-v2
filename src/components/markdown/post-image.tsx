import { ImageMeta, ImageMetaCredits } from '@/@types/post'
import { isDefined } from '@/@types/typeguards'
import { FC } from 'react'
import { CoverImage } from '../generic/cover-image'

export const PostImageMarkdownName = 'img'
export const PostImageComponentName = 'PostImage'

const metaCreditMatcher = (
  target: ImageMeta,
  key: keyof ImageMetaCredits,
  alt: string,
  regexMatcher: RegExp
) => {
  const updatedTarget = { ...target }
  const valueMatcher = alt.toLowerCase().match(regexMatcher)

  if (isDefined(valueMatcher) && isDefined(valueMatcher[1])) {
    let {credits} = target;
    if (!isDefined(credits)) {
      credits = {}
    }

    // eslint-disable-next-line prefer-destructuring
    credits[key] = valueMatcher[1];
  }

  return updatedTarget
}
export const PostImage: FC<JSX.IntrinsicElements['img']> = ({ src, alt }) => {
  if (src === undefined) {
    return <span />;
  }

  const cleanAlt = alt?.replace(/ *\{[^)]*\} */g, '')
  const enableZoom = alt?.toLowerCase().includes('{zoomable}')
  const isPriority = alt?.toLowerCase().includes('{priority}')
  const metaWidth = alt?.match(/{([^}]+)x/)
  const metaHeight = alt?.match(/x([^}]+)}/)
  const imageMeta: ImageMeta = {
    size: {
      height: metaHeight ? Number(metaHeight[1]) : 432,
      width: metaWidth ? Number(metaWidth[1]) : 768,
    },
  }

  if (isDefined(alt)) {
    metaCreditMatcher(
      imageMeta,
      'serviceName',
      alt,
      /{credits_service_name=([^}]+)}/
    )
    metaCreditMatcher(
      imageMeta,
      'serviceLink',
      alt,
      /{credits_service_link=([^}]+)}/
    )
    metaCreditMatcher(
      imageMeta,
      'createdByName',
      alt,
      /{credits_created_by_name=([^}]+)}/
    )
    metaCreditMatcher(
      imageMeta,
      'createdByLink',
      alt,
      /{credits_created_by_link=([^}]+)}/
    )
  }

  return (
    <span className="sm:mx-0">
      <CoverImage
        src={src}
        title={cleanAlt || ''}
        alt={cleanAlt}
        imageMeta={imageMeta}
        priority={isPriority || false}
        zoom={enableZoom || false}
      />
    </span>
  )
}
