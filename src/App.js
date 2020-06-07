import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import firebase from "firebase/app";
import "firebase/auth";
// // import Navbar from "./Components/Navbar";
import {
  checkAuth,
  authLogout,
  authRequestSuccess,
} from "./Actions/bookListActions";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import UserList from "./Components/UserList";
import PrivateRoute from "./HOC/AuthRoute";
import Navbar from "./Components/Navbar";

export const myApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
});

function App() {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    myApp.auth().onAuthStateChanged(function (user) {
      setLoader(false);
      if (user) {
        dispatch(checkAuth(true));

        localStorage.setItem("userId", JSON.stringify(user.uid));

        dispatch(
          authRequestSuccess({
            data: {
              localId: JSON.parse(localStorage.getItem("userId")),
            },
            message: "",
          })
        );
        history.replace("/booklist");
      } else {
        dispatch(authLogout());
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        history.replace("/login");
        // User is signed out.
        // ...
      }
    });

    return () => console.log("clear it ");
  }, [dispatch, history]);
  return (
    <div className="App">
      {(loader && <div>Loading...</div>) || (
        <div>
          <Navbar />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/booklist" component={UserList} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
