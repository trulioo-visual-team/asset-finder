import * as React from "react";
import { useState } from "react";
import { connect } from "react-redux";

import "figma-plugin-ds/dist/figma-plugin-ds.css";

import SearchResultsList from "./IllustrationSearchList";
import Navigation from "./Navigation";

import "../styles/figma.ds.css";
import "../styles/ui.css";
import "../styles/empty-state.css";
import "../styles/panel.css";
import IndividualPage from "./IndividualPage";

const App = props => {
  const [activePage, setActivePage] = useState("illustration");

  const updateNavigation = page => {
    setActivePage(page);

    // figure out what this does
    // parent.postMessage(
    //   {
    //     pluginMessage: {
    //       type: "update-active-page-in-settings",
    //       page: page
    //     }
    //   },
    //   "*"
    // );
  };

  return (
    <div className="container">
      <Navigation onPageSelection={updateNavigation} activePage={activePage} />
      <div>
        {props.currentItem ? (
          <IndividualPage data={props.currentItem} variant={activePage} />
        ) : (
          <SearchResultsList variant={activePage} />
        )}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return { currentItem: state.currentItem.value };
};

export default connect(mapStateToProps)(App);
