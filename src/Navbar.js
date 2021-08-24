import React, { useContext, useState } from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { UserContext } from "./stateProvider";
import { auth, storage } from "./config/firebaseconfig";

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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography variant="h5" className={classes.title}>
              "Todo app"
            </Typography>
          </Link>
          <div>
            {user ? (
              <>
                <img src={imgSrc} alt={"profile"} width="50" height="50" />
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
