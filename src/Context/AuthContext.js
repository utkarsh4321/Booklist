import React, { createContext, useCallback, useReducer } from "react";
import rootReducer, { initialState } from "../Reducer/AuthReducer";
import { useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import {
  authRequestSuccess,
  authFails,
  authStarted,
  removeLoaderAction,
  authLogout,
  checkAuth,
  freshedLogin,
} from "../Actions/bookListActions";
export const AuthContext = createContext();

const useAuth = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const history = useHistory();
  const onAuth = useCallback(
    async ({ method, params = {} }) => {
      if (method === "SIGNUP" || method === "SIGNIN") {
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
            // console.log(data);
            const { exp } = jwt.decode(data.idToken);
            dispatch(removeLoaderAction());
            if (method === "SIGNIN") {
              localStorage.setItem("token", JSON.stringify(data.idToken));
              localStorage.setItem("userId", JSON.stringify(data.localId));
              dispatch(
                authRequestSuccess({
                  data: { idToken: data.idToken, localId: data.localId },
                  message: "Login successfull",
                })
              );
              dispatch(checkAuth(true));
              dispatch(freshedLogin(true));
              // console.log(history, "HIstory from signIN");

              history.push({
                pathname: "/booklist",
                state: state,
              });
              setTimeout(() => {
                dispatch(freshedLogin(false));
              }, 5000);
            } else {
              dispatch(
                authRequestSuccess({ message: "user created successfully" })
              );
            }

            setTimeout(() => {
              dispatch(authLogout({}));
            }, exp);
          })
          .catch(async (err) => {
            // console.log(err, "This is error");
            let {
              error: { message },
            } = await err.json();
            dispatch(removeLoaderAction());
            dispatch(authFails({ message: message, showError: true }));
          });
      }
      // if (method === "CHECKAUTH") {
      //   fetch(
      //     `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json;charset=utf-8",
      //       },
      //       body: JSON.stringify({
      //         idToken: JSON.parse(localStorage.getItem("token")),
      //       }),
      //     }
      //   )
      //     .then((res) => {
      //       if (res.ok) {
      //         return res.json();
      //       } else {
      //         return Promise.reject(res);
      //       }
      //     })
      //     .then((data) => console.log(data))
      //     .catch((err) => console.log(err));
      // }

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
