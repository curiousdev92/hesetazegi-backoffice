import { preventClickBubble } from "@src/utils/helpers";
import { ComponentType, FC } from "react";

// Define the type for the added prop
interface WithBackdropProps {
  onBackdropClick?: () => void;
}

const withBackdrop = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P & WithBackdropProps> => {
  return ({ onBackdropClick, ...props }: WithBackdropProps & P) => {
    return (
      <div
        className="backdrop-blur-md bg-system-black bg-opacity-30 absolute left-0 top-0 size-full flex justify-center items-center z-10"
        onClick={onBackdropClick}
      >
        <div onClick={preventClickBubble}>
          <WrappedComponent
            {...(props as P)}
            onBackdropClick={onBackdropClick}
          />
        </div>
      </div>
    );
  };
};

export default withBackdrop;
