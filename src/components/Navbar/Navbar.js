import { React } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "../../stateManagement/isEmpty";
import { userLogout } from "../../stateManagement/reducers/User/loginSlice";
import { clear_profile } from "../../stateManagement/reducers/User/profileSlice";
import MobileNav from './MobileNav';

function Navbar() {
  const authState = useSelector((state) => state.login);
  const authUser = authState.user;
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    dispatch(clear_profile());
  };

  return (
    <div className="nav-wrapper">
      <MobileNav/>
      <div className="site-logo">
        <img
          src={require("./logo.png").default}
          alt="Open book as a logo"
          className="logo-image"
        />
      </div>
      <nav className="nav nav-wide">
        <ul className="nav-links">
          <li className="nav-link-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-link-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>

          <li className="nav-link-item">
            <Link to="/learn" className="nav-link">
              Learn
            </Link>
          </li>
          <li className="nav-link-item">
            {!isEmpty(authUser) ? (
              <div className="userLinks">
                <Link to="/dashboard" className="profileLink">
                  <div className="mini-profile">
                    <img
                      src={authUser.avatar}
                      alt={authUser.firstName}
                      className="round-circle"
                    />
                    <span className="caption">Profile</span>
                  </div>
                </Link>
                <button className="logout-button" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-link">
                Log in
              </Link>
            )}
          </li>
          {isEmpty(authUser) && (
            <li className="nav-link-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
