import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";

import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <Link to="/">
        <img className="nav__logo" src="img/cursus.png" alt="cursus logo" />
      </Link>

      <IconButton className="_settings">
        <SettingsIcon fontSize="large" className="nav__settings" />
      </IconButton>
    </div>
  );
}

export default Nav;
