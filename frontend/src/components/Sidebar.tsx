import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, Users, 
  FileText, BarChart3, Settings, 
  LogOut, Bell, HelpCircle, Calendar,
  Briefcase, Award, HeartHandshake,
  ChevronRight, ChevronLeft, Home,
  Building, GraduationCap, Mail,
  Shield, Database, UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { user, logout } = useAuth();

  const menuItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" />,
      notification: 3
    },
    { 
      path: '/profile', 
      label: 'My Profile', 
      icon: <UserCheck className="w-5 h-5" />
    },
    { 
      path: '/members', 
      label: 'Members Directory', 
      icon: <Users className="w-5 h-5" />,
      submenu: [
        { path: '/members', label: 'All Members' },
        // { path: '/members/batchmates', label: 'Batchmates' },
        { path: '/members/search', label: 'Search Alumni' },
      ]
    },
    { 
      path: '/letters', 
      label: 'Letters & Docs', 
      icon: <FileText className="w-5 h-5" />,
      badge: 'New'
    },
    { 
      path: '/reports', 
      label: 'Analytics', 
      icon: <BarChart3 className="w-5 h-5" />
    },
    { 
      path: '/events', 
      label: 'Events', 
      icon: <Calendar className="w-5 h-5" />,
      notification: 5
    },
    { 
      path: '/jobs', 
      label: 'Career Portal', 
      icon: <Briefcase className="w-5 h-5" />
    },
    { 
      path: '/mentorship', 
      label: 'Mentorship', 
      icon: <HeartHandshake className="w-5 h-5" />
    },
    { 
      path: '/settings', 
      label: 'Settings', 
      icon: <Settings className="w-5 h-5" />
    },
  ];

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      
      if (isOpen && 
          sidebar && 
          !sidebar.contains(event.target as Node) && 
          mobileMenuButton && 
          !mobileMenuButton.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="mobile-menu-button"
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-rotateIn" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="sidebar"
        className={`
          bg-gradient-to-b from-white to-gray-50 border-r border-gray-200/50
          min-h-screen fixed md:relative z-40
          transition-all duration-500 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-72'}
          shadow-xl md:shadow-lg
          flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center w-full' : ''}`}>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform hover:rotate-3 transition-all duration-500">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            
            {/* Desktop Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors transform hover:scale-110"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Collapsed User Profile */}
          {isCollapsed && (
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={item.path}>
                {item.submenu ? (
                  // Item with submenu
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group
                        ${location.pathname.startsWith(item.path)
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                        }
                        ${isCollapsed ? 'justify-center px-3' : ''}
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${location.pathname.startsWith(item.path) ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'}`}>
                          {item.icon}
                        </div>
                        {!isCollapsed && (
                          <span className="font-medium">{item.label}</span>
                        )}
                      </div>
                      
                      {!isCollapsed && (
                        <div className="flex items-center space-x-2">
                          {item.notification && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                              {item.notification}
                            </span>
                          )}
                          {item.badge && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeSubmenu === item.label ? 'rotate-90' : ''}`} />
                        </div>
                      )}
                      
                      {isCollapsed && item.notification && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {!isCollapsed && activeSubmenu === item.label && (
                      <div className="ml-12 mt-1 space-y-1 animate-slideDown">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <ChevronRight className="w-3 h-3 mr-2" />
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular menu item
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group relative
                      ${location.pathname === item.path
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                      }
                      ${isCollapsed ? 'justify-center px-3' : ''}
                    `}
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={location.pathname === item.path ? 'text-white' : 'text-gray-500 group-hover:text-blue-500'}>
                        {item.icon}
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </div>
                    
                    {!isCollapsed && item.notification && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                        {item.notification}
                      </span>
                    )}
                    
                    {!isCollapsed && item.badge && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    
                    {isCollapsed && item.notification && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>
                    )}
                    
                    {/* Active indicator */}
                    {location.pathname === item.path && !isCollapsed && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200"></div>

          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="space-y-2 animate-slideIn" style={{ animationDelay: '0.5s' }}>
              <div className="px-4 py-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Actions</h4>
              </div>
              {[
                { icon: <Bell className="w-4 h-4" />, label: 'Notifications', path: '/notifications', count: 5 },
                { icon: <HelpCircle className="w-4 h-4" />, label: 'Help Center', path: '/help' },
                { icon: <GraduationCap className="w-4 h-4" />, label: 'Resources', path: '/resources' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-500 group-hover:text-blue-500">{item.icon}</div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200/50">
          {/* Collapsed Logout Button */}
          {isCollapsed ? (
            <button
              onClick={handleLogout}
              className="w-full p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors flex justify-center"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          ) : (
            // Expanded Footer
            <>
              <Link
                to="/home"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-colors mb-3 group"
              >
                <Home className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                <span className="font-medium">Back to Home</span>
              </Link>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-500">Secure • v2.1</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium group"
                >
                  <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
          animation-fill-mode: both;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .animate-rotateIn {
          animation: rotateIn 0.3s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3B82F6, #8B5CF6);
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563EB, #7C3AED);
        }
      `}</style>
    </>
  );
};