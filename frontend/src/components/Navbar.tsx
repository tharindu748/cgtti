import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, LogIn, ChevronDown, 
  User, Bell, Search, Home, Users, Calendar, 
  Image as ImageIcon, Shield, Mail, Globe, 
  Award, BookOpen, Briefcase, HeartHandshake
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: BookOpen },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/gallery', label: 'Gallery', icon: ImageIcon },
    { path: '/membership', label: 'Membership', icon: Shield },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

  // German flag colors
  const germanColors = {
    black: '#000000',
    red: '#DD0000',
    gold: '#FFCC00'
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-2 border-b border-gray-200/20' 
            : 'bg-gradient-to-b from-white to-white/95 py-3 shadow-lg'
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with German Flag Design */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group relative"
              onClick={() => setIsOpen(false)}
            >
              {/* German Flag Inspired Logo */}
              <div className="relative">
                <div className="relative w-14 h-14 bg-gradient-to-b from-black via-red-600 to-yellow-500 rounded-2xl overflow-hidden transform group-hover:rotate-3 transition-all duration-500 shadow-xl border-2 border-gray-800">
                  {/* German Flag Stripes */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-black"></div>
                  <div className="absolute top-1/3 left-0 right-0 h-1/3 bg-red-600"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-yellow-500"></div>
                  
                  {/* CGTTI Initials */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-xl drop-shadow-lg">CG</span>
                  </div>
                  
                  {/* Eagle Silhouette (German Symbol) */}
                  <div className="absolute -right-1 -top-1 opacity-20">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L9 8L12 14L15 8L12 2Z" />
                    </svg>
                  </div>
                </div>
                
                {/* Animated Ring */}
                <div className="absolute -inset-3 border-2 border-yellow-400/30 rounded-3xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Text Logo */}
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                <div className="flex items-baseline space-x-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-black via-red-600 to-yellow-600 bg-clip-text text-transparent">
                    CGTTI
                  </h1>
                  <span className="text-xs font-semibold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                    ALUMNI
                  </span>
                </div>
                <p className="text-xs text-gray-600 tracking-wider mt-1 font-medium">
                  CEYLON GERMAN TECHNICAL TRAINING INSTITUTE
                </p>
              </div>
            </Link>

            {/* Desktop Navigation with German Color Scheme */}
            <div className="hidden xl:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div 
                  key={item.path}
                  className="relative"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Link
                    to={item.path}
                    className={`
                      relative px-5 py-3 text-sm font-semibold transition-all duration-300
                      ${location.pathname === item.path
                        ? 'text-black'
                        : 'text-gray-700 hover:text-black'
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </span>
                    
                    {/* German Flag Inspired Underline */}
                    <span className={`
                      absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-red-600 to-yellow-500
                      transition-all duration-500 rounded-full
                      ${location.pathname === item.path ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}
                    `}></span>
                    
                    {/* Hover Background Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Desktop Action Buttons with German Theme */}
            <div className="hidden xl:flex items-center space-x-3">
              {/* Join Button with German Colors */}
              <Link
                to="/join"
                className="group relative overflow-hidden bg-gradient-to-r from-black via-red-700 to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-500 transform hover:scale-105 shadow-lg"
              >
                <span className="relative z-10 flex items-center">
                  <Users className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Join Network
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-red-700 to-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>

              {/* Search Bar */}
              <div className="relative group">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search alumni..."
                    className="w-56 pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl border-2 border-transparent focus:outline-none focus:border-yellow-400 focus:bg-white transition-all duration-300 focus:w-64"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 group-hover:text-red-600 transition-colors" />
                </div>
              </div>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2.5 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-yellow-400"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-black via-red-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {user.name?.charAt(0).toUpperCase() || 'A'}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                        {user.name?.split(' ')[0] || 'Alumni'}
                      </p>
                      <p className="text-xs text-gray-500">Class of {user.year || '--'}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden animate-slideDown origin-top-right backdrop-blur-sm">
                      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-black via-red-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {user.name?.charAt(0).toUpperCase() || 'A'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-800 truncate">{user.name || 'Alumni Member'}</p>
                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                            <div className="mt-1 flex items-center">
                              <span className="px-2 py-1 bg-gradient-to-r from-yellow-100 to-red-100 text-yellow-800 text-xs font-semibold rounded-full">
                                Verified Alumni
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <button
                          onClick={() => {
                            navigate('/dashboard');
                            setShowUserMenu(false);
                          }}
                          className="flex items-center w-full px-5 py-3.5 text-left text-gray-700 hover:bg-gradient-to-r from-gray-50 to-yellow-50 hover:text-black transition-all duration-300 group border-b border-gray-100/50"
                        >
                          <LayoutDashboard className="w-5 h-5 mr-3 text-gray-500 group-hover:text-yellow-600" />
                          <div>
                            <p className="font-semibold">Dashboard</p>
                            <p className="text-xs text-gray-500 mt-0.5">View your alumni profile</p>
                          </div>
                        </button>
                        
                        <button className="flex items-center w-full px-5 py-3.5 text-left text-gray-700 hover:bg-gradient-to-r from-gray-50 to-yellow-50 hover:text-black transition-all duration-300 group border-b border-gray-100/50">
                          <Briefcase className="w-5 h-5 mr-3 text-gray-500 group-hover:text-yellow-600" />
                          <div>
                            <p className="font-semibold">Career Portal</p>
                            <p className="text-xs text-gray-500 mt-0.5">Job opportunities</p>
                          </div>
                        </button>
                        
                        <button className="flex items-center w-full px-5 py-3.5 text-left text-gray-700 hover:bg-gradient-to-r from-gray-50 to-yellow-50 hover:text-black transition-all duration-300 group border-b border-gray-100/50">
                          <Bell className="w-5 h-5 mr-3 text-gray-500 group-hover:text-yellow-600" />
                          <div className="flex-1 flex items-center justify-between">
                            <div>
                              <p className="font-semibold">Notifications</p>
                              <p className="text-xs text-gray-500 mt-0.5">Updates & events</p>
                            </div>
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">5</span>
                          </div>
                        </button>
                      </div>
                      
                      <div className="p-3 bg-gradient-to-r from-gray-50 to-white">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-semibold border border-red-200 hover:border-red-300"
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
                  className="group relative overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-500 transform hover:scale-105 shadow-lg"
                >
                  <span className="relative z-10 flex items-center">
                    <LogIn className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Alumni Login
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-yellow-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center space-x-3">
              <button className="p-2.5 text-gray-600 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 text-gray-600 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100 relative group"
              >
                {isOpen ? (
                  <X className="w-6 h-6 animate-rotateIn" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
                {/* Notification Dot */}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay - Full Screen German Design */}
      {isOpen && (
        <div className="xl:hidden">
          {/* Backdrop with German Theme */}
          <div 
            className="fixed inset-0 bg-gradient-to-br from-black/20 via-red-600/10 to-yellow-500/5 backdrop-blur-lg z-40 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-all duration-500 animate-slideInRight overflow-y-auto">
            {/* German Flag Header */}
            <div className="relative h-32 bg-gradient-to-b from-black via-red-600 to-yellow-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Logo and Title */}
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-2xl">
                    <span className="text-black font-bold text-xl">CG</span>
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold">CGTTI Alumni</h2>
                    <p className="text-white/80 text-sm">Ceylon German Technical Institute</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile Section */}
            {user ? (
              <div className="px-6 -mt-8 mb-6">
                <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-black via-red-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {user.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{user.name || 'Alumni Member'}</h3>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-100 to-red-100 text-yellow-800 text-xs font-semibold rounded-full">
                          Premium Member
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-6 -mt-8 mb-6">
                <div className="bg-gradient-to-r from-black via-red-700 to-yellow-600 rounded-2xl shadow-xl p-5 text-white">
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-2">Join Our Alumni Network</h3>
                    <p className="text-white/80 text-sm mb-4">Connect with fellow graduates and access exclusive benefits</p>
                    <Link
                      to="/join"
                      className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Menu */}
            <div className="px-6 py-4">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300
                      ${location.pathname === item.path
                        ? 'bg-gradient-to-r from-gray-50 to-yellow-50 text-black border-l-4 border-yellow-500 shadow-md'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                      }
                    `}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                        location.pathname === item.path 
                          ? 'bg-gradient-to-r from-yellow-100 to-red-100' 
                          : 'bg-gray-100'
                      }`}>
                        <item.icon className={`w-5 h-5 ${
                          location.pathname === item.path ? 'text-yellow-600' : 'text-gray-500'
                        }`} />
                      </div>
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    {location.pathname === item.path && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <button 
                  className="bg-gradient-to-r from-gray-900 to-black text-white p-4 rounded-xl text-center hover:shadow-lg transition-all"
                  onClick={handleAuthClick}
                >
                  <LogIn className="w-5 h-5 mx-auto mb-2" />
                  <span className="text-sm font-semibold">Alumni Login</span>
                </button>
                
                <Link 
                  to="/events" 
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-xl text-center hover:shadow-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar className="w-5 h-5 mx-auto mb-2" />
                  <span className="text-sm font-semibold">Events</span>
                </Link>
              </div>

              {/* Additional Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <Link to="/directory" className="group" onClick={() => setIsOpen(false)}>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-yellow-100 transition-colors">
                      <Users className="w-5 h-5 text-gray-600 group-hover:text-yellow-600" />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-black">Directory</span>
                  </Link>
                  
                  <Link to="/jobs" className="group" onClick={() => setIsOpen(false)}>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-yellow-100 transition-colors">
                      <Briefcase className="w-5 h-5 text-gray-600 group-hover:text-yellow-600" />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-black">Jobs</span>
                  </Link>
                  
                  <Link to="/mentorship" className="group" onClick={() => setIsOpen(false)}>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-yellow-100 transition-colors">
                      <HeartHandshake className="w-5 h-5 text-gray-600 group-hover:text-yellow-600" />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-black">Mentor</span>
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Global Alumni Network</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    © {new Date().getFullYear()} CGTTI Alumni Association
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Excellence in Technical Education Since 1967
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add styles for animations */}
      <style>{`
        @keyframes slideInRight {
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
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-rotateIn {
          animation: rotateIn 0.3s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        /* Custom scrollbar for mobile menu */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #000, #DD0000, #FFCC00);
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #333, #FF0000, #FFDD00);
        }
      `}</style>

    </>
  );
};