import cn from 'classnames'
import Link from 'next/link'
import { ImageMeta } from '../../@types/post'
import TextLink from './textLink'

type Props = {
  imageMeta?: ImageMeta
  title: string
  src: string
  slug?: string
}

const CoverImage = ({ title, src, slug, imageMeta }: Props) => {
  const imageCaption = (
    !!imageMeta && !!imageMeta.credits ?
    <figcaption className='mt-3 text-gray-700 text-sm text-center italic'>
      Image
      {imageMeta.credits.createdByLink ?
        <> by <TextLink  href={imageMeta.credits.createdByLink} target='_blank' rel='noopener'>{imageMeta.credits.createdByName || imageMeta.credits.createdByLink}</TextLink></>
      : null}
      {imageMeta.credits.serviceLink ?
        <> from <TextLink href={imageMeta.credits.serviceLink} target='_blank' rel='noopener'>{imageMeta.credits.serviceName || imageMeta.credits.serviceLink}</TextLink></>
      : null}
    </figcaption> : null
  );

  const image = (
    <figure>
      <img
        src={src}
        alt={`Cover Image for ${title}`}
        className={cn('shadow-small', {
          'hover:shadow-medium transition-shadow duration-200': slug,
        })}
      />
      {imageCaption}
    </figure>
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
