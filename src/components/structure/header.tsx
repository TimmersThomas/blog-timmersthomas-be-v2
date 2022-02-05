import Link from "next/link";
import { FC } from "react";

export const Header: FC = () => (
    <h2 className="text-center md:text-left text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/">
        <a className="hover:underline">
          Just a simple <span className="text-2xl italic">&apos;tech&apos;</span> blog
        </a>
      </Link>
      .
    </h2>
  );

export default Header;
