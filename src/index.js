import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import AuthContextProvider from "./Context/AuthContext";
import { HashRouter } from "react-router-dom";
const store = (
  <HashRouter basename="/">
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </HashRouter>
);
ReactDOM.render(store, document.getElementById("root"));
