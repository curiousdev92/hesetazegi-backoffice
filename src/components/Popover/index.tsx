import { useOutsideClick } from "@src/hooks/useOutsideClick";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface PopoverProps {
  anchorElement: ReactNode;
  content: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  offset?: number;
}

const Popover: FC<PopoverProps> = (props) => {
  const { anchorElement, content, placement = "bottom", offset = 8 } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  // const anchorRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => setIsOpen(!isOpen);

  const closePopover = () => setIsOpen(false);

  const anchorRef = useOutsideClick(closePopover);

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
        className={`cursor-pointer relative ${isOpen ? "z-20" : "z-10"}`}
      >
        {anchorElement}
      </div>

      {ReactDOM.createPortal(
        <div
          ref={popoverRef}
          className="absolute z-40 transition-[opacity,visibility,transform] min-w-fit overflow-hidden"
          onClick={closePopover}
          style={{
            top: position.top,
            left: position.left,
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
            transform: isOpen ? "translateY(0)" : "translateY(-10px)",
            width: anchorRef.current?.clientWidth,
            direction: "rtl",
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
