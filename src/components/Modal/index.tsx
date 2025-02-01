import withBackdrop from "@src/hoc/Backdrop";
import { motion } from "motion/react";
import { FC } from "react";
import Button from "../Button";

type PropTypes = {
  align?: "start" | "center" | "end";
  label?: string;
  supportingText?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
};

const Modal: FC<PropTypes> = (props) => {
  const { align = "center", label, supportingText, onSubmit, onCancel } = props;

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
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 flex flex-col gap-4 bg-content-primary shadow-modal min-w-80 z-50 ring-1 ring-border-secondary rounded-3xl">
        <header className="flex flex-col gap-2" style={{ alignItems: align }}>
          <p className="text-label-lg text-label-primary">{label}</p>
          <p className="text-body-md text-label-secondary">{supportingText}</p>
        </header>

        {/* Content */}
        <div></div>

        <footer className="w-full flex gap-2">
          <Button
            size={"l"}
            variant={"filled"}
            label="ثبت"
            onClick={onSubmit}
          />
          <Button
            size={"l"}
            variant={"outline"}
            label="لغو"
            onClick={onCancel}
          />
        </footer>
      </div>
    </motion.div>
  );
};

export default withBackdrop(Modal);
