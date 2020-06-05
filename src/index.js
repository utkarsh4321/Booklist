import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import AuthContextProvider from "./Context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
const store = (
  <Router basename="/Booklist">
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Router>
);
ReactDOM.render(store, document.getElementById("root"));
