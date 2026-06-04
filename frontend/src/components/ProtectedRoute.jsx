// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { token, initializing } = useAuth();

//   if (initializing) return null; // AuthProvider is still loading
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, initializing } = useAuth();

  if (initializing) return null; 
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
