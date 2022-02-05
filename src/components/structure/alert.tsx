import {Container} from "@/components/structure/container";
import cn from "classnames";
import { TextLink } from "@/components/generic/textLink";

type Props = {
  preview?: boolean;
};

export const Alert = ({ preview }: Props) => (
    <div
      className={cn("border-b", {
        "bg-accent-7 border-accent-7 text-white": preview,
        "bg-accent-1 border-accent-2": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{" "}
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                Click here
              </a>{" "}
              to exit preview mode.
            </>
          ) : (
            <>
              Do you see something incorrect in a post? Create an issue or PR{" "}
              <TextLink
                href="https://github.com/TimmersThomas/blog-timmersthomas-be-v2"
                target="_blank"
                rel="noopener"
              >
                on GitHub
              </TextLink>
              .
            </>
          )}
        </div>
      </Container>
    </div>
  )
