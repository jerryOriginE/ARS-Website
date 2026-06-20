import ProtectedRoute from './components/ProtectedRoute';

// inside <Routes> ...
<Route
  path="/admin"
  element={
    <ProtectedRoute>
    </ProtectedRoute>
  }
/>
