import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./config/firebaseconfig";
import HomePage from "./components/Homepage/HomePage";
import Login from "./components/Authentication/Login";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/Authentication/SignUp";
import TodoHome from "./components/Todo/TodoHome";
import { UserContext } from "./config/stateProvider";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.email);
        console.log("The user is ", authUser.email);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <div>
      <Router>
        <UserContext.Provider value={user}>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/todo">
              <TodoHome />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
