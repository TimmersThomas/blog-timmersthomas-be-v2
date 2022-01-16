import DateFormatter from "../generic/date-formatter";
import CoverImage from "../generic/cover-image";
import Link from "next/link";
import { PostPreview as PostPreviewType } from "../../@types/post";

type PostPreviewProps = {
  post: PostPreviewType;
};

const PostPreview = ({
  post: { coverImage, coverImageMeta, author, date, slug, title, excerpt },
}: PostPreviewProps) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          imageMeta={coverImageMeta}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  );
};

export default PostPreview;
