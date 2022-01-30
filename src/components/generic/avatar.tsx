import { Author } from "@/@types/post"
import Image from "next/image";
import { FC } from "react";

export const Avatar: FC<Author> = ({ name, picture }: Author) => {
  return (
    <div className="flex items-center">
      <Image src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} width={100} height={100} layout="responsive" />
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}
