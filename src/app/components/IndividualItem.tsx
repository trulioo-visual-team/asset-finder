import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";

// A copy of ErrorListItem with slight differences for showing
// in the bulk list of errors.

function IndividualItem(props) {
  const [buttonText, setButtonText] = useState(props.data.var);

  const handleMouseEnter = () => {
    setButtonText("Fill layer");
  };

  const handleMouseLeave = () => {
    setButtonText(data.var);
  };

  const ref = useRef();
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
      className="error-list-item"
      style={
        props.value == 1
          ? {
              backgroundColor: "F2F2F2"
            }
          : {
              backgroundColor: "#FFFFFF"
            }
      }
      ref={ref}
      positionTransition
      // key={error.node.id + props.index}
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      type={data.type.toLowerCase()}
    >
      <div className="flex-row" style={{ gridGap: 4 }}>
        {data.type == "Illustration" ? (
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              width: "100vw"
            }}
          >
            <span
              className="error-description"
              style={{
                display: "flex",
                gridGap: "4px",
                flexDirection: "column"
              }}
            >
              <div className="current-value">{data.type}</div>

              <img
                src={require("../assets/illustration/" + props.svg + ".svg")}
              />
            </span>
            <button
              className="imitation-button"
              onClick={dropItem}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {buttonText}{" "}
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              width: "100vw"
            }}
          >
            <span
              className="error-description"
              style={{
                display: "flex",
                gridGap: "4px",
                flexDirection: "column"
              }}
            >
              <div className="current-value">{data.type}</div>
              <div className="error-description__message">{data.content}</div>
            </span>
            <button
              className="imitation-button"
              onClick={dropItem}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {buttonText}{" "}
            </button>
          </div>
        )}{" "}
      </div>
    </motion.li>
  );
}

export default IndividualItem;
