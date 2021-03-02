import { createContext, useState } from 'react';

const ViewportContext = createContext([{}, () => {}]);

const ViewportContextProvider = ({ children }) => {
  const [viewport, setViewport] = useState({
    height: '100vh',
    latitude: 44.0456,
    longitude: -71.6706,
    width: '100vw',
    zoom: 8,
  });
  return (
    <ViewportContext.Provider value={[viewport, setViewport]}>
      {children}
    </ViewportContext.Provider>
  );
};

export { ViewportContext, ViewportContextProvider };
