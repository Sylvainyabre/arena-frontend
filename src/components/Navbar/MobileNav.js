import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../../stateManagement/isEmpty";
import { userLogout } from "../../stateManagement/reducers/User/loginSlice";
import { clear_profile } from "../../stateManagement/reducers/User/profileSlice";
import { Link } from "react-router-dom";
import "./Navbar.css";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const authState = useSelector((state) => state.login);
  const authUser = authState.user;
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    dispatch(clear_profile());
    setOpen(!open);
  };

  const mobileLinks = (
    <nav className="nav-menu">
      <ul className="mobile-links">
        <li className="mobile-link-item">
          <AiOutlineCloseCircle
            className="close-icon"
            onClick={() => setOpen(!open)}
          />
        </li>
        <li className="mobile-link-item" >
          <img
            src={require("./logo.png").default}
            alt="Open book as a logo"
            className="mobile-logo-image"
          />
        </li>
        <li className="mobile-link-item" onClick={() => setOpen(!open)}>
          <Link to="/" className="mobile-link">
            Home
          </Link>
        </li>
        <li className="mobile-link-item" onClick={() => setOpen(!open)}>
          <Link to="/about" className="mobile-link">
            About
          </Link>
        </li>
        <li className="mobile-link-item" onClick={() => setOpen(!open)}>
          {!isEmpty(authUser) ? (
            <div>
              <Link to="/dashboard" className="mobile-link">
                <div className="mobile-mini-profile" onClick={() => setOpen(!open)}>
                  <img
                    src={authUser.avatar}
                    alt={authUser.firstName}
                    className="round-circle"
                  />
                  <small className="mobile-caption">Profile</small>
                </div>
              </Link>
              <button
                className="mobile-link mobile-logout-button "
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="mobile-link"
              onClick={() => setOpen(!open)}
            >
              Log in
            </Link>
          )}
        </li>
        {isEmpty(authUser) && (
          <li className="mobile-link-item">
            <Link to="/register" className="mobile-link">
              Register
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
  return (
    <div className="nav mobile-menu">
      {open ? (
        mobileLinks
      ) : (
        <GiHamburgerMenu className="menu-icon" onClick={() => setOpen(!open)} />
      )}
    </div>
  );
};

export default MobileNav;
