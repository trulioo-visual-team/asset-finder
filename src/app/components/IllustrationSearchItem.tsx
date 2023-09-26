import * as React from "react";
import { useRef } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { useDispatch } from "react-redux";
import { selectItem } from "../redux/slice/dataSlice";

function SearchResultsItem(props) {
  const dispatch = useDispatch();

  const ref = useRef();
  let data = props.data;

  const variants = {
    initial: { opacity: 0, y: 12, scale: 1 },
    enter: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.96 }
  };

  const dropItem = () => {
    dispatch(selectItem(data));
  };

  return (
    <motion.li
      className="error-list-item"
      ref={ref}
      onClick={dropItem}
      positionTransition
      // key={error.node.id + props.index}
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      // type={data.type.toLowerCase()}
    >
      <div className="flex-row" style={{ gridGap: 12 }}>
        {props.variant === "illustration" ? (
          <span>
            <img src={require("../assets/illustration/" + data.svg + ".svg")} />
          </span>
        ) : (
          ""
        )}
        <span className="error-description">
          <div className="error-description__message">{data.name}</div>
          <div className="current-value truncate">{data.description}</div>
        </span>
      </div>
    </motion.li>
  );
}

export default SearchResultsItem;
