import { motion } from "motion/react";

import { FC, ReactNode } from "react";

type PropTypes = { children: ReactNode; className?: string };

const PageTransition: FC<PropTypes> = (props) => {
  const { children, className } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
export default PageTransition;
