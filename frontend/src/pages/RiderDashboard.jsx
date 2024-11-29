import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { MapContext } from "../context/Map.context";
import "../pages/css/RD.css";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/Auth.context";
import { DriverContext } from "../context/Driver.context";

const RiderDashboard = () => {
  const {
    isLoaded,
    center,
    distance,
    duration,
    originRef,
    destRef,
    calculateRoute,
    clearRoute,
    displayOnClick,
    setMap,
  } = useContext(MapContext);
  const { locErr, loc, submitLoc, setLoc } = useContext(AuthContext);
  const { driverList, listError, loading } = useContext(DriverContext);

  const [showDrivers, setShowDrivers] = useState(false); 
  const driverListRef = useRef(null); 

  
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
    setShowDrivers(true); 
    driverListRef.current?.scrollIntoView({ behavior: "smooth" }); 
  };

  if (!isLoaded) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Loading Map...</h1>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="sidebar">
          {!showDrivers ? (
            <form className="form" onSubmit={handleSubmit}>
              <h2 className="form-title">Rider Form</h2>

              <div className="input-group">
                <label htmlFor="start">Start Location</label>
                <Autocomplete
                  onLoad={(autocomplete) => {
                    autocomplete.setComponentRestrictions({
                      country: ["in"],
                    });
                    window.autocompleteDestination = autocomplete;
                  }}
                  onPlaceChanged={() =>
                    handlePlaceChanged(window.autocompleteDestination, "startLocation")
                  }
                >
                  <input
                    id="start"
                    className="input-field"
                    type="text"
                    placeholder="Start"
                    ref={originRef}
                    value={loc.startLocation}
                    onChange={(e) =>
                      setLoc({ ...loc, startLocation: e.target.value })
                    }
                  />
                </Autocomplete>
              </div>

              <button
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  displayOnClick(setLoc);
                }}
              >
                Use Current Location
              </button>

              <div className="input-group">
                <label htmlFor="destination">Destination</label>
                <Autocomplete
                  onLoad={(autocomplete) => {
                    autocomplete.setComponentRestrictions({
                      country: ["in"],
                    });
                    window.autocompleteStart = autocomplete;
                  }}
                  onPlaceChanged={() =>
                    handlePlaceChanged(window.autocompleteStart, "destination")
                  }
                >
                  <input
                    id="destination"
                    className="input-field"
                    type="text"
                    placeholder="Destination"
                    ref={destRef}
                    value={loc.destination}
                    onChange={(e) =>
                      setLoc({ ...loc, destination: e.target.value })
                    }
                  />
                </Autocomplete>
              </div>

              <div className="button-group">
                <button
                  className="button"
                  type="button"
                  onClick={() => calculateRoute(loc)}
                >
                  Calculate Route
                </button>

                <button
                  className="button"
                  type="button"
                  onClick={() => clearRoute(setLoc)}
                >
                  Clear Route
                </button>
              </div>

              <p className="info-text">
                Distance: <strong>{distance}</strong>
              </p>
              <p className="info-text">
                Duration: <strong>{duration}</strong>
              </p>

              <button className="button" type="submit">
                Find Rides
              </button>
            </form>
          ) : (
            
            <div ref={driverListRef} className="driver-list-container">
              {loading && <p>Loading drivers...</p>}
              {!loading && listError && <p className="error-text">{listError}</p>}
              <p>Available Drivers</p>
              {!loading && !listError && driverList.length > 0 && (
                <ul className="driver-list">
                  {driverList.map((driver, index) => (
                    <li key={index} className="driver-item">
                      <strong>{driver.gender=='Male'? 'Mr' : 'Miss'} {driver.name} </strong><br /><br/>
                      <strong>Journey from </strong> {driver.startLocation} <br />
                      <strong>Heading to</strong> {driver.destination}<br/><br/>
                      <strong>Contact number</strong> {driver.phoneNumber} <br /><br/>
                      <strong>Car details</strong> {driver.make} <br /> {driver.licensePlateNumber} {driver.colour?", in color":""}<br/>
                      <strong>Available seats</strong> {driver.seatsAvailable} <br />
                    </li>
                  ))}
                </ul>
              )}
              {!loading && !listError && driverList.length === 0 && (
                <p>No drivers found for your route.</p>
              )}
            </div>
          )}
        </div>

        
        <div className="map-container">
          <GoogleMap
            center={center || { lat: 0, lng: 0 }}
            zoom={13}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            onLoad={(map) => {
              setMap(map);
            }}
          >
            {center && <Marker position={center} title="Your Location" />}
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default RiderDashboard;
