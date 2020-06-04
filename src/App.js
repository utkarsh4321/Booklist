import React, { useEffect, useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

// // import Navbar from "./Components/Navbar";
import {
  checkAuth,
  authRequestSuccess,
  authLogout,
} from "./Actions/bookListActions";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import UserList from "./Components/UserList";
import PrivateRoute from "./HOC/AuthRoute";
import Navbar from "./Components/Navbar";
import jwt from "jsonwebtoken";

function App() {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  // console.log(props);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // onAuth({ method: "CHECKAUTH" });
      const { exp } = jwt.decode(JSON.parse(localStorage.getItem("token")));

      if (exp > new Date().getTime() / 1000) {
        dispatch(checkAuth(true));
        dispatch(
          authRequestSuccess({
            data: {
              idToken: JSON.parse(localStorage.getItem("token")),
              localId: JSON.parse(localStorage.getItem("userId")),
            },
            message: "",
          })
        );
        // history.go(0);
        history.push("/booklist");
      } else {
        dispatch(authLogout());
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
    return () => console.log("clear it ");
  }, [dispatch, history]);
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

export default App;
