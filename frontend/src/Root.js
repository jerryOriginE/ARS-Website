// src/Root.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#eef5e6',
      paper: '#ffffff',
    },
    text: {
      primary: '#32412a',
    },
    primary: {
      main: '#5c7f2a',
    },
  },
  shape: {
    borderRadius: 16,
  },
});

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          background: 'linear-gradient(180deg, #eef5e6 0%, #edf5e4 100%)',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <App />
      </div>
    </ThemeProvider>
  );
}

export default Root;
