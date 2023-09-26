import React from "react";
import { motion } from "framer-motion/dist/framer-motion";

const NestedInnerItem = props => {
  const swapItem = () => {
    // activate this
    if (props.test == 1) {
      parent.postMessage(
        {
          pluginMessage: {
            type: "testSwapAll"
            //   content: data.content,
            // format: props.data.type
          }
        },
        "*"
      );
    } else if (props.test == 0) {
      parent.postMessage(
        {
          pluginMessage: {
            type: "swapItem",
            content: props.data.content,
            format: props.data.type
          }
        },
        "*"
      );
    }
  };

  const addItem = () => {
    // activate this
    parent.postMessage(
      {
        pluginMessage: {
          type: "addItem",
          content: props.data.content,
          format: props.data.type
        }
      },
      "*"
    );
  };

  return (
    <div className="nested-item-item">
      {props.data.type === "string" || props.data.type === "swap" ? (
        <div className="type--neg-small-normal"> {props.data.content} </div>
      ) : (
        <img src={require("../assets/flag/" + props.title + ".svg")} />
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
                onClick={props.onClick}
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
                onClick={addItem}
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
                onClick={swapItem}
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
      )}
    </div>
  );
};

export default NestedInnerItem;
