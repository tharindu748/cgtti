
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X } from 'lucide-react'; // Using lucide-react for icons

// export const Sidebar: React.FC = () => {
//   const location = useLocation();
//   // State to manage the visibility of the sidebar on mobile
//   const [isOpen, setIsOpen] = useState(false);

//   const menuItems = [
//     { path: '/dashboard', label: 'Dashboard', icon: '📊' },
//     { path: '/members', label: 'Members', icon: '👥' },
//     { path: '/letters', label: 'Letters', icon: '✉️' },
//     { path: '/reports', label: 'Reports', icon: '📈' },
//   ];

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       {/* 1. Mobile Menu Button (Hamburger/Close Icon) - Visible on small screens */}
//       <div className="md:hidden p-4">
//         <button
//           onClick={toggleSidebar}
//           className="text-gray-600 hover:text-blue-600 focus:outline-none"
//           aria-label={isOpen ? 'Close menu' : 'Open menu'}
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* 2. Sidebar Content */}
//       <aside
//         className={`
//           bg-white shadow-lg min-h-screen 
//           transition-transform duration-300 ease-in-out
//           fixed inset-y-0 left-0 z-30 transform 
//           md:relative md:translate-x-0 md:shadow-sm
//           ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
//           md:w-64
//         `}
//       >
//         <nav className="p-4">
//           {/* Optional: Close button inside the mobile sidebar */}
//           <div className="md:hidden flex justify-end mb-4">
//             <button
//               onClick={toggleSidebar}
//               className="text-gray-600 hover:text-blue-600 focus:outline-none"
//               aria-label="Close menu"
//             >
//               <X size={24} />
//             </button>
//           </div>

//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   // Close sidebar on mobile when an item is clicked
//                   onClick={toggleSidebar} 
//                   className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                     location.pathname === item.path
//                       ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' // Increased border for better visibility
//                       : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   <span className="text-lg">{item.icon}</span>
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       {/* 3. Overlay for mobile view - Closes sidebar when clicked outside */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
//           onClick={toggleSidebar}
//           aria-hidden="true"
//         ></div>
//       )}
//     </>
//   );
// };
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home,
  Users, 
  Mail, 
  BarChart3,
  ChevronRight,
  LogOut
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/members', label: 'Members', icon: Users },
    { path: '/letters', label: 'Letters', icon: Mail },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-white shadow-lg h-full
          fixed inset-y-0 left-0 z-40 
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:shadow-md
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64
        `}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Admin Panel</h2>
              <p className="text-xs text-gray-500">CGTTI Alumni</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center justify-between
                      px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={16} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">A</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700 truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};