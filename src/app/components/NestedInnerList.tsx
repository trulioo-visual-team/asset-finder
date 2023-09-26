import React from "react";
import NestedInnerItem from "./NestedInnerItem";

const NestedInnerList = props => {
  const nestedInnerItems = props.data.items.map(el => (
    <NestedInnerItem data={el} test={0} title={props.data.title} />
  ));

  return (
    <div>
      <div
        style={{
          borderRadius: 8,
          border: "1px solid #e5e5e5",
          overflow: "hidden"
        }}
      >
        {nestedInnerItems}
      </div>
    </div>
  );
};

export default NestedInnerList;
