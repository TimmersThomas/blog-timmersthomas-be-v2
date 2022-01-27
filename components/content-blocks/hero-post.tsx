import Avatar from "../generic/avatar";
import DateFormatter from "../generic/date-formatter";
import CoverImage from "../generic/cover-image";
import Link from "next/link";
import { PostPreview } from "../../@types/post";

const HeroPost = ({
  title,
  coverImage,
  coverImageMeta,
  date,
  excerpt,
  author,
  slug,
}: PostPreview) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} imageMeta={coverImageMeta} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h2 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h2>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>

          <div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
            {author && (<Avatar name={author.name} picture={author.picture} />)}
          </div>

      </div>
    </section>
  );
};

export default HeroPost;
