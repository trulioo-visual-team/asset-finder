import React from "react";
import { motion } from "framer-motion/dist/framer-motion";

const NestedInnerItem = props => {
  const dropItem = () => {
    // activate this
    if (props.test == 1) {
      parent.postMessage(
        {
          pluginMessage: {
            type: "testSwapAll"
            //   content: data.content,
            //   format: data.type
          }
        },
        "*"
      );
    } else if (props.test == 0) {
      parent.postMessage(
        {
          pluginMessage: {
            type: "swapText",
            content: props.data.content
          }
        },
        "*"
      );
    }
  };

  return (
    <div className="nested-item-item">
      {props.data.type === "text" || "swap" ? (
        <div className="type--neg-small-normal"> {props.data.content} </div>
      ) : (
        <div className="type--neg-small-normal"> {props.data.content} </div>
      )}
      {props.data.type === "swap" ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <div>
              <motion.button
                className="button--icon"
                onClick={dropItem}
                whileTap={{
                  scale: 0.9,
                  opacity: 0.8
                }}
              >
                <img
                  src={require("../assets/swap.svg")}
                  style={{ width: 12 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <div>
              <motion.button
                className="button--icon"
                onClick={dropItem}
                whileTap={{
                  scale: 0.9,
                  opacity: 0.8
                }}
              >
                <img
                  src={require("../assets/plus.svg")}
                  style={{ width: 10 }}
                />
              </motion.button>
            </div>
            <div>
              <motion.button
                className="button--icon"
                onClick={dropItem}
                whileTap={{
                  scale: 0.9,
                  opacity: 0.8
                }}
              >
                <img
                  src={require("../assets/swap.svg")}
                  style={{ width: 12 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default NestedInnerItem;
