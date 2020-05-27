import React, { createContext, useCallback, useReducer } from "react";
import { defaultProject } from "../Firebase";
import rootReducer, { initialState } from "../Reducer/AuthReducer";
export const AuthContext = createContext();

const useAuth = () => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const onAuth = useCallback(({ method, params = {} }) => {
    if (method === "SIGNIN") {
    }

    if (method === "SIGNUP") {
      defaultProject
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => console.log("PLease wipe the auth function");
  });
};

function AuthContextProvider(props) {
  return (
    <AuthContext.Provider value={{}}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
