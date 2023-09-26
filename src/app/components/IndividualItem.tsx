import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";

// A copy of ErrorListItem with slight differences for showing
// in the bulk list of errors.

function IndividualItem(props) {
  const ref = useRef();

  let data = props.data;
  const [individualInput, setIndividualInput] = useState(data.content);

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

  const onChange = event => {
    setIndividualInput(event.target.value);
  };

  const addItem = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "addItem",
          content: individualInput,
          format: data.type
        }
      },
      "*"
    );
  };
  const swapItem = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "swapItem",
          content: individualInput,
          format: data.type
        }
      },
      "*"
    );
  };

  return (
    <motion.li
      className="error-list-item-none"
      ref={ref}
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
        <div className="error-description__message">{data.name}</div>
        {data.type == "component" ? (
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between"
            }}
          >
            <img
              src={require("../assets/illustration/" + props.svg + ".svg")}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <motion.button
                  className="button--icon"
                  onClick={addItem}
                  whileTap={{ scale: 0.9, opacity: 0.8 }}
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
                  whileTap={{ scale: 0.9, opacity: 0.8 }}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gridGap: 4
            }}
          >
            {data.content.length <= 20 ? (
              <input
                type="input"
                className="input"
                value={individualInput}
                onChange={onChange}
              />
            ) : (
              <textarea
                className="textarea"
                onChange={onChange}
                value={individualInput}
              />
            )}

            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <motion.button
                  className="button--icon"
                  onClick={addItem}
                  whileTap={{ scale: 0.9, opacity: 0.8 }}
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
                  whileTap={{ scale: 0.9, opacity: 0.8 }}
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
    </motion.li>
  );
}

export default IndividualItem;
