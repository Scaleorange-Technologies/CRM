import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Admin/Dashboard';
import SignIn from './Admin/Signin';
import jwt_decode from 'jwt-decode';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUser({ email: decoded.email, role: decoded.role });
      } catch (error) {
        // Handle token decoding error
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const handleSignIn = (email) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUser({ email: decoded.email, role: decoded.role });
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <SignIn onSignIn={handleSignIn} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user && user.role === 'ceo' ? (
              <Dashboard user={user} onSignOut={handleSignOut} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;