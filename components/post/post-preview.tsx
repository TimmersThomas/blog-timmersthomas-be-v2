import Avatar from "../generic/avatar";
import DateFormatter from "../generic/date-formatter";
import CoverImage from "../generic/cover-image";
import Link from "next/link";
import { PostPreview as PostPreviewType } from "../../@types/post";

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: PostPreviewType) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
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
      {author && <Avatar name={author.name} picture={author.picture} />}
    </div>
  );
};

export default PostPreview;
