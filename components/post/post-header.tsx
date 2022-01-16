import Avatar from "../generic/avatar";
import DateFormatter from "../generic/date-formatter";
import CoverImage from "../generic/cover-image";
import PostTitle from "./post-title";
import { Post } from "../../@types/post";

type Props = Pick<
  Post,
  "title" | "coverImage" | "coverImageMeta" | "date" | "author"
>;

const PostHeader = ({ title, coverImage, coverImageMeta, date, author }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} imageMeta={coverImageMeta} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export default PostHeader;
