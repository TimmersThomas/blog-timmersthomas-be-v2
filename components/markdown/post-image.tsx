import Image from "next/image";
import { ElementType, FC } from "react";
import Zoom from "react-medium-image-zoom";

export const PostImageMarkdownName = "img";
export const PostImageComponentName = "PostImage";

export const PostImage: FC<JSX.IntrinsicElements["img"]> = ({ src, alt }) => {
  if (src === undefined) {
    return <></>;
  }
  const cleanAlt = alt?.replace(/ *\{[^)]*\} */g, "");
  const isPriority = alt?.toLowerCase().includes("{priority}");
  const enableZoom = alt?.toLowerCase().includes("{zoomable}");
  const metaWidth = alt?.match(/{([^}]+)x/);
  const metaHeight = alt?.match(/x([^}]+)}/);
  const width = metaWidth ? metaWidth[1] : "768";
  const height = metaHeight ? metaHeight[1] : "432";

  const image = (
    <Image
      src={src}
      alt={cleanAlt}
      className={"shadow-small"}
      width={width}
      height={height}
      priority={isPriority}
    />
  );

  return (
    <span className="sm:mx-0">
      {enableZoom ? (
      <Zoom>
        {image}
      </Zoom>
      ): image}
    </span>
  );
};
