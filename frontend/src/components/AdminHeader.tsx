import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Bell, Settings, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    // Navigate to profile page or open profile modal
    console.log('Navigate to profile');
  };

  const handleSettingsClick = () => {
    setShowDropdown(false);
    // Navigate to settings page
    console.log('Navigate to settings');
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              {/* Logo */}
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              
              {/* Title */}
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  CGTTI Alumni Management System
                </p>
              </div>
            </div>

            {/* Back to Website Button - Desktop */}
            <button
              onClick={() => navigate('/')}
              className="ml-8 hidden md:flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200"
            >
              <Home size={16} className="mr-2" />
              Back to Website
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {/* User Avatar */}
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                
                {/* User Info - Desktop */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.name || user?.email?.split('@')[0] || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role} • Administrator
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {user?.email?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user?.name || user?.email?.split('@')[0] || 'Admin User'}
                          </p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <User size={16} className="mr-3" />
                        My Profile
                      </button>
                      <button
                        onClick={handleSettingsClick}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        <Settings size={16} className="mr-3" />
                        Settings
                      </button>
                      <button
                        onClick={() => navigate('/')}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors md:hidden"
                      >
                        <Home size={16} className="mr-3" />
                        Back to Website
                      </button>
                    </div>

                    <div className="border-t border-gray-100 p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg transition-all font-medium shadow-sm"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Back to Website Button - Mobile */}
        <div className="md:hidden py-3 border-t border-gray-100">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Home size={16} className="mr-2" />
            Back to Main Website
          </button>
        </div>
      </div>
    </header>
  );
};