import React from "react";
import { legacy_createStore } from "redux";
import rootReducer from "./reducers/";
import { Provider } from "react-redux";

const store = legacy_createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function DataProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default DataProvider;
