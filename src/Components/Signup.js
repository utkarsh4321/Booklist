import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onChangePasswordHandler = (e) => {
    setPasswrod(e.target.value);
  };
  return (
    <div>
      <h3>Signup</h3>
      <form>
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
