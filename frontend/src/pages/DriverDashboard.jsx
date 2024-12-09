import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth.context";
import { Autocomplete } from "@react-google-maps/api";
import "../pages/css/DD.css"; 
import { MapContext } from "../context/Map.context";
import Navbar from "../components/Navbar";

const DriverDashboard = () => {
  const { locErr, loc, submitLoc, setLoc } = useContext(AuthContext);
  const { isLoaded , displayOnClick,originRef,destRef} = useContext(MapContext);
  const [showRiderList, setShowRiderList] = useState(false);


  const handlePlaceChanged = useCallback((autocomplete, field) => {
    const place = autocomplete.getPlace();
    const address = place.formatted_address || place.name;

    setLoc((prevLoc) => ({
      ...prevLoc,
      [field]: address,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLoc(e); 
    setShowRiderList(true); 
  };
  

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="form-section">
          <h2>Enter Your Ride Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="startLocation">Start Location</label>
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocomplete.setComponentRestrictions({
                    country: ["in"],
                  });
                  window.autocompleteStart = autocomplete;
                }}
                onPlaceChanged={() => handlePlaceChanged(window.autocompleteStart, "startLocation")}
              >
                <input
                  ref={originRef}
                  type="text"
                  id="startLocation"
                  name="startLocation"
                  value={loc.startLocation}
                  onChange={(e) => setLoc({ ...loc, startLocation: e.target.value })}
                  placeholder="Enter start location"
                />
              </Autocomplete>
              <button
          className="button"
          onClick={(e) => {
            e.preventDefault(); 
            displayOnClick(setLoc); 
          }}
        >
          Use Current Location
        </button>
            </div>
            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocomplete.setComponentRestrictions({
                    country: ["in"],
                  });
                  window.autocompleteDestination = autocomplete;
                }}
                onPlaceChanged={() => handlePlaceChanged(window.autocompleteDestination, "destination")}
              >
                <input
                  type="text"
                  ref={destRef}
                  id="destination"
                  name="destination"
                  value={loc.destination}
                  onChange={(e) => setLoc({ ...loc, destination: e.target.value })}
                  placeholder="Enter destination"

                />
              </Autocomplete>
            </div>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="content-section">
          {!showRiderList ? (
            <img
              src="https://via.placeholder.com/400x300"
              alt="Placeholder"
              className="placeholder-image"
            />
          ) : (
            <div className="rider-list">
              <h3>Available Riders</h3>
              <ul>
                {riders.map((rider) => (
                  <li key={rider.id}>
                    <strong>{rider.name}</strong> - {rider.contact}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DriverDashboard;
