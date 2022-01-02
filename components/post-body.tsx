import markdownStyles from "./markdown-styles.module.css";
import ReactMarkdown from 'react-markdown'
import { rehypePlugins, remarkPlugins } from '../lib/markdownToHtml'
import { MarkdownPostCode } from "./markdown-post-code";
import { MarkdownPostImage } from "./markdown-post-image";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {

  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown
        components={{
          code: MarkdownPostCode,
          img: MarkdownPostImage
        }}
        className={markdownStyles["markdown"]}
        rehypePlugins={rehypePlugins}
        remarkPlugins={remarkPlugins}
        children={content}

      />
    </div>
  );
};

export default PostBody;
