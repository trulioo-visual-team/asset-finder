import * as React from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { useDispatch } from "react-redux";

import {
  setFilter,
  setSort,
  setSearch,
  removeItem
} from "../redux/slice/dataSlice";

function Navigation(props) {
  let activePage = props.activePage;
  const dispatch = useDispatch();

  const textClick = () => {
    dispatch(setFilter("all"));
    dispatch(setSort("bm"));
    dispatch(setSearch(""));
    dispatch(removeItem());
    props.onPageSelection("text");
  };

  const illustrationClick = () => {
    dispatch(setFilter("all"));
    dispatch(setSort("bm"));
    dispatch(setSearch(""));
    dispatch(removeItem());
    props.onPageSelection("illustration");
  };

  return (
    <div key="nav">
      <div className="navigation-wrapper">
        <nav className="nav">
          <motion.div
            className={`nav-item ${
              activePage === "illustration" ? "active" : ""
            }`}
            onClick={illustrationClick}
            whileTap={{ scale: 0.98, opacity: 0.8 }}
          >
            Illustration
          </motion.div>
          <motion.div
            className={`nav-item ${activePage === "text" ? "active" : ""}`}
            onClick={textClick}
            whileTap={{ scale: 0.98, opacity: 0.8 }}
          >
            Text
          </motion.div>
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
