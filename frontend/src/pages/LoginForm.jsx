import React, { useContext, useState } from "react";
import "../pages/css/LoginForm.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

const LoginForm = () => {
    const {loginInfo,setLoginInfo,submitLogin,loginError} = useContext(AuthContext)
    const handleLogin=(e)=>{
        e.preventDefault()
      console.log(e.target)
      const {name,value} = e.target
      setLoginInfo({...loginInfo,[name]:value});
    }
    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setLoginInfo((prevInfo) => ({
          ...prevInfo,
          role: selectedRole,
        }));
      };
      

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h2>Login</h2>
        <form onSubmit={submitLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={loginInfo.email}
              onChange={handleLogin}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={loginInfo.password}
              onChange={handleLogin}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" value={loginInfo.role} onChange={handleRoleChange}>
              <option value="">Select Role</option>
              <option value="rider">Rider</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          <button className="submit-button" type="submit">
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/SignupForm" className="register-link">
              Register here!
            </Link>
          </p>
        </form>
        {loginError && <div className="error-notification">{loginError}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
