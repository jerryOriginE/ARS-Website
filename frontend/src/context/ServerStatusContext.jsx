// src/context/ServerStatusContext.jsx
import { createContext, useContext, useState } from 'react';

const ServerStatusContext = createContext();

export const ServerStatusProvider = ({ children }) => {
  const [serverOnline, setServerOnline] = useState(true);
  const [checked, setChecked] = useState(false);

  return (
    <ServerStatusContext.Provider
      value={{ serverOnline, setServerOnline, checked, setChecked }}
    >
      {children}
    </ServerStatusContext.Provider>
  );
};

export const useServerStatus = () => useContext(ServerStatusContext);
