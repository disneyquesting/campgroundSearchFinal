import { useState, createContext, useContext } from "react";

const GeoContext = createContext();

export function GeoContextWrapper({ children }) {
  const [geoviewport, setGeoViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 44.0456,
    longitude: -71.6706,
    zoom: 8,
  });

  const saveViewport = (values) => {
    setGeoViewport(values);
  };

  return (
    <GeoContext.Provider value={{ geoviewport, saveViewport }}>
      {children}
    </GeoContext.Provider>
  );
}

export function useGeoContext() {
  return useContext(GeoContext);
}
