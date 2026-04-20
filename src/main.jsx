import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FaviconLoader from "./components/FaviconLoader.jsx";
import { SiteSettingsProvider } from "./context/SiteSettingsContext.jsx";
import { HelmetProvider } from "react-helmet-async";


createRoot(document.getElementById("root")).render(
  <StrictMode>
        <HelmetProvider>  

    <FaviconLoader />
    <SiteSettingsProvider>
      <App />
    </SiteSettingsProvider>
        </HelmetProvider>

  </StrictMode>
);
