// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Navbar } from '../components/Navbar';
// import { Footer } from '../components/Footer';
// import { Sidebar } from '../components/Sidebar';
// import { AdminHeader } from '../components/AdminHeader'; // Add this

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   const adminRoutes = ['/dashboard', '/members', '/letters', '/reports'];
//   const isAdminRoute = adminRoutes.includes(location.pathname);

//   if (user && isAdminRoute) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {/* Admin Header instead of regular Navbar */}
//         <AdminHeader />
//         <div className="flex">
//           <Sidebar />
//           <main className="flex-1 p-6">
//             {children}
//           </main>
//         </div>
//       </div>
//     );
//   }

//   // Public routes
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
import { AdminHeader } from '../components/AdminHeader';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Define all admin routes that should show AdminHeader + Sidebar
  const adminRoutes = [
    '/dashboard', 
    '/members', 
    '/letters', 
    '/reports',
    '/admin/eventscreate',     // Add this
    '/admin/events/edit',      // Add this for edit routes (partial match)
    '/events'                  // Add this for event registrations (partial match)
  ];
  
  // Check if current path matches any admin route
  const isAdminRoute = adminRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  // Check if user is admin (if using role-based auth)
  const isAdmin = user && user.role === 'ADMIN';

  if (user && isAdmin && isAdminRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header instead of regular Navbar */}
        <AdminHeader />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // Public routes or non-admin users
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};