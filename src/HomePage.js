import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./stateProvider";

function HomePage() {
  const user = useContext(UserContext);
  return (
    <div>
      <h1>Welcome {user}</h1>
      {!user ? (
        <div>
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <h3>New User? SignUp</h3>
          </Link>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default HomePage;
