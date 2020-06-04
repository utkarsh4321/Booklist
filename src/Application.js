import React, { useEffect, useContext } from "react";
import Navbar from "./Components/Navbar";

import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { AuthContext } from "./Context/AuthContext";
import {
  checkAuth,
  authRequestSuccess,
  authLogout,
} from "./Actions/bookListActions";
import PrivateRoute from "./HOC/AuthRoute";
import UserList from "./Components/UserList";
import jwt from "jsonwebtoken";

function Application() {
  const { state, dispatch, onAuth } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // onAuth({ method: "CHECKAUTH" });
      const { exp } = jwt.decode(JSON.parse(localStorage.getItem("token")));

      if (exp > new Date().getTime() / 1000) {
        dispatch(checkAuth(true));
        dispatch(
          authRequestSuccess({
            data: { idToken: localStorage.getItem("token") },
            message: "",
          })
        );
        // history.go(0);
        history.push("/booklist");
      } else {
        dispatch(authLogout());
        localStorage.removeItem("token");
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
    return () => console.log("clear it ");
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/booklist" component={UserList} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Application;
