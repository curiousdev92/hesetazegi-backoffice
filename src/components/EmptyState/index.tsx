import Img from "../Img";

interface PropType {
  size: "s" | "m" | "l" | "xl";
  imgSrc?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  className?: string;
}

export default function EmptyState({
  size,
  imgSrc,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  className,
}: PropType) {
  const titleClasses = {
    s: "text-xs",
    m: "text-sm",
    l: "text-sm",
    xl: "text-base",
  };

  const descriptionClasses = {
    s: "text-xs",
    m: "text-xs",
    l: "text-sm",
    xl: "text-sm",
  };

  const containerWidth = {
    s: "min-w-28",
    m: "min-w-[140px]",
    l: "min-w-[172px]",
    xl: "min-w-[248px]",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${containerWidth[size]} ${className}`}
    >
      {imgSrc && (
        <Img
          src={imgSrc}
          ratio={[1, 1]}
          size={
            size === "xl" ? 248 : size === "l" ? 144 : size === "m" ? 64 : 24
          }
          className="rounded-lg"
        />
      )}

      {title && (
        <p className={`text-label-secondary font-medium ${titleClasses[size]}`}>
          {title}
        </p>
      )}

      {description && (
        <p
          className={`text-label-tertiary font-normal ${descriptionClasses[size]}`}
        >
          {description}
        </p>
      )}

      {(primaryButtonText || secondaryButtonText) && (
        <div className="flex gap-2">
          {primaryButtonText && (
            // <Button size={size} variant={"filled"} label={primaryButtonText} />
            /**@todo replace with button component */
            <button>{primaryButtonText}</button>
          )}
          {secondaryButtonText && (
            // <Button
            //   size={size}
            //   variant={"outline"}
            //   label={secondaryButtonText}
            // />
            /**@todo replace with button component */
            <button>{secondaryButtonText}</button>
          )}
        </div>
      )}
    </div>
  );
}
