import React from "react";
import AuthContextProvider from "./Context/AuthContext";
import Application from "./Application";
// import Navbar from "./Components/Navbar";

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from "./Components/Home";
// import Login from "./Components/Login";
// import Signup from "./Components/Signup";
function App() {
  return (
    <AuthContextProvider>
      <Application />
    </AuthContextProvider>
  );
}

export default App;
