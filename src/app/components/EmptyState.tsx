import * as React from "react";
import { motion } from "framer-motion/dist/framer-motion";

function EmptyState(props) {
  const onRunApp = () => {
    props.onHandleRunApp();
  };

  return (
    <motion.div
      className="empty-state-wrapper"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <div className="background-wrapper">
        <img
          className="empty-state-background"
          src={require("../assets/mesh-background.png")}
        />
      </div>
      <div className="empty-state">
        <div className="empty-state__image">
          <img className="layer-icon" src={require("../assets/new-logo.svg")} />
        </div>
        <div className="empty-state__title">Search for an asset.</div>
      </div>
    </motion.div>
  );
}

export default EmptyState;
