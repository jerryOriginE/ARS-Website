// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // admin | mentor | student

  // 1️⃣ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Logged in but not allowed
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  // 3️⃣ Allowed
  return children;
}
