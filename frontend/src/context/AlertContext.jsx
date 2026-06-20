import React, { createContext, useState, useContext } from 'react';
import CustomAlert from '../components/CustomAlert';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const showAlert = (message, severity = 'info') => {
    setAlert({ open: true, message, severity });
  };

  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert
        open={alert.open}
        onClose={handleClose}
        message={alert.message}
        severity={alert.severity}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
