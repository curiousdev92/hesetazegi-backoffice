interface PropType {
  src: string;
  alt?: string;
  height: number;
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
export default function Img({ src, alt, ratio, height, className }: PropType) {
  //   const paddingBottom = `${(1 / (ratio[0] / ratio[1])) * width}px`;

  return (
    <div
      style={{
        height: height,
        width: (height * ratio[0]) / ratio[1],
      }}
      className={`overflow-clip relative flex items-center justify-center ${
        !src ? "bg-system-black" : ""
      } bg-opacity-80 ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      ) : (
        <span className="absolute h-[200%] w-0.5 bg-border-primary rotate-45 origin-center"></span>
      )}
    </div>
  );
}
