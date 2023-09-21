import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import NestedList from "./NestedList";
import NestedInnerItem from "./NestedInnerItem";

const TextList = props => {
  if (props.data !== false) {
    const nestedList = props.data.info.map(el => (
      <NestedList data={el} variant={props.variant} />
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
          {props.data.swap == 1 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gridGap: 4,
                flexGrow: 1,
                padding: "12px 16px 12px 16px",
                borderBottom: "1px solid #e5e5e5"
              }}
            >
              <div className="error-description__message">Swap All</div>
              <div
                style={{
                  borderRadius: 8,
                  border: "1px solid #e5e5e5",
                  overflow: "hidden"
                }}
              >
                <NestedInnerItem
                  data={{ type: "swap", content: "Swap All" }}
                  test={1}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="errors-list"
            key="wrapper-list"
          >
            {" "}
            {nestedList}{" "}
          </motion.ul>
        </AnimatePresence>
      </div>
    );
  } else {
    return null;
  }
};
export default TextList;
