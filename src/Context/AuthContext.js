import React, { createContext, useCallback, useReducer } from "react";
import rootReducer, { initialState } from "../Reducer/AuthReducer";
import { useHistory } from "react-router-dom";
import {
  authRequestSuccess,
  authFails,
  authStarted,
  removeLoaderAction,
  checkAuth,
  freshedLogin,
} from "../Actions/bookListActions";
import { myApp } from "../App";
export const AuthContext = createContext();

const useAuth = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const history = useHistory();
  const onAuth = useCallback(
    async ({ method, params = {} }) => {
      if (method === "SIGNUP") {
        let baseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;
        let payload = {
          email: params.email,
          password: params.password,
          displayName: params.displayName,
        };

        if (method === "SIGNIN") {
          baseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;
          payload = {
            email: params.email,
            password: params.password,
          };
        }

        dispatch(authStarted());

        fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(payload),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return Promise.reject(res);
            }
          })
          .then((data) => {
            dispatch(removeLoaderAction());
            if (method === "SIGNIN") {
              dispatch(
                authRequestSuccess({
                  data: { idToken: data.idToken, localId: data.localId },
                  message: "Login successfull",
                })
              );
              dispatch(checkAuth(true));
              dispatch(freshedLogin(true));

              history.push({
                pathname: "/booklist",
                state: state,
              });
              setTimeout(() => {
                dispatch(freshedLogin(false));
              }, 5000);
            }
            dispatch(
              authRequestSuccess({
                message: "user created successfully please login",
              })
            );

            // setTimeout(() => {
            //   dispatch(authLogout({}));
            // }, exp);
          })
          .catch(async (err) => {
            let {
              error: { message },
            } = await err.json();
            dispatch(removeLoaderAction());
            dispatch(authFails({ message: message, showError: true }));
          });
      }
      if (method === "SIGNIN") {
        dispatch(authStarted());

        myApp
          .auth()
          .signInWithEmailAndPassword(params.email, params.password)
          .then((res) => {
            dispatch(removeLoaderAction());

            dispatch(checkAuth(true));
            dispatch(freshedLogin(true));

            setTimeout(() => {
              dispatch(freshedLogin(false));
            }, 5000);
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            dispatch(removeLoaderAction());
            dispatch(authFails({ message: errorMessage, showError: true }));
            // ...
          });
      }

      return () => console.log("PLease wipe the auth function");
    },
    [state, history]
  );
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
