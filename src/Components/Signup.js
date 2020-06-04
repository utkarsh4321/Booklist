import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { resetLoaders } from "../Actions/bookListActions";
const Signup = (props) => {
  const { state, onAuth, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [displayName, setName] = useState("");

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onChangePasswordHandler = (e) => {
    setPasswrod(e.target.value);
  };
  const onChangeDisplayName = (e) => {
    setName(e.target.value);
  };
  const onFormSunbmitHandler = (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      onAuth({
        method: "SIGNUP",
        params: {
          email,
          password,
          displayName,
        },
      });
      setPasswrod("");
      setEmail("");
      setName("");
      // defaultProject
      //   .auth()
      //   .createUserWithEmailAndPassword(email, password)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  };
  // const arr = Hii how are you madra`;
  const {
    showLoader,
    showError,
    authError,
    authMessage,
    successedNotification,
  } = state;
  if (showError || successedNotification) {
    setTimeout(() => {
      dispatch(resetLoaders(false));
    }, 3000);
  }
  // console.log(state);
  return (
    <div>
      <h3>signup</h3>
      {showLoader && <div>Loading...</div>}
      {showError && <div>{authError}</div>}
      {successedNotification && <div>{authMessage}</div>}
      <form onSubmit={onFormSunbmitHandler}>
        <input
          type="text"
          value={displayName}
          placeholder="Name"
          onChange={onChangeDisplayName}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={onChangeEmailHandler}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={onChangePasswordHandler}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
