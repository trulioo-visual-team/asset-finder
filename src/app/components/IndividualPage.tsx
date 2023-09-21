import React, { useEffect } from "react";
import PanelHeader from "./PanelHeader";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import IndividualItem from "./IndividualItem";
import NestedList from "./NestedList";
import List from "./List";

import { connect } from "react-redux";
import TextList from "./TextList";

function IndividualPage(props) {
  // check if there is data first
  if (props.data !== false) {
    let individualItemList;
    if (props.variant === "illustration") {
      individualItemList = props.data.info.map(el => (
        <IndividualItem
          data={el}
          variant={props.variant}
          svg={props.data.svg}
        />
      ));
    } else {
      individualItemList = props.data.info.map(el => (
        <NestedList data={el} variant={props.variant} />
      ));
    }

    // // Framer motion variant for the list
    // const listVariants = {
    //     hidden: {
    //         opacity: 0
    //     },
    //     show: {
    //         opacity: 1,
    //         transition: {
    //             delayChildren: 0.1
    //         }
    //     }
    // };

    const pageVariants = {
      initial: {
        opacity: 1,
        x: 10
      },
      enter: {
        opacity: 1,
        x: 0
      },
      exit: {
        opacity: 0,
        x: -10
      }
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gridGap: 4,
            padding: "12px 16px 12px 16px",
            borderBottom: "1px solid #e5e5e5"
          }}
        >
          <div className="current-value">{props.data.description}</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: 2
            }}
          >
            {props.variant === "illustration" ? (
              <div
                style={{ display: "flex", flexDirection: "row", gridGap: 2 }}
              >
                <div style={{ fontWeight: 500, fontSize: 11 }}>
                  Use Case:{" "}
                  <span className="current-value">{props.data.useCase}</span>
                </div>
              </div>
            ) : (
              ""
            )}
            <div style={{ display: "flex", flexDirection: "row", gridGap: 2 }}>
              <span className="error-description__message">
                Product Usage:{" "}
                <span className="current-value">{props.data.products}</span>
              </span>
            </div>
          </div>
        </div>
        {props.variant === "illustration" ? (
          <List data={props.data} variant={props} />
        ) : (
          <TextList data={props.data} variant={props.variant} />
        )}
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
