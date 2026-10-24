import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, Users, 
  FileText, BarChart3, Settings, 
  LogOut, Calendar, Briefcase, 
  HeartHandshake, ChevronRight, ChevronLeft, 
  Home, Building, Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { user, logout } = useAuth();

  // Auto-collapse logic based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  type SubmenuItem = {
    path: string;
    label: string;
  };

  type MenuItem = {
    path: string;
    label: string;
    icon: React.ReactNode;
    submenu?: SubmenuItem[];
  };

  const menuItems: MenuItem[] = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      path: '/members', 
      label: 'Members Directory', 
      icon: <Users className="w-5 h-5" />,
      submenu: [
        { path: '/members', label: 'All Members' },
        { path: '/members/search', label: 'Search Alumni' },
      ]
    },
    { 
      path: '/letters', 
      label: 'Letters & Docs', 
      icon: <FileText className="w-5 h-5" /> 
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
      submenu: [
        { path: '/admin/events', label: 'All Events' },
        { path: '/admin/eventscreate', label: 'Create Event' },
        { path: '/events/:eventId/registrations', label: 'Registrations' },
      ]
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
    }
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

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      
      if (isOpen && sidebar && !sidebar.contains(event.target as Node) && mobileMenuButton && !mobileMenuButton.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="mobile-menu-button"
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-gray-900 text-white rounded-lg shadow-md"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="sidebar"
        className={`
          bg-white border-r border-gray-200
          min-h-screen fixed md:relative z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-64'}
          flex flex-col
        `}
      >
        {/* Sidebar Header (Logo) */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
          <div className={`flex items-center w-full ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <span className="font-bold text-gray-800 text-lg tracking-wide">CGTTI</span>
              )}
            </div>
            
            {/* Desktop Toggle Button */}
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="hidden md:flex p-1 text-gray-400 hover:text-gray-600 rounded-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <div key={item.label}>
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors
                        ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                      title={isCollapsed ? item.label : ''}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                          {item.icon}
                        </div>
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>
                      {!isCollapsed && (
                        <ChevronRight className={`w-4 h-4 transition-transform ${activeSubmenu === item.label ? 'rotate-90' : ''}`} />
                      )}
                    </button>
                    
                    {/* Submenu Items */}
                    {!isCollapsed && activeSubmenu === item.label && (
                      <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-100 space-y-1">
                        {item.submenu?.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            className={`
                              block px-3 py-2 text-sm rounded-lg transition-colors
                              ${location.pathname === sub.path ? 'text-blue-600 font-medium bg-blue-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                            `}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-3 py-2.5 rounded-lg transition-colors
                      ${isActive ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                      ${isCollapsed ? 'justify-center' : 'space-x-3'}
                    `}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className={isActive ? 'text-white' : 'text-gray-400'}>
                      {item.icon}
                    </div>
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-200">
          <Link
            to="/home"
            className={`
              flex items-center px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mb-1
              ${isCollapsed ? 'justify-center' : 'space-x-3'}
            `}
            title={isCollapsed ? "Back to Website" : ""}
          >
            <Home className="w-5 h-5 text-gray-400" />
            {!isCollapsed && <span className="font-medium">Back to Website</span>}
          </Link>

          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium
              ${isCollapsed ? 'justify-center' : 'space-x-3'}
            `}
            title={isCollapsed ? "Sign Out" : ""}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Expand Button (Only shows when collapsed on Desktop) */}
        {isCollapsed && (
          <div className="hidden md:flex p-3 border-t border-gray-200 justify-center">
             <button
                onClick={() => setIsCollapsed(false)}
                className="p-1 text-gray-400 hover:text-blue-600 rounded-md bg-gray-50 hover:bg-blue-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
          </div>
        )}
      </aside>
    </>
  );
};