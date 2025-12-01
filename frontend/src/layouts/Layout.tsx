
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Navbar } from '../components/Navbar';
// import { Footer } from '../components/Footer';
// import { Sidebar } from '../components/Sidebar';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   // Define admin routes
//   const adminRoutes = [
//     '/dashboard',
//     '/members',
//     '/letters',
//     '/reports'
//   ];

//   const isAdminRoute = adminRoutes.includes(location.pathname);

//   // If user is logged in AND on an admin route, show admin layout with sidebar
//   if (user && isAdminRoute) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="flex">
//           <Navbar />
//           <Sidebar />
//           <main className="flex-1 p-6">
//             {children}
//           </main>
//         </div>
//       </div>
//     );
//   }

//   // For public routes (non-admin) - show normal layout with Navbar/Footer
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
import { Header } from '../components/Header';

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

  // If user is logged in AND on an admin route, show admin layout with sidebar and header
  if (user && isAdminRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header (Top Navigation) */}
        <Header />
        
        {/* Main Layout with Sidebar and Content */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar - Hidden on mobile, visible on md+ screens */}
          <div className="md:w-64 md:block">
            <Sidebar />
          </div>
          
          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="max-w-full mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }

  // For public routes (non-admin) - show normal layout with Navbar/Footer
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Public Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};