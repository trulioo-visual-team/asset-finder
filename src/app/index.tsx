import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";

import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./redux/slice/dataSlice";
import { Provider } from "react-redux";

// ReactDOM.render(<App />, document.getElementById("root"));

const store = configureStore({
  reducer: {
    currentItem: dataSlice
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
