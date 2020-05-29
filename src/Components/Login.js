import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { state, onAuth, dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      onAuth({
        method: "SIGNIN",
        params: { email, password, message: "Login successFully" },
      });
    }
  };
  return (
    <div>
      <h3>Login</h3>
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
      <button>Login with google</button>
    </div>
  );
};

export default Login;
