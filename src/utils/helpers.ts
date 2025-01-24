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

export const updateURLParams = (key: string, value: string) => {
  const params = new URLSearchParams(location.search);
  params.set(key, value);
  return `${location.pathname}?${params.toString()}`;
};

export function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
