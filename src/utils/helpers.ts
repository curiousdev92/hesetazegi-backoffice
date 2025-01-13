import { MouseEventHandler } from "react";

export const preventClickBubble: MouseEventHandler<HTMLElement> = (e) =>
  e.stopPropagation();
