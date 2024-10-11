import { Fragment } from "react";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import RecipeInfo from "./pages/RecipeInfo";
import Favorite from "./pages/Favorite";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          {!isAuth && <Signin />}
          {isAuth && <Home />}
        </Route>
        <Route path="/login">
          {!isAuth && <Login />}
          {isAuth && <Home />}
        </Route>
        <Route path="/home">
          {isAuth && <Home />}
          {!isAuth && <Redirect to="/" />}
        </Route>
        <Route path="/info/:id">
          {isAuth && <RecipeInfo />}
          {!isAuth && <Redirect to="/" />}
        </Route>
        <Route path="/fav">
          {isAuth && <Favorite />}
          {!isAuth && <Redirect to="/fav" />}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
