import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './Root';
import reportWebVitals from './reportWebVitals';
import { AlertProvider } from './context/AlertContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider>
    <Root />
  </AlertProvider>
);

// Optional performance logging
reportWebVitals();

// PWA: Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
