import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome Guest</h1>
      <Link to="/login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <h3>New User? SignUp</h3>
      </Link>
    </div>
  );
}

export default HomePage;
