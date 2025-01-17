import { FC, ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface PopoverProps {
  anchorElement: ReactNode;
  content: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  offset?: number;
}

const Popover: FC<PopoverProps> = ({
  anchorElement,
  content,
  placement = "bottom",
  offset = 8,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const anchorRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && anchorRef.current && popoverRef.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      const placements: Record<
        typeof placement,
        () => { top: number; left: number }
      > = {
        top: () => ({
          top: anchorRect.top - popoverRect.height - offset,
          left: anchorRect.left + (anchorRect.width - popoverRect.width) / 2,
        }),
        bottom: () => ({
          top: anchorRect.bottom + offset,
          left: anchorRect.left + (anchorRect.width - popoverRect.width) / 2,
        }),
        left: () => ({
          top: anchorRect.top + (anchorRect.height - popoverRect.height) / 2,
          left: anchorRect.left - popoverRect.width - offset,
        }),
        right: () => ({
          top: anchorRect.top + (anchorRect.height - popoverRect.height) / 2,
          left: anchorRect.right + offset,
        }),
      };

      const calculatePosition = placements[placement] || placements.bottom;
      let { top, left } = calculatePosition();

      // Ensure the popover stays within the viewport
      top = Math.max(
        8,
        Math.min(top, window.innerHeight - popoverRect.height - 8)
      );
      left = Math.max(
        8,
        Math.min(left, window.innerWidth - popoverRect.width - 8)
      );

      setPosition({ top, left });
    }
  }, [isOpen, placement, offset]);

  return (
    <>
      <div
        ref={anchorRef}
        onClick={togglePopover}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        {anchorElement}
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={popoverRef}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              zIndex: 1000,
              background: "white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Popover;

// Usage Example
// <Popover
//   anchorElement={<button>Click me</button>}
//   content={<div>Popover Content</div>}
//   placement="top"
//   offset={10}
// />
