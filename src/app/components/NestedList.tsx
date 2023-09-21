import * as React from "react";
import { motion } from "framer-motion/dist/framer-motion";
import NestedInnerItem from "./NestedInnerItem";
import NestedInnerList from "./NestedInnerList";

// A copy of ErrorListItem with slight differences for showing
// in the bulk list of errors.

function NestedList(props) {
  let data = props.data;

  const variants = {
    initial: {
      opacity: 0,
      y: 12,
      scale: 1
    },
    enter: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.96
    }
  };

  const dropItem = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "dropdrop",
          content: data.content,
          format: data.type
        }
      },
      "*"
    );
  };

  return (
    <motion.li
      className="error-list-item-none"
      positionTransition
      // key={error.node.id + props.index}
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      // type={data.type.toLowerCase()}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gridGap: 4,
          flexGrow: 1
        }}
      >
        <div className="error-description__message">{data.title}</div>
        {props.data.swap == 1 ? (
          <div
            style={{
              borderRadius: 8,
              border: "1px solid #e5e5e5",
              overflow: "hidden"
            }}
          >
            <NestedInnerItem data={{ type: "swap", content: "Swap All" }} />
          </div>
        ) : (
          ""
        )}

        <NestedInnerList data={props.data} />
      </div>
    </motion.li>
  );
}

export default NestedList;
