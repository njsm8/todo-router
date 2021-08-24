import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./stateProvider";
import { auth, storage } from "./config/firebaseconfig";
import "./Navbar.css";

function Navbar() {
  const user = useContext(UserContext);
  const [imgSrc, setimgSrc] = useState("");

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      storage
        .ref("users/" + authUser.uid + "/profile.jpg")
        .getDownloadURL()
        .then((imgUrl) => {
          setimgSrc(imgUrl);
        })
        .catch((error) => alert(error.message));
    }
  });

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__logo">Todo Logo</h1>
      </Link>

      <div className="header__nav">
        <Link to="/login">
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">Hello,</span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        {user ? (
          <Link to="/todo">
            <div className="header__option">
              <span className="header__optionLineOne">Your</span>
              <span className="header__optionLineTwo">Todo</span>
            </div>
            <img
              src={
                imgSrc
                  ? imgSrc
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="profile-img"
              width="50px"
              height="50px"
            />
          </Link>
        ) : (
          <Link to="/signup">
            <div className="header__option">
              <span className="header__optionLineOne">New User?</span>
              <span className="header__optionLineTwo">SignUp</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
