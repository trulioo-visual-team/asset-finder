import React, { useState } from "react";
import SearchResultsItem from "./SearchResultsItem";
import TotalResultsCount from "./TotalResultsCount";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import { setFilter, setSearch } from "../redux/slice/dataSlice";
import { connect } from "react-redux";

import exampleData from "./exampleData.json";
import { useDispatch } from "react-redux";

function SearchResultsList(props) {
  const dispatch = useDispatch();

  const availableFilters = ["All", "Icon", "Illustration", "Text", "Data"];

  const data = exampleData;

  // FILTER and SEARCH INTERACTION
  const [selectedFilters, setSelectedFilters] = useState(new Set(["All"]));
  const [searchText, setSearchText] = useState("");

  const handleFilterClick = filter => {
    let newSelectedFilters = [...props.filter];
    if (filter === "All") {
      // If "All" is selected, clear other selections
      newSelectedFilters.splice(0);
      newSelectedFilters.push("All");
    } else {
      // Toggle the selected filter
      if (newSelectedFilters.includes(filter)) {
        const indexToRemove = newSelectedFilters.indexOf(filter);
        if (indexToRemove !== -1) {
          newSelectedFilters.splice(indexToRemove, 1);
          console.log("REMOVING");
        }
      } else {
        newSelectedFilters.push(filter);
      }
      // If no filters are selected, default to "All"
      if (newSelectedFilters.length === 0) {
        newSelectedFilters.push("All");
      } else {
        // If specific filters are selected, remove "All"
        const indexToRemove = newSelectedFilters.indexOf("All");
        if (indexToRemove !== -1) {
          newSelectedFilters.splice(indexToRemove, 1);
        }
      }
    }
    console.log(newSelectedFilters);
    dispatch(setFilter(newSelectedFilters));
  };

  const test = tag => {
    return tag.some(el =>
      el.toLowerCase().includes(props.search.toLowerCase())
    );
  };

  // Filter the result list based on the selected filters
  const filteredResults = data.filter(item => {
    return (
      (props.filter.includes("All") || props.filter.includes(item.type)) &&
      (item.name.toLowerCase().includes(props.search.toLowerCase()) ||
        test(item.tags))
    );
  });

  // Map the filtered result list to search result item components components
  const resultListItems = filteredResults.map(data => (
    <SearchResultsItem data={data} />
  ));

  const handleSearchChange = event => {
    // setSearchText(event.target.value);
    dispatch(setSearch(event.target.value));
  };

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
      <div
        className="input input--with-icon"
        style={{
          display: "flex",
          padding: 0,
          margin: 0,
          borderBottom: "1px solid #D2D2D2",
          borderRadius: 0,
          height: 40
        }}
      >
        <div className="icon icon--search" style={{ top: 2 }}></div>
        <input
          type="input"
          className="input__field"
          placeholder="Search"
          style={{ border: "none", height: 40, borderRadius: 0 }}
          value={props.search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="filter-pills">
        {availableFilters.map((filter, index) => (
          <React.Fragment key={filter}>
            <motion.button
              key={filter}
              className={`pill ${
                props.filter.includes(filter) ? "selected" : ""
              }`}
              onClick={() => handleFilterClick(filter)}
              whileTap={{ scale: 0.9, opacity: 0.8 }}
            >
              {filter}
            </motion.button>
            {/* Render the divider after the first filter */}
            {index === 0 && <span className="pill-divider">|</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="panel-body panel-body-errors">
        {filteredResults.length ? (
          <AnimatePresence mode="popLayout">
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="errors-list"
              key="wrapper-list"
            >
              {resultListItems}
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
      <div className="footer sticky-footer">
        <TotalResultsCount totalResult={filteredResults.length} />
      </div>
    </motion.div>
  );
}

const mapStateToProps = state => {
  return { filter: state.currentItem.filter, search: state.currentItem.search };
};

export default connect(mapStateToProps)(SearchResultsList);
