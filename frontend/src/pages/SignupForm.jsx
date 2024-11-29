import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Auth.context.jsx";
import "../pages/css/SignupForm.css";

const SignupForm = () => {
  const { signupInfo, setSignupInfo, submitSignup, signupError } = useContext(AuthContext);
  const [role, setRole] = useState(signupInfo.role || "");

  const handleSignup = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };
  

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      role: selectedRole,
    }));
  
    if (selectedRole !== "driver") {
      setSignupInfo((prevInfo) => ({
        ...prevInfo,
        make: "",
        model: "",
        year: "",
        licensePlateNumber: "",
        licenseNumber: "",
        color: "",
        seatsAvailable: "",
        vehicleImage: "",
      }));
    }
  };
  


  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <form className="signup-form" onSubmit={submitSignup}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="first-name">Name</label>
            <input
              type="text"
              id="first-name"
              placeholder="Enter Your Name"
              onChange={handleSignup}
              name="name"
              value={signupInfo.name || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              type="text"
              id="email"
              placeholder="Enter Your Email"
              onChange={handleSignup}
              name="email"
              value={signupInfo.email || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              placeholder="Your phone number"
              onChange={handleSignup}
              name="phoneNumber"
              value={signupInfo.phoneNumber || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={signupInfo.gender || ""}
              onChange={handleSignup}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              onChange={handleSignup}
              name="password"
              value={signupInfo.password || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmedPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmedPassword"
              placeholder="********"
              onChange={handleSignup}
              name="confirmedPassword"
              value={signupInfo.confirmedPassword || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" value={signupInfo.role} onChange={handleRoleChange}>
              <option value="">Select Role</option>
              <option value="rider">Rider</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          {role === "driver" && (
            <div className="driver-fields-container">
              <div className="form-group">
                <label htmlFor="vehicle-make">Vehicle Make</label>
                <input
                  type="text"
                  id="vehicle-make"
                  name="make"
                  value={signupInfo.make || ""}
                  onChange={handleSignup}
                  placeholder="e.g., Tata/Hyundai"
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicle-model">Vehicle Model</label>
                <input
                  type="text"
                  id="vehicle-model"
                  name="model"
                  value={signupInfo.model || ""}
                  onChange={handleSignup}
                  placeholder="Vehicle Model"
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Make Year</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={signupInfo.year || ""}
                  onChange={handleSignup}
                  placeholder="Year"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lpn">License Plate Number</label>
                <input
                  type="text"
                  id="lpn"
                  name="licensePlateNumber"
                  value={signupInfo.licensePlateNumber || ""}
                  onChange={handleSignup}
                  placeholder="License Plate Number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="ln">License Number</label>
                <input
                  type="text"
                  id="ln"
                  name="licenseNumber"
                  value={signupInfo.licenseNumber || ""}
                  onChange={handleSignup}
                  placeholder="License Number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={signupInfo.color || ""}
                  onChange={handleSignup}
                  placeholder="Color"
                />
              </div>
              <div className="form-group">
                <label htmlFor="seats">Available Seats</label>
                <input
                  type="number"
                  id="seats"
                  name="seatsAvailable"
                  value={signupInfo.seatsAvailable || ""}
                  onChange={handleSignup}
                  placeholder="Seats"
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicle-image">Vehicle Image URL</label>
                <input
                  type="text"
                  id="vehicle-image"
                  name="vehicleImage"
                  value={signupInfo.vehicleImage || ""}
                  onChange={handleSignup}
                  placeholder="Image URL"
                />
              </div>
            </div>
          )}
          <div className="form-group">
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {signupError && (<div className="error-notification">{signupError}</div>)}
    </div>
  );
};

export default SignupForm;
