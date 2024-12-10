import { createContext, useContext, useEffect, useState } from "react";
import { getRequest } from "../services/Service";

export const DriverContext = createContext();

export const DriverContextProvider = ({ children }) => {
  const [driverList, setDriverList] = useState([]); 
  const [listError, setListError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("Driver List:", driverList);
    console.log("Loading:", loading);
    console.log("Error:", listError);
  }, [driverList, loading, listError]);
  
  useEffect(() => {
    const fetchDriverList = async () => {
      try {
        // setLoading(true);
        const response = await getRequest("driver/fetch-rider-detail"); 
        console.log(response);
        if (response.error) {
          setListError(response.message);
          setDriverList([]); 
        } else {
          // setLoading(false)
          setDriverList(response); 
        }
      } catch (error) {
        setListError("An unexpected error occurred.");
        setDriverList([]);
        // setLoading(false)
      } 
    };

    fetchDriverList();
  }, []); 

  return (
    <DriverContext.Provider
      value={{
        driverList,
        listError, 
        loading, 
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};
