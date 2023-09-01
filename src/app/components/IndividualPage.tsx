import React, { useEffect } from "react";
import PanelHeader from "./PanelHeader";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import exampleData from "./exampleData.json";
import IndividualItem from "./IndividualItem";

import { connect } from "react-redux";

function IndividualPage(props) {
  // check if there is data first
  if (props.data !== false) {
    const individualItemList = props.data.info.map((el, index) => (
      <IndividualItem
        data={el}
        svg={props.data.svg}
        value={index % 2 === 0 ? 1 : 2}
      />
    ));

    // Framer motion variant for the list
    const listVariants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          delayChildren: 0.1
        }
      }
    };

    const pageVariants = {
      initial: { opacity: 1, x: 10 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -10 }
    };

    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="bulk-errors-list"
        key="bulk-list"
      >
        <PanelHeader title={props.data.name}></PanelHeader>

        <div className="panel-body panel-body-errors">
          {1 ? (
            <AnimatePresence mode="popLayout">
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="errors-list"
                key="wrapper-list"
              >
                {individualItemList}
              </motion.ul>
            </AnimatePresence>
          ) : (
            // Render the success message when there are no errors and initialLoadComplete is true
            <div className="success-message">
              <div className="success-shape">
                <img
                  className="success-icon"
                  src={require("../assets/smile.svg")}
                />
              </div>
              No results found...
            </div>
          )}
        </div>
      </motion.div>
    );
  } else {
    return null;
  }
}

const mapStateToProps = state => {
  return { data: state.currentItem.value };
};

export default connect(mapStateToProps)(IndividualPage);
