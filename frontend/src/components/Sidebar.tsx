// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// export const Sidebar: React.FC = () => {
//   const location = useLocation();

//   const menuItems = [
//     { path: '/dashboard', label: 'Dashboard', icon: '📊' },
//     { path: '/members', label: 'Members', icon: '👥' },
//     { path: '/letters', label: 'Letters', icon: '✉️' },
//     { path: '/reports', label: 'Reports', icon: '📈' },
//   ];

//   return (
//     <aside className="w-64 bg-white shadow-sm min-h-screen">
//       <nav className="p-4">
//         <ul className="space-y-2">
//           {menuItems.map((item) => (
//             <li key={item.path}>
//               <Link
//                 to={item.path}
//                 className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                   location.pathname === item.path
//                     ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="font-medium">{item.label}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Using lucide-react for icons

export const Sidebar: React.FC = () => {
  const location = useLocation();
  // State to manage the visibility of the sidebar on mobile
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/members', label: 'Members', icon: '👥' },
    { path: '/letters', label: 'Letters', icon: '✉️' },
    { path: '/reports', label: 'Reports', icon: '📈' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 1. Mobile Menu Button (Hamburger/Close Icon) - Visible on small screens */}
      <div className="md:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-blue-600 focus:outline-none"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 2. Sidebar Content */}
      <aside
        className={`
          bg-white shadow-lg min-h-screen 
          transition-transform duration-300 ease-in-out
          fixed inset-y-0 left-0 z-30 transform 
          md:relative md:translate-x-0 md:shadow-sm
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
          md:w-64
        `}
      >
        <nav className="p-4">
          {/* Optional: Close button inside the mobile sidebar */}
          <div className="md:hidden flex justify-end mb-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  // Close sidebar on mobile when an item is clicked
                  onClick={toggleSidebar} 
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' // Increased border for better visibility
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* 3. Overlay for mobile view - Closes sidebar when clicked outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};