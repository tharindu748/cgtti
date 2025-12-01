import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogIn, ChevronDown, User, Bell, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/membership', label: 'Membership' },
    { path: '/contact', label: 'Contact' },
  ];

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    setIsOpen(false);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-2xl py-2' 
            : 'bg-white py-4 shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with Animation */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-lg">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
              </div>
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CGTTI
                </h1>
                <p className="text-xs text-gray-500 tracking-wider">ALUMNI NETWORK</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div 
                  key={item.path}
                  className="relative"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link
                    to={item.path}
                    className={`
                      relative px-4 py-3 text-sm font-medium transition-all duration-300
                      ${location.pathname === item.path
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                      }
                    `}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Animated Underline */}
                    <span className={`
                      absolute bottom-0 left-1/2 transform -translate-x-1/2
                      h-0.5 bg-gradient-to-r from-blue-500 to-purple-500
                      transition-all duration-500 rounded-full
                      ${location.pathname === item.path ? 'w-3/4' : 'w-0 group-hover:w-3/4'}
                    `}></span>
                    
                    {/* Hover Background Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden lg:block relative">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search alumni..."
                  className="w-64 pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl border-2 border-transparent focus:outline-none focus:border-blue-300 focus:bg-white transition-all duration-300 focus:w-80"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/join"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10">Join Network</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-xl transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {user.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">Alumni #{user.id?.slice(0, 6)}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slideDown origin-top-right">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{user.name || 'User'}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <button
                          onClick={() => {
                            navigate('/dashboard');
                            setShowUserMenu(false);
                          }}
                          className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                          Dashboard
                        </button>
                        <button className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                          <User className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                          My Profile
                        </button>
                        <button className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                          <Bell className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                          Notifications
                          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-100 p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="group relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-2.5 rounded-xl font-medium hover:from-gray-900 hover:to-black transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center">
                    <LogIn className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Member Login
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
              >
                {isOpen ? (
                  <X className="w-6 h-6 animate-rotateIn" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-500 animate-slideIn">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-gray-800">CGTTI Alumni</h1>
                      <p className="text-xs text-gray-500">Network</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Info */}
                {user && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user.name || 'User'}</p>
                        <p className="text-sm text-gray-500">Alumni Member</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 transform hover:translate-x-2
                        ${location.pathname === item.path
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-l-4 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium">{item.label}</span>
                      {location.pathname === item.path && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-gray-100"></div>

                {/* Action Buttons */}
                <div className="space-y-3 px-2">
                  <Link
                    to="/join"
                    className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3.5 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-500 transform hover:scale-105 shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Alumni Network
                  </Link>

                  <button
                    onClick={handleAuthClick}
                    className={`w-full text-center py-3.5 rounded-xl font-medium transition-all duration-500 transform hover:scale-105 shadow-lg ${
                      user 
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
                        : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {user ? (
                        <>
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Go to Dashboard
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4 mr-2" />
                          Member Login
                        </>
                      )}
                    </div>
                  </button>

                  {user && (
                    <button
                      onClick={handleLogout}
                      className="w-full border-2 border-red-200 text-red-600 text-center py-3 rounded-xl font-medium hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100">
                <div className="text-center text-sm text-gray-500">
                  <p>© {new Date().getFullYear()} CGTTI Alumni Network</p>
                  <p className="mt-1">Connecting Generations of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add styles for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes rotateIn {
          from {
            transform: rotate(-180deg);
            opacity: 0;
          }
          to {
            transform: rotate(0);
            opacity: 1;
          }
        }
        
        @keyframes slideDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .animate-rotateIn {
          animation: rotateIn 0.3s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};