import { decode } from 'jwt-decode';
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  let isAuthenticated = false;

  try {
    if (token) {
      const decoded = decode(token);
      // Add additional checks if needed
      isAuthenticated = !!decoded;
    }
  } catch (err) {
    console.error('Failed to decode token', err);
  }

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Component : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
