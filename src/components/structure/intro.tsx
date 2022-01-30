import { FC } from "react";
import {TextLink} from "@/components/generic/textLink";

export const Intro: FC = () => {
  return (
    <section>
      <h1 className="flex-col md:flex-row flex-wrap	 flex items-baseline content-end md:justify-between mt-16 mb-16 md:mb-12">
        <span className="text-center md:text-left text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 w-full md:w-auto">
          Just a simple{" "}
          <span className="text-3xl italic">&apos;tech&apos;</span> blog
        </span>
        <span className="text-center md:text-right text-lg md:pl-8 w-full md:w-auto">
          by{" "}
          <TextLink
            href="https://timmersthomas.be"
            target="_blank"
            rel="noopener"
          >
            Timmers Thomas
          </TextLink>
        </span>
      </h1>
    </section>
  );
};