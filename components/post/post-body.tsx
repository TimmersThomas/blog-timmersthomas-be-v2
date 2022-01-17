import markdownStyles from "../markdown/markdown-styles.module.css";
import ReactMarkdown from "react-markdown";
import { rehypePlugins, remarkPlugins } from "../../lib/markdownToHtml";
import { MarkdownPostCode } from "../markdown/markdown-post-code";
import { MarkdownPostImage } from "../markdown/markdown-post-image";
import { Post } from "../../@types/post";

type Props = Pick<Post, "content">;
const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown
        components={{
          code: MarkdownPostCode,
          img: MarkdownPostImage,
        }}
        className={markdownStyles["markdown"]}
        rehypePlugins={rehypePlugins}
        remarkPlugins={remarkPlugins}>{content}</ReactMarkdown>
    </div>
  );
};

export default PostBody;
