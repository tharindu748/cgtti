
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Navbar } from '../components/Navbar';
// import { Footer } from '../components/Footer';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   // Define which routes are public (member-facing)
//   const publicRoutes = [
//     '/',
//     '/about',
//     '/events',
//     '/gallery',
//     '/membership',
//     '/contact',
//     '/join',
//     '/member-login'
//   ];

//   // Define which routes are admin (protected)
//   const adminRoutes = [
//     '/dashboard',
//     '/members',
//     '/letters',
//     '/reports',
//     '/admin/login',
//     '/admin/register'
//   ];

//   const isPublicRoute = publicRoutes.includes(location.pathname);
//   const isAdminRoute = adminRoutes.includes(location.pathname);

//   // If user is logged in AND accessing an admin route, show admin layout
//   if (user && isAdminRoute) {
//     // For admin routes, you can either:
//     // 1. Redirect to a different layout (if you have separate admin components)
//     // 2. Show minimal layout
//     return (
//       <div className="min-h-screen bg-gray-100">
//         {/* Admin Header/Sidebar would go here */}
//         <div className="p-6">
//           {children}
//         </div>
//       </div>
//     );
//   }

//   // For all public routes (including when user is logged in but viewing public pages)
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">{children}</main>
//       <Footer />
//     </div>
//   );
// };

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