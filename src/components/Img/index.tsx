import NoImage from "@src/assets/images/no-image.svg";
import { ReactEventHandler } from "react";

interface PropType {
  src: string;
  alt?: string;
  size: number;
  className?: string;
  ratio:
    | [1, 1]
    | [5, 4]
    | [4, 3]
    | [3, 2]
    | [16, 10]
    | [1.618, 1]
    | [16, 9]
    | [2, 1]
    | [21, 9]
    | [6, 7]
    | [5, 2]
    | [8, 3]
    | [3, 1]
    | [16, 5]
    | [1.618, 0.5]
    | [32, 9]
    | [4, 1]
    | [42, 9]
    | [9, 8]
    | [2, 1.618]
    | [4, 5]
    | [3, 4]
    | [2, 3]
    | [10, 16]
    | [1, 1.618]
    | [9, 16]
    | [1, 2]
    | [9, 21];
}

export default function Img({ src, alt, ratio, size, className }: PropType) {
  const handleError: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = NoImage;
  };

  return (
    <div
      style={{
        height: size,
        width: (size * ratio[0]) / ratio[1],
      }}
      className={`overflow-clip relative flex items-center justify-center bg-opacity-80 ${className}`}
    >
      <img
        src={src || NoImage}
        alt={alt}
        className="object-cover w-full h-full"
        loading="lazy"
        onError={handleError}
      />
    </div>
  );
}
