import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, storage } from "./config/firebaseconfig";
import { UserContext } from "./stateProvider";

import "./Login.css";

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setcheckPassword] = useState("");
  let file = {};
  const user = useContext(UserContext);

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
            storage
              .ref("users/" + auth.user.uid + "/profile.jpg")
              .put(file)
              .then(function () {
                alert("successfully uploaded");
              })
              .catch((error) => {
                console.log(error.message);
              });
            history.push("/");
          }
        })
        .catch((error) => alert(error.message));
    }
  };

  function changeHandler(e) {
    file = e.target.files[0];
  }

  return (
    <div className="login">
      {user ? (
        `You have already been logged in as ${user}`
      ) : (
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

            <h5>Choose a profile picture</h5>
            <input type="file" onChange={changeHandler} />

            <button className="login__registerButton" onClick={register}>
              {" "}
              Create your account
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
