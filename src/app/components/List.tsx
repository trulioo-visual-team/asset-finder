import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import IndividualItem from "./IndividualItem";

const List = props => {
  if (props.data !== false) {
    const individualItemList = props.data.info.map(el => (
      <IndividualItem data={el} variant={props.variant} svg={props.data.svg} />
    ));
    // Framer motion variant for the list
    const listVariants = {
      hidden: {
        opacity: 0
      },
      show: {
        opacity: 1,
        transition: {
          delayChildren: 0.1
        }
      }
    };

    return (
      <div className="panel-body panel-body-errors">
        <AnimatePresence mode="popLayout">
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="errors-list"
            key="wrapper-list"
          >
            {" "}
            {individualItemList}{" "}
          </motion.ul>
        </AnimatePresence>
      </div>
    );
  } else {
    return null;
  }
};
export default List;
