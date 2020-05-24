import React from "react";

const Login = () => {
  return (
    <div>
      <h3>Login</h3>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
      <button>Login with google</button>
    </div>
  );
};

export default Login;
