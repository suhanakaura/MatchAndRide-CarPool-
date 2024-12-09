import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/css/Navbar.css";
import { AuthContext } from "../context/Auth.context";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();

  const {submitLogout} = useContext(AuthContext)
  const {user} = localStorage.getItem('user')

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Match and Ride</Link>
        </div>
        <div className={`burger-menu ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact us</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          </li>
          <li>
            <button className="logout-button" onClick={submitLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
