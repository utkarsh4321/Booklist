import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import firebase from "firebase/app";
import { myApp } from "../App";

const Login = () => {
  const { state, onAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      onAuth({
        method: "SIGNIN",
        params: { email, password },
      });
    }
  };
  const provider = new firebase.auth.GoogleAuthProvider();
  const onOauthHandler = () => {
    myApp
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {})
      .catch(function (error) {
        // Handle Errors here.
        console.log(error);
        // ...
      });
  };
  const onForgetPasswordHandler = () => {
    setForgotPassword(!forgotPassword);
  };
  const sendResetPasswordEmail = () => {
    if (forgotPasswordEmail.trim().length > 0) {
      const actionCodeSettings = {
        url: "https://utkarsh4321.github.io/Booklist/#/login",
        handleCodeInApp: false,
      };
      let auth = myApp.auth();
      auth
        .sendPasswordResetEmail(forgotPasswordEmail, actionCodeSettings)
        .then((res) => {
          setForgotPasswordMessage(
            "Email send successfully to reset your password"
          );
          setForgotPasswordEmail("");
          setTimeout(() => {
            setForgotPasswordMessage("");
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  };

  const {
    showLoader,
    showError,
    authError,
    authMessage,
    successedNotification,
  } = state;

  return (
    <div>
      <h3>Login</h3>
      {showLoader && <div>Loading...</div>}
      {showError && <div>{authError}</div>}
      {successedNotification && <div>{authMessage}</div>}
      {forgotPasswordMessage}
      <form onSubmit={onSubmitHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onOauthHandler}>Login with google</button>
      {forgotPassword && (
        <div>
          <label>Email to reset Password</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
          />

          <button onClick={sendResetPasswordEmail}>Send</button>
        </div>
      )}
      <button onClick={onForgetPasswordHandler}>Forget Password</button>
    </div>
  );
};

export default Login;
