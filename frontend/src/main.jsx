import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/Auth.context.jsx";
import { MapContextProvider } from "./context/Map.context.jsx";
import { DriverContextProvider } from "./context/Driver.context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <MapContextProvider>
        <DriverContextProvider>
          <App />
        </DriverContextProvider>
      </MapContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
