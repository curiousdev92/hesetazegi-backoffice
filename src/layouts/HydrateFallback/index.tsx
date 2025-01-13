import withBackdrop from "@src/hoc/Backdrop";
import { motion } from "motion/react";

const HydrateFallbackLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="rounded-2xl bg-content-primary shadow-modal p-4 w-[196px] h-[156px]">
        Loading...
      </div>
    </motion.div>
  );
};

export default withBackdrop(HydrateFallbackLayout);
