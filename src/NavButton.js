import React from "react";
import { Link } from "react-router-dom";

function NavButton() {
  return (
    <div>
      <Link to="/">
        <span>Add a todo</span>
      </Link>
      <Link to="/todos">
        <h3> Check added todos</h3>
      </Link>
    </div>
  );
}

export default NavButton;
