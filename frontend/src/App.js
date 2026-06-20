import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ServerStatusProvider } from './context/ServerStatusContext';
import { NotificationProvider } from './context/NotificationContext';
import AppContent from './AppContent';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <ServerStatusProvider>
          <AppContent />
        </ServerStatusProvider>
      </Router>
    </NotificationProvider>
  );
}

export default App;
