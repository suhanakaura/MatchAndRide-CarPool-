import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest,putRequest } from "../services/Service";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  
  
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);
  const [user, setUser] = useState(null);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmedPassword: "",
    role: "",
    gender: "",
    make: "",
    model: "",
    year: "",
    licensePlateNumber: "",
    licenseNumber: "",
    color: "",
    seatsAvailable: "",
    vehicleImage: "",
  });
  const validateSignupInfo = () => {
    if (signupInfo.role === "driver") {
      if (
        !signupInfo.make ||
        !signupInfo.model ||
        !signupInfo.year ||
        !signupInfo.licensePlateNumber ||
        !signupInfo.licenseNumber ||
        !signupInfo.color ||
        !signupInfo.seatsAvailable
      ) {
        setSignupError("Please fill in all required fields.");
        return false;
      }
    }
    if (
      !signupInfo.name ||
      !signupInfo.email ||
      !signupInfo.phoneNumber ||
      !signupInfo.password ||
      !signupInfo.confirmedPassword ||
      !signupInfo.role ||
      !signupInfo.gender
    ) {
      setSignupError("Please fill in all required fields.");
      return false;
    }

    if (signupInfo.password !== signupInfo.confirmedPassword) {
      setSignupError("Passwords do not match.");
      return false;
    }

    return true;
  };
  const submitSignup = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateSignupInfo()) return;
      try {
        const response = await postRequest(
          "auth/signup",
          JSON.stringify(signupInfo)
        );
        if (response.error) {
          setSignupError(response.message);
        } else {
          // localStorage.setItem("user", JSON.stringify(response));
          setUser(response);
          if (signupInfo.role === "driver") {
            navigate("/DriverDashboard");
          }else{
            navigate("/RiderDashboard")
          }
        }
      } catch (error) {
        setSignupError(error.message || "An unexpected error occurred.");
      }
    },
    [signupInfo]
  );
  
  
  const [loginError, setLoginError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const submitLogin = useCallback(
    async (e) => {
      e.preventDefault();

      
      if (!loginInfo.email || !loginInfo.password || !loginInfo.role) {
        setLoginError("All fields are required.");
        return;
      }

      try {
        const response = await postRequest(
          "auth/login",
          JSON.stringify(loginInfo)
        );
        console.log(response);

        if (response.error) {
          setLoginError(response.message);
        } else {
          if (loginInfo.role === "driver") {
            navigate("/DriverDashboard");
          }else{
            navigate("/RiderDashboard")
          }
          localStorage.setItem("user", JSON.stringify(response));
          setUser(response);
        }
      } catch (err) {
        setLoginError(err.message || "An unexpected error occurred.");
      }
    },
    [loginInfo,navigate]
  );

  const [logoutError, setLogoutError] = useState(null);
  const submitLogout = async () => {
    const response = await postRequest("auth/logout");
    console.log(response)
    if (response.error) {
      setLogoutError(response);
    } else {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/loginForm");
    }
  };

  
  const [loc, setLoc] = useState({startLocation:"",destination:""});
  const startlocation=useRef();
  const destination=useRef()
  const [locErr, setLocErr] = useState(null);
  const submitLoc = async () => {
    try {
      const response = await putRequest("auth/loc",JSON.stringify(loc));
      console.log(response)
      if (response.error) {
        setLocErr(response);
      } else {
        console.log(response)
      }
    } catch (err) {
      setLoginError(err.message || "An unexpected error occurred.");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        signupInfo,
        setSignupInfo,
        signupError,
        submitSignup,
        loginInfo,
        setLoginInfo,
        loginError,
        user,
        submitLogin,
        submitLogout,
        setLoc,
        locErr,
        loc,
        submitLoc,
        startlocation,
        destination
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
