import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "./config/firebaseconfig";

import "./Login.css";

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setcheckPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    if (password !== checkPassword) {
      alert("password doesnt match");
      setPassword("");
      setcheckPassword("");
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          console.log(auth);
          if (auth) {
            history.push("/todo");
          }
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign Up</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h5>Re-enter Password</h5>
          <input
            type="password"
            value={checkPassword}
            onChange={(e) => setcheckPassword(e.target.value)}
          />

          <button className="login__registerButton" onClick={register}>
            {" "}
            Create your account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
