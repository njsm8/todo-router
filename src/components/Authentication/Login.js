import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../config/firebaseconfig";
import { UserContext } from "../../config/stateProvider";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useContext(UserContext);

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      {user ? (
        `You have already been logged in as ${user}`
      ) : (
        <div className="login__container">
          <h1>Login</h1>

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

            <button
              type="submit"
              onClick={signIn}
              className="login__signInButton"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
