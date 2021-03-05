import { createContext, useState } from 'react';

const ViewportContext = createContext([{}, () => {}]);

const ViewportContextProvider = ({ children }) => {
  const [viewport, setViewport] = useState({});
  return (
    <ViewportContext.Provider value={[viewport, setViewport]}>
      {children}
    </ViewportContext.Provider>
  );
};

export { ViewportContext, ViewportContextProvider };
