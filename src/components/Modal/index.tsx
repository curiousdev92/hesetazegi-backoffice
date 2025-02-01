import withBackdrop from "@src/hoc/Backdrop";
import { motion } from "motion/react";
import { FC, ReactNode } from "react";
import Button from "../Button";
import FontIcon from "../FontIcon";

type PropTypes = {
  align?: "start" | "center" | "end";
  label?: string;
  supportingText?: string;
  actions?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  content?: ReactNode;
  icon?: ReactNode;
};

const Modal: FC<PropTypes> = (props) => {
  const {
    align = "center",
    label,
    supportingText,
    actions = true,
    onSubmit,
    onCancel,
    content,
    icon,
    onClose,
  } = props;

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(10px)",
        transform:
          "perspective(500px) translateZ(-100px) rotateX(5deg) rotateY(25deg)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transform: "perspective(500px)",
      }}
      exit={{
        opacity: 0,
        filter: "blur(10px)",
        transform:
          "perspective(500px) translateZ(-100px) rotateX(5deg) rotateY(25deg)",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="p-4 flex flex-col gap-4 bg-content-primary shadow-modal min-w-80 z-50 ring-1 ring-border-secondary rounded-3xl max-w-96">
        <header
          className="flex flex-col gap-2 relative"
          style={{ alignItems: align }}
        >
          {/* Close button */}
          <button
            className="h-6 w-6 ring-1 ring-border-secondary rounded-full p-1 absolute top-0"
            style={{ left: align === "start" ? undefined : 0 }}
            onClick={onClose}
          >
            <FontIcon icon="close" />
          </button>

          {icon ? icon : null}
          <p
            className="text-label-lg text-label-primary"
            style={{ textAlign: align }}
          >
            {label}
          </p>
          <p
            className="text-body-md text-label-secondary"
            style={{ textAlign: align }}
          >
            {supportingText}
          </p>
        </header>

        {/* Content */}
        <div>{content}</div>

        {actions ? (
          <footer className="w-full flex gap-2">
            {onSubmit ? (
              <Button
                size={"l"}
                variant={"filled"}
                label="ثبت"
                onClick={onSubmit}
                fullWidth
              />
            ) : null}
            {onCancel ? (
              <Button
                size={"l"}
                variant={"outline"}
                label="لغو"
                onClick={onCancel}
                fullWidth
              />
            ) : null}
          </footer>
        ) : null}
      </div>
    </motion.div>
  );
};

export default withBackdrop(Modal);
