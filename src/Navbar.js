import React, { useContext } from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { UserContext } from "./stateProvider";
import { auth } from "./config/firebaseconfig";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const user = useContext(UserContext);

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography variant="h5" className={classes.title}>
              Todo App
            </Typography>
          </Link>
          <div>
            {user ? (
              <>
                <Button onClick={handleAuthenticaton} color="inherit">
                  Logout
                </Button>
                <Link to="/todo">
                  <Button color="inherit">Todo</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button color="inherit">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button color="inherit">SignUp</Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
