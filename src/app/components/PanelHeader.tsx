import * as React from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/slice/dataSlice";

function PanelHeader(props) {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(removeItem());
    console.log("Back to results");
  };

  return (
    <div className="panel-header">
      <div className="panel-header__action">
        <motion.button
          className="button--icon"
          onClick={handleSubmit}
          whileTap={{ scale: 0.9, opacity: 0.8 }}
        >
          <img
            className="panel-collapse-icon"
            src={require("../assets/forward-arrow.svg")}
            style={{ transform: "rotate(180deg)" }}
          />
        </motion.button>
      </div>
      <div className="panel-header__title">{props.title}</div>
    </div>
  );
}

export default PanelHeader;
