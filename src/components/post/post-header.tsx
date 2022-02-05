import { PostTitle } from "@/components/post/post-title";
import { Post } from "@/@types/post";
import { FC } from "react";
import { Avatar } from "@/components/generic/avatar";
import { CoverImage } from "@/components/generic/cover-image";
import { DateFormatter } from "@/components/generic/date-formatter";

type Props = Pick<
  Post,
  "title" | "coverImage" | "coverImageMeta" | "date" | "author"
>;

export const PostHeader: FC<Props> = ({
  title,
  coverImage,
  coverImageMeta,
  date,
  author,
}: Props) => (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage
          title={title}
          src={coverImage}
          imageMeta={coverImageMeta}
          priority
          zoom={false}
        />
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

export default PostHeader;
