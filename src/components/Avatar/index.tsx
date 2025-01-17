import FontIcon from "../FontIcon";
import Img from "../Images";

interface AvatarPrps {
  img?: string;
  alt?: string;
  size?: 48 | 40 | 32 | 24 | 20 | 16;
  className?: string;
  type?: "icon" | "text" | "select" | "image";
  text?: string;
}

export default function Avatar({
  img,
  alt = "avatar",
  size = 48,
  className = "",
  type = "image",
  text = "avatar",
}: AvatarPrps) {
  const baseClasses = `rounded-full flex items-center justify-center ring-1 ring-inset ring-gray-100 relative overflow-hidden `;

  const sizes = {
    48: { class: "w-12 h-12 text-[28px] p-2.5", height: 48 },
    40: { class: "w-10 h-10 text-2xl p-2", height: 40 },
    32: { class: "w-8 h-8 text-xl p-1.5", height: 32 },
    24: { class: "w-6 h-6 text-base p-1", height: 24 },
    20: { class: "w-5 h-5 text-xs p-1", height: 20 },
    16: { class: "w-4 h-4 text-[8px] p-1", height: 16 },
  };

  const isEnglish = (text: string) => {
    const firstCharCode = text.charCodeAt(0);
    return firstCharCode >= 65 && firstCharCode <= 122;
  };

  const processText = (text: string) => {
    if (isEnglish(text)) {
      return text.charAt(0).toUpperCase();
    } else {
      return text.slice(0, 2);
    }
  };

  return (
    <div
      className={`${baseClasses} ${sizes[size].class} ${
        type === "select" ? "bg-system-primary" : ""
      } ${className}`}
    >
      {type === "icon" ? (
        <FontIcon icon="profile" />
      ) : type === "select" ? (
        <FontIcon icon="tick" className="text-system-white" />
      ) : type === "text" ? (
        <span>{processText(text)}</span>
      ) : img ? (
        <Img
          src={img}
          alt={alt}
          className="absolute left-0 top-0 bottom-0 right-0 rounded-full"
          height={sizes[size].height}
          ratio={[1, 1]}
        />
      ) : (
        <FontIcon icon="profile" />
      )}
    </div>
  );
}
