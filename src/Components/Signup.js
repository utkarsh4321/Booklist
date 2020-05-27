import React, { useState } from "react";
const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [displayName, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
  return (
    <div>
      <h3>Signup</h3>
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
