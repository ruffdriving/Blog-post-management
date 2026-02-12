import React from "react";
import { FaBlog, FaHome, FaPlusSquare, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo">
          <FaBlog className="logo-icon" />
          <span className="logo-text">Blogpost</span>
        </div>

        <div className="navbar-links">
          <NavLink to="/dashboard" className="nav-item">
            <FaHome /> Home
          </NavLink>

          <NavLink to="/create-post" className="nav-item">
            <FaPlusSquare /> Create Post
          </NavLink>
        </div>

        <div className="navbar-actions">
          <span className="user-name">
            Hi, {username}
          </span>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
