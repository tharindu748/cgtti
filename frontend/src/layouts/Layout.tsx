
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Define admin routes
  const adminRoutes = [
    '/dashboard',
    '/members',
    '/letters',
    '/reports'
  ];

  const isAdminRoute = adminRoutes.includes(location.pathname);

  // If user is logged in AND on an admin route, show admin layout with sidebar
  if (user && isAdminRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Navbar />
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // For public routes (non-admin) - show normal layout with Navbar/Footer
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};