import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ProtectedRoute from './components/ProtectedRoute';

import useServerHealth from './hooks/useServerHealth';
import { useServerStatus } from './context/ServerStatusContext';
import FloatingQRButton from './components/QR/FloatingQRButton';

/*
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            */

// Lazy pages
//const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Activity = lazy(() => import('./pages/Activity'));
const Settings = lazy(() => import('./pages/Settings'));

const NotificationsDrawer = lazy(() => import('./components/NotificationsDrawer'));

const Forbidden = lazy(() => import('./pages/Forbidden'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminPanel = lazy(() => import('./pages/AdminPanel'));

// <Navbar />
function AppContent() {
  useServerHealth();
  const { checked } = useServerStatus();

  if (!checked) return null; // or splash screen

  return (
    <>

      <Suspense
        fallback={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              background: 'rgba(238, 245, 230, 0.96)',
            }}
          >
            <CircularProgress sx={{ color: '#5c7f2a' }} />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <Activity />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Suspense>

    <NotificationsDrawer />
    <FloatingQRButton />
    </>
  );
}

export default AppContent;
