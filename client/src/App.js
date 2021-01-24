import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";

import Register from "./components/authentication/register/Form.js";
import Login from "./components/authentication/login/Form.js";
import Nav from "./components/nav/Nav";
import Banner from "./components/banner/Banner.js";
import Home from "./components/home/Home.js";
import Schedule from "./components/schedule/Schedule.js";
import Reviews from "./components/reviews/Reviews.js";
import Alerts from "./components/alerts/Alerts.js";

import "./App.css";

import {
  isLogin,
  notLogin,
  setUniversity,
  removeUniversity,
} from "./actions/index.js";

const notLoginComponents = () => {
  return (
    <div>
      <Nav type="notLogin" />
      {/* Should have maybe some home login/reg page with two links and cool animation */}
      <Route path="/" component={Register} />
      <Route path="/login" exact component={Login} />
      {/* <Redirect to="/" /> */}
    </div>
  );
};

const isLoginComponents = () => {
  return (
    <div>
      {/* {redirect} */}
      <Nav type="isLogin" />
      <Banner />
      <Route path="/" exact component={Home} />
      <Route path="/schedule" exact component={Schedule} />
      <Route path="/reviews" exact component={Reviews} />
      <Route path="/alerts" exact component={Alerts} />
      <Redirect to="/" />
    </div>
  );
};

function App() {
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        // verify the user
        const res = await axios.get("/user");
        dispatch(isLogin());
        dispatch(setUniversity(res.data.university));
        return res;
      } catch (err) {
        // the user does not have a 'token' cookie or an invalid JWT
        dispatch(notLogin());
        dispatch(removeUniversity());
        return null;
      }
    }
    fetchUser();
  }, [isLogged]);

  return (
    <Router>
      <div className="app">
        <Switch>{isLogged ? isLoginComponents() : notLoginComponents()}</Switch>
      </div>
    </Router>
  );
}

export default App;
