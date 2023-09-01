import * as React from "react";
import { connect } from "react-redux";

import "figma-plugin-ds/dist/figma-plugin-ds.css";

import SearchResultsList from "./SearchResultsList";

import "../styles/figma.ds.css";
import "../styles/ui.css";
import "../styles/empty-state.css";
import "../styles/panel.css";
import IndividualPage from "./IndividualPage";

const App = props => {
  return (
    <div className="container">
      {props.currentItem ? (
        <IndividualPage data={props.currentItem} />
      ) : (
        <SearchResultsList />
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return { currentItem: state.currentItem.value };
};

export default connect(mapStateToProps)(App);
