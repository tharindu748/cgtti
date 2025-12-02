import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Members } from '../pages/Members';
import { Home } from '../pages/Home';
import { EventsPage } from '../pages/Event';


// Temporary placeholder components
const Register = () => <div>Register Page - Coming Soon</div>;
const Letters = () => <div>Letters Page - Coming Soon</div>;
const Reports = () => <div>Reports Page - Coming Soon</div>;

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
       <Route path="/" element={<Home />} />

      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/events" 
        element={user ? <EventsPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/register" 
        element={!user ? <Register /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/members" 
        element={user ? <Members /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/letters" 
        element={user ? <Letters /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/reports" 
        element={user ? <Reports /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/" 
        element={<Navigate to={user ? "/dashboard" : "/login"} />} 
      />
    </Routes>
  );
};

export default AppRoutes;