import markdownStyles from "@/components/markdown/markdown-styles.module.css";
import { FC, ReactElement } from "react";

type Props<T = unknown> = {
  content: ReactElement<T> | string;
};

export const PostBody: FC<Props< unknown>> = ({ content }: Props) => (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles.markdown}>{content}</div>
    </div>
  );