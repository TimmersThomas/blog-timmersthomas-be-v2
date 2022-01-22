import markdownStyles from "../markdown/markdown-styles.module.css";
import { ReactElement } from "react";

type Props<T = unknown> = {
  content: ReactElement<T> | string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles["markdown"]}>{content}</div>
    </div>
  );
};

export default PostBody;
