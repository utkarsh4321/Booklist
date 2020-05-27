import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.password);
  const onSubmitHandler = (e) => {
    e.preventDefault();
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
