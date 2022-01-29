import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { ImageMeta } from "../../@types/post";
import TextLink from "./textLink";
import { ConditionalWrapper } from "./conditional-wrapper";

type Props = {
  imageMeta?: ImageMeta;
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug, imageMeta }: Props) => {
  return (
    <div className="sm:mx-0">
      <figure>
        <ConditionalWrapper
          condition={!!slug}
          wrap={(childeren) => (
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a aria-label={title}>{childeren}</a>
            </Link>
          )}
        >
          {!!imageMeta && !!imageMeta.size ? (
            <Image
              src={src}
              alt={`Cover Image for ${title} - next/image`}
              className={cn("shadow-small", {
                "hover:shadow-medium transition-shadow duration-200": slug,
              })}
              width={imageMeta.size.width}
              height={imageMeta.size.height}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={`Cover Image for ${title} - img`}
              className={cn("shadow-small", {
                "hover:shadow-medium transition-shadow duration-200": slug,
              })}
            />
          )}
        </ConditionalWrapper>
        {!!imageMeta && !!imageMeta.credits && (
          <figcaption className="mt-3 text-gray-700 text-sm text-center italic">
            Image
            {imageMeta.credits.createdByLink && (
              <>
                {" "}
                by{" "}
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
                {" "}
                from{" "}
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
          </figcaption>
        )}
      </figure>
    </div>
  );
};

export default CoverImage;
