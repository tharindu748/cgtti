// import React from 'react';
// import { useAuth } from '@context/AuthContext';

// export const Header: React.FC = () => {
//   const { user, logout } = useAuth();

//   return (
//     <header className="bg-white shadow-sm border-b">
//       <div className="flex justify-between items-center px-6 py-4">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//             <span className="text-white font-bold text-sm">C</span>
//           </div>
//           <h1 className="text-xl font-semibold text-gray-800">
//             CGTTI Alumni Association
//           </h1>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <span className="text-sm text-gray-600">
//             Welcome, {user?.email}
//           </span>
//           <button
//             onClick={logout}
//             className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };
import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Left side: Logo and Title */}
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                CGTTI Alumni Admin
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Administration Panel
              </p>
            </div>
          </div>

          {/* Right side: User Info and Logout */}
          <div className="flex items-center justify-between sm:justify-end">
            {/* User Info */}
            <div className="flex items-center mr-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600 text-sm font-medium">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};