import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        (state.isAuthenticated && <Component {...props} state={state} />) || (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default AuthRoute;
