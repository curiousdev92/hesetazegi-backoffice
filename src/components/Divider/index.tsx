interface DividerProps {
  horizontalType?:
    | "full-width"
    | "right-inset"
    | "left-inset"
    | "middle-inset"
    | "thick";
  horizontal?: "horizontal1" | "horizontal2" | "horizontal3";
  verticalType?:
    | "full-width"
    | "top-inset"
    | "bottom-inset"
    | "middle-inset"
    | "thick";
  vertical?: "vertical1" | "vertical2" | "vertical3";
  className?: string;
}

export default function Divider(props: DividerProps) {
  const { horizontalType, verticalType, horizontal, vertical, className } =
    props;
  const horizontalStyles = {
    horizontal1: {
      "full-width": "w-full h-px bg-gray-50",
      "right-inset": "h-px bg-gray-50 pr-4",
      "left-inset": "h-px bg-gray-50 pl-4",
      "middle-inset": "h-px bg-gray-50 px-2",
      thick: "w-full h-2 bg-zink-100",
    },

    horizontal2: {
      "full-width": "w-full h-px bg-gray-100",
      "right-inset": "h-px bg-gray-100 pr-4",
      "left-inset": "h-px bg-gray-100 pl-4",
      "middle-inset": "h-px bg-gray-100 px-2",
      thick: "w-full h-2 bg-zink-100",
    },

    horizontal3: {
      "full-width": "w-full h-px bg-gray-200",
      "right-inset": "h-px bg-gray-200 pr-4",
      "left-inset": "h-px bg-gray-200 pl-4",
      "middle-inset": "h-px bg-gray-200 px-2",
      thick: "w-full h-2 bg-zink-300",
    },
  };
  const verticalStyles = {
    vertical1: {
      "full-width": "w-px bg-gray-50",
      "top-inset": "w-px bg-gray-50 pt-4",
      "bottom-inset": "w-px bg-gray-50 pb-4",
      "middle-inset": "w-px bg-gray-50 py-2",
      thick: "w-2 bg-zink-100",
    },

    vertical2: {
      "full-width": "w-px bg-gray-100",
      "top-inset": "w-px bg-gray-100 pt-4",
      "bottom-inset": "w-px bg-gray-100 pb-4",
      "middle-inset": "w-px bg-gray-100 py-2",
      thick: "w-2 bg-zink-100",
    },

    vertical3: {
      "full-width": "w-px bg-gray-200",
      "top-inset": "w-px bg-gray-200 pt-4",
      "bottom-inset": "w-px bg-gray-200 pb-4",
      "middle-inset": "w-px bg-gray-200 py-2",
      thick: "w-2 bg-zink-300",
    },
  };

  let styles = "";
  if (horizontal && horizontalType) {
    styles = horizontalStyles[horizontal][horizontalType];
  } else if (vertical && verticalType) {
    styles = verticalStyles[vertical][verticalType];
  }

  return <div className={`${styles} ${className}`} />;
}
