import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  ReactSVGElement,
} from "react";

type PropTypes = { children: ReactNode; fillColor?: string | undefined };

const SVGElement: FC<PropTypes> = (props) => {
  const { children, fillColor } = props;
  const applyFillColor = (child: ReactNode): ReactNode => {
    // Ensure the child is a valid React element and has SVG properties
    if (isValidElement(child) && typeof child.type !== "string") {
      return cloneElement(child as ReactSVGElement, {
        fill: fillColor, // Override the fill color
      });
    }
    return child; // Return unchanged for non-SVG or unrecognized elements
  };

  return <div>{Children.map(children, applyFillColor)}</div>;
};
export default SVGElement;
