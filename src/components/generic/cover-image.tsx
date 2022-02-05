import cn from 'classnames'
import Link from 'next/link'
import NextImage from 'next/image'
import Zoom from 'react-medium-image-zoom'
import { ImageMeta } from '@/@types/post'
import { TextLink } from '@/components/generic/textLink'
import { ConditionalWrapper } from '@/components/generic/conditional-wrapper'
import { FC } from 'react'

export const CoverImage: FC<{
  imageMeta?: ImageMeta
  title: string
  src: string
  alt?: string
  slug?: string
  priority: boolean
  zoom: boolean
}> = ({
  title,
  src,
  alt,
  slug,
  imageMeta,
  priority = false,
  zoom = false,
}) => (
  <div className="sm:mx-0">
    <figure>
      <ConditionalWrapper
        condition={!!slug}
        renderWrapper={(children) => (
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a aria-label={title}>{children}</a>
          </Link>
        )}
      >
        <ConditionalWrapper
          condition={zoom}
          renderWrapper={(children) => <Zoom>{children}</Zoom>}
        >
          {!!imageMeta && !!imageMeta.size ? (
            <NextImage
              src={src}
              alt={`${title}`}
              className={cn('shadow-small', {
                'hover:shadow-medium transition-shadow duration-200': slug,
              })}
              width={imageMeta.size.width}
              height={imageMeta.size.height}
              priority={priority}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={`${title}`}
              className={cn('shadow-small', {
                'hover:shadow-medium transition-shadow duration-200': slug,
              })}
            />
          )}
        </ConditionalWrapper>
      </ConditionalWrapper>
      {(!!alt || (!!imageMeta && !!imageMeta.credits)) && (
        <figcaption className="mt-3 text-gray-700 text-sm text-center italic">
          {!!alt && (
            <>
              {alt} <br />
            </>
          )}
          {!!imageMeta && !!imageMeta.credits && (
            <>
              Credits: image
              {imageMeta.credits.createdByLink && (
                <>
                  {' '}
                  by{' '}
                  <TextLink
                    href={imageMeta.credits.createdByLink}
                    target="_blank"
                    rel="noopener"
                  >
                    {imageMeta.credits.createdByName ||
                      imageMeta.credits.createdByLink}
                  </TextLink>
                </>
              )}
              {imageMeta.credits.serviceLink && (
                <>
                  {' '}
                  from{' '}
                  <TextLink
                    href={imageMeta.credits.serviceLink}
                    target="_blank"
                    rel="noopener"
                  >
                    {imageMeta.credits.serviceName ||
                      imageMeta.credits.serviceLink}
                  </TextLink>
                </>
              )}
            </>
          )}
        </figcaption>
      )}
    </figure>
  </div>
)
