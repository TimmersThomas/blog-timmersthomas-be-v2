import { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const MarkdownPostCode: Components["code"] = (props) => {
  const match = /language-(\w+)/.exec(props.className || "");
  return !props.inline && match ? (
    <SyntaxHighlighter
      style={vscDarkPlus}
      showLineNumbers
      wrapLines
      wrapLongLines
      language={match[1]}
      PreTag="div"
    >
      {props.children}
    </SyntaxHighlighter>
  ) : (
    <code className={props.className} {...props}>
      {props.children}
    </code>
  );
};
