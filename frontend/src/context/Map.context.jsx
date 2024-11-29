import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useJsApiLoader, Autocomplete, GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  const GOOGLE_LIBRARIES = ['places'];
  const { isLoaded } = useJsApiLoader({
    libraries: GOOGLE_LIBRARIES,
    googleMapsApiKey : import.meta.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAKckLtzkW_InJ7MZq7q0YhCHvXrb_qA0o'
  });
  
  const [center, setCenter] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState('');

  const originRef = useRef();
  const destRef = useRef();
  const directionRendererRef = useRef(null);

  useEffect(() => {
    if (isLoaded && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const userPos = { lat: latitude, lng: longitude };
          setCenter(userPos);
          setUserLocation(`${latitude},${longitude}`);
        },
        (error) => {
          console.log('Error getting location', error);
        }
      );
    }
  }, [isLoaded]);

  const userMarker = useRef(null);
  useEffect(() => {
    if (map && center) {
      if (!userMarker.current) {
        userMarker.current = new window.google.maps.Marker({
          position: center,
          map: map,
          title: "your location",
        });
      } else {
        userMarker.current.setPosition(center);
      }
      map.setCenter(center);
    }
  }, [map, center]);

  async function displayOnClick(setLoc) {
    if (userLocation) {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAKckLtzkW_InJ7MZq7q0YhCHvXrb_qA0o';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const address = data.results[0].formatted_address;
        setLoc((prevLoc) => ({
          ...prevLoc,
          startLocation: address, 
        }));
      } else {
        console.error("error retrieving address", data.status);
      }
    }
  }

  
  const calculateRoute = async (loc) => {
    if (!loc.startLocation || !loc.destination) {
      console.error("Start location or destination is missing.");
      return;
    }
  
    const geocoder = new window.google.maps.Geocoder();
    const directionsService = new window.google.maps.DirectionsService();
  
    try {
      const startCoords = await geocodeAddress(geocoder, loc.startLocation);
      const destCoords = await geocodeAddress(geocoder, loc.destination);
  
      const results = await directionsService.route({
        origin: startCoords,
        destination: destCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
  
      setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
        if (directionRendererRef.current) {
              directionRendererRef.current.setMap(null);
            }
            directionRendererRef.current = new window.google.maps.DirectionsRenderer({
              directions: results,
              map: map,
            });

      findPlacesAlongRoute(results);
    } catch (error) {
      console.error("Error calculating route:", error.message);
    }
  };
  
  const geocodeAddress = (geocoder, address) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location);
        } else {
          console.error("Geocode failed:", status);
          reject(status);
        }
      });
    });
  };
  

  const findPlacesAlongRoute = async (route) => {
    const service = new window.google.maps.places.PlacesService(map);
    const path = route.routes[0].overview_path;
    const allPlaces = [];

    for (let i = 0; i < path.length; i += 5) {
      const request = {
        location: path[i],
        radius: '5000',
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          allPlaces.push(...results);
          setPlaces(allPlaces);
        }
      });
    } console.log(allPlaces)
  };

  const clearRoute = (setLoc) => {
    if (directionRendererRef.current) {
      directionRendererRef.current.setMap(null);
      directionRendererRef.current = null;
    }
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destRef.current.value = '';
    setLoc({
      startLocation: '',
      destination: '',
    });
  };

  return (
    <MapContext.Provider
      value={{
        isLoaded,
        center,
        map,
        setMap,
        directionsResponse,
        distance,
        duration,
        places,
        originRef,
        destRef,
        calculateRoute,
        clearRoute,
        displayOnClick
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
