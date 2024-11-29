import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Match and Ride</h1>
        <p className="description">
          Your perfect destination for car pool platform
        </p>
        <Link to="/LoginForm">
          <button className="button">
            Get Started
            <span className="arrow">➔</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
