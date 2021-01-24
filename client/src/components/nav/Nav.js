import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";
import "./Nav.css";

import { notLogin } from "./../../actions/index.js";
import axios from "axios";

function Nav({ type }) {
  return (
    <Navbar>
      <Link to="/">
        <img className="nav__logo" src="img/cursus.png" alt="cursus logo" />
      </Link>
      <NavItem icon={<CogIcon />}>
        <DropdownMenu type={type}></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className={`navbar`}>
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu({ type }) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownLogOut(props) {
    const logOut = async () => {
      try {
        await axios.get("/user/clear");
        localStorage.removeItem("terms");
        localStorage.removeItem("reviews");
        window.location.reload();
      } catch (err) {
        alert("An issue occurred while logging out", err);
      }
      return null;
    };

    return (
      <a href="#" className="menu-item" onClick={logOut}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  const isLogin = () => {
    return (
      <div
        className="dropdown"
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <CSSTransition
          in={activeMenu === "main"}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem
              leftIcon={<CogIcon />}
              rightIcon={<ArrowIcon />}
              goToMenu="settings"
            >
              Settings
            </DropdownItem>

            <DropdownLogOut leftIcon={<ArrowIcon />}>Log Out</DropdownLogOut>
          </div>
        </CSSTransition>
        <CSSTransition
          in={activeMenu === "settings"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h2>Settings</h2>
            </DropdownItem>
            <DropdownItem leftIcon={<CogIcon />}>Update Email</DropdownItem>
            <DropdownItem leftIcon={<CogIcon />}>Update Password</DropdownItem>
            <DropdownItem leftIcon={<CogIcon />}>
              Update University
            </DropdownItem>
          </div>
        </CSSTransition>
      </div>
    );
  };

  const notLogin = () => {
    return (
      <div
        className="dropdown"
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <CSSTransition
          in={activeMenu === "main"}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="menu">
            <Link to="/register">
              <DropdownItem leftIcon={<ArrowIcon />}>Register</DropdownItem>
            </Link>
            <Link to="/login">
              <DropdownItem leftIcon={<ArrowIcon />}>Log In</DropdownItem>
            </Link>
          </div>
        </CSSTransition>
      </div>
    );
  };

  return <>{type === "isLogin" ? isLogin() : notLogin()}</>;
}

export default Nav;
