import { MouseEventHandler } from "react";

export const preventClickBubble: MouseEventHandler<HTMLElement> = (e) => {
  return e.stopPropagation();
};

export const formatNumber = (number: number, locale: LocalesType = "fa") => {
  return number.toLocaleString(locale);
};

export const localizeDigit = (num: number, loc: LocalesType = "fa") => {
  return Number(num).toLocaleString(loc, {
    useGrouping: false,
  });
};
