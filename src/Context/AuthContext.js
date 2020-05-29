import React, { createContext, useCallback, useReducer } from "react";
import { defaultProject } from "../Firebase";
import rootReducer, { initialState } from "../Reducer/AuthReducer";
import jwt from "jsonwebtoken";
import {
  authRequestSuccess,
  authFails,
  authStarted,
  removeLoaderAction,
} from "../Actions/bookListActions";
export const AuthContext = createContext();

const useAuth = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const onAuth = useCallback(async ({ method, params = {} }) => {
    let baseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;

    if (method === "SIGNIN") {
      baseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;
    }

    dispatch(authStarted());
    // defaultProject
    //   .auth()
    //   .createUserWithEmailAndPassword(params.email, params.password)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: params.email,
        password: params.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((data) => {
        console.log(jwt.decode(data.idToken));
        dispatch(removeLoaderAction());
        dispatch(
          authRequestSuccess({ idToken: data.idToken, localId: data.localId })
        );
      })
      .catch(async (err) => {
        let {
          error: { message },
        } = await err.json();
        dispatch(removeLoaderAction());
        dispatch(authFails({ message: message, showError: true }));
      });

    return () => console.log("PLease wipe the auth function");
  });
  return [state, onAuth, dispatch];
};

function AuthContextProvider(props) {
  const [state, onAuth, dispatch] = useAuth();
  return (
    <AuthContext.Provider value={{ state, onAuth, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
