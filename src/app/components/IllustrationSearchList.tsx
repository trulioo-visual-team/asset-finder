import React from "react";
import { useState } from "react";
import SearchResultsItem from "./IllustrationSearchItem";
import TotalResultsCount from "./TotalResultsCount";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

import { setFilter, setSearch, setSort } from "../redux/slice/dataSlice";
import { connect } from "react-redux";

import illustration from "./illustrationData.json";
import text from "./textData.json";
import { useDispatch } from "react-redux";

function SearchResultsList(props) {
  const dispatch = useDispatch();

  const data = props.variant === "illustration" ? illustration : text;

  // handle sort and filter
  const handleFilter = event => {
    dispatch(setFilter(event.target.value));
    resetList();
  };

  const handleSort = event => {
    dispatch(setSort(event.target.value));
    resetList();
  };

  const resetList = () => {
    resultListItems =
      props.variant === "illustration"
        ? filteredIllustration.map(data => (
            <SearchResultsItem
              data={data}
              variant={props.variant}
              level={data.level}
            />
          ))
        : filteredText.map(data => (
            <SearchResultsItem data={data} variant={props.variant} />
          ));
  };

  // cuts down the info
  const test = tag => {
    return tag.some(el =>
      el.toLowerCase().includes(props.search.toLowerCase())
    );
  };

  // activate the products filter *********************
  // Filter the result list based on the selected filters
  const filteredIllustration =
    props.sort == "bm" && props.variant == "illustration"
      ? data
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort((a, b) => a.level - b.level)
          .filter(item => {
            return (
              (props.filter === "all" || item.useCase.includes(props.filter)) &&
              (item.name.toLowerCase().includes(props.search.toLowerCase()) ||
                test(item.tags))
            );
          })
      : props.sort == "aup" && props.variant == "illustration"
      ? data
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(item => {
            return (
              (props.filter === "all" || item.useCase.includes(props.filter)) &&
              (item.name.toLowerCase().includes(props.search.toLowerCase()) ||
                test(item.tags))
            );
          })
      : props.sort == "adown" && props.variant == "illustration"
      ? data
          .sort((a, b) => b.name.localeCompare(a.name))
          .filter(item => {
            return (
              (props.filter === "all" || item.useCase.includes(props.filter)) &&
              (item.name.toLowerCase().includes(props.search.toLowerCase()) ||
                test(item.tags))
            );
          })
      : [];

  const filteredText =
    props.sort == "bm" && props.variant == "text"
      ? data
          .sort((a, b) => a.level - b.level)
          .filter(item => {
            return (
              (props.filter === "all" ||
                item.products.includes("all") ||
                item.products.includes(props.filter)) &&
              (item.name.toLowerCase().includes(props.search.toLowerCase()) ||
                test(item.tags))
            );
          })
      : props.sort == "aup"
      ? data
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(item => {
            return (
              (props.filter === "all" ||
                item.products.includes("all") ||
                item.products.includes(props.filter)) &&
              (item.name.toLowerCase().includes(props.search.toLowerCase()) ||
                test(item.tags))
            );
          })
      : data
          .sort((a, b) => b.name.localeCompare(a.name))
          .filter(item => {
            return (
              (props.filter === "all" ||
                item.products.includes("all") ||
                item.products.includes(props.filter)) &&
              (item.name.toLowerCase().includes(props.search.toLowerCase()) ||
                test(item.tags))
            );
          });

  // Map the filtered result list to search result item components components
  let resultListItems =
    props.variant === "illustration"
      ? filteredIllustration.map(data => (
          <SearchResultsItem
            data={data}
            variant={props.variant}
            level={data.level}
          />
        ))
      : filteredText.map(data => (
          <SearchResultsItem data={data} variant={props.variant} />
        ));

  const handleSearchChange = event => {
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
      <div>
        <input
          type="input"
          className="input-icon__input"
          placeholder="Search"
          style={{ height: 37, borderRadius: 0 }}
          value={props.search}
          onChange={handleSearchChange}
        />
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            borderTop: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              position: "relative",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            {props.variant === "illustration" ? (
              <select
                id="uniqueId"
                className="select"
                onChange={handleFilter}
                style={{ flexGrow: 1 }}
                value={props.filter}
              >
                <option value="all">All Use Cases</option>
                <option value="table">Table</option>
                <option value="general">General</option>
                <option value="decorative">Decorative</option>
              </select>
            ) : (
              <select
                id="uniqueId"
                className="select"
                onChange={handleFilter}
                style={{ flexGrow: 1 }}
                value={props.filter}
              >
                <option value="all">All Products</option>
                <option value="wfs">Workflow Studios</option>
                <option value="docv">DocV</option>
                <option value="pm">Person Match</option>
                <option value="eid">eID</option>
                <option value="kyb">KYB</option>
                <option value="ri">Risk Insights</option>
                <option value="pf">Platform</option>
              </select>
            )}
            <img
              src={require("../assets/chevron.svg")}
              style={{ width: 12, position: "absolute", right: 16 }}
            />
          </div>
          <div className="vertical-line"></div>
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              position: "relative",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <select
              id="uniqueId"
              className="select"
              onChange={handleSort}
              style={{ flexGrow: 1 }}
              value={props.sort}
            >
              <option value="bm">Best Match</option>
              <option value="aup">Alphabetical Up</option>
              <option value="adown">Alphabetical Down</option>
            </select>
            <img
              src={require("../assets/sort.svg")}
              style={{ width: 12, position: "absolute", right: 16 }}
            />
          </div>
        </div>
      </div>

      <div className="panel-body panel-body-errors">
        {resultListItems.length ? (
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
        <TotalResultsCount
          totalResult={
            props.variant == "illustration"
              ? filteredIllustration.length
              : filteredText.length
          }
        />
      </div>
    </motion.div>
  );
}

const mapStateToProps = state => {
  return {
    sort: state.currentItem.sort,
    filter: state.currentItem.filter,
    search: state.currentItem.search
  };
};

export default connect(mapStateToProps)(SearchResultsList);
