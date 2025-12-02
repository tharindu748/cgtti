// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, LayoutDashboard, LogIn, ChevronDown, 
//   User, Bell, Search, Home, Users, Calendar, 
//   Image as ImageIcon, Shield, Mail, Globe, 
//   Award, BookOpen, Briefcase, HeartHandshake
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// export const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   const navItems = [
//     { path: '/', label: 'Home', icon: Home },
//     { path: '/about', label: 'About', icon: BookOpen },
//     { path: '/events', label: 'Events', icon: Calendar },
//     { path: '/gallery', label: 'Gallery', icon: ImageIcon },
//     { path: '/membership', label: 'Membership', icon: Shield },
//     { path: '/contact', label: 'Contact', icon: Mail },
//   ];

//   // Professional color scheme
//   const colors = {
//     primary: '#0F172A',    // Navy Blue
//     secondary: '#1E40AF',  // Royal Blue
//     accent: '#DC2626',     // Crimson Red
//     light: '#3B82F6',      // Blue
//     dark: '#1E293B',       // Dark Blue
//     gold: '#F59E0B',       // Amber/Gold
//   };

//   // Scroll effect for navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleAuthClick = () => {
//     if (user) {
//       navigate('/dashboard');
//     } else {
//       navigate('/login');
//     }
//     setIsOpen(false);
//     setShowUserMenu(false);
//   };

//   const handleLogout = () => {
//     logout();
//     setShowUserMenu(false);
//     navigate('/');
//   };

//   return (
//     <>
//       <nav 
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled 
//             ? 'bg-white/95 backdrop-blur-xl shadow-xl py-2 border-b border-gray-100' 
//             : 'bg-white py-3 shadow-md'
//         }`}
//       >
//         <div className="bg-gray-900max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             {/* Logo with Professional Design */}
//             <Link 
//               to="/" 
//               className="flex items-center space-x-3 group relative"
//               onClick={() => setIsOpen(false)}
//             >
//               {/* Professional Logo */}
//               <div className="relative">
//                 <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl overflow-hidden transform group-hover:rotate-3 transition-all duration-500 shadow-lg">
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700"></div>
//                   {/* CGTTI Initials */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-white font-bold text-lg tracking-tight">CG</span>
//                   </div>
//                 </div>
                
//                 {/* Animated Ring */}
//                 <div className="absolute -inset-3 border-2 border-blue-300/30 rounded-2xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               </div>

//               {/* Text Logo */}
//               <div className="transform group-hover:translate-x-1 transition-transform duration-300">
//                 <div className="flex items-baseline space-x-2">
//                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent tracking-tight">
//                     CGTTI
//                   </h1>
//                   <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent tracking-widest">
//                     ALUMNI
//                   </span>
//                 </div>
//                 <p className="text-xs text-gray-500 tracking-wider mt-1 font-medium">
//                   Ceylon German Technical Training Institute
//                 </p>
//               </div>
//             </Link>

//             {/* Desktop Navigation with Professional Color Scheme */}
//             <div className="hidden xl:flex items-center space-x-1">
//               {navItems.map((item, index) => (
//                 <div 
//                   key={item.path}
//                   className="relative"
//                   style={{ animationDelay: `${index * 0.05}s` }}
//                 >
//                   <Link
//                     to={item.path}
//                     className={`
//                       relative px-5 py-3 text-sm font-medium transition-all duration-300
//                       ${location.pathname === item.path
//                         ? 'text-blue-700 font-semibold'
//                         : 'text-gray-700 hover:text-blue-600'
//                       }
//                     `}
//                   >
//                     <span className="relative z-10 flex items-center">
//                       <item.icon className="w-4 h-4 mr-2" />
//                       {item.label}
//                     </span>
                    
//                     {/* Professional Underline */}
//                     <span className={`
//                       absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400
//                       transition-all duration-500 rounded-full
//                       ${location.pathname === item.path ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}
//                     `}></span>
                    
//                     {/* Hover Background Effect */}
//                     <span className="absolute inset-0 bg-blue-50 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></span>
//                   </Link>
//                 </div>
//               ))}
//             </div>

//             {/* Desktop Action Buttons */}
//             <div className="hidden xl:flex items-center space-x-4">
//               {/* Search Bar */}
//               <div className="relative group">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search alumni..."
//                     className="w-56 pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 focus:w-64 focus:shadow-sm"
//                   />
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-hover:text-blue-500 transition-colors" />
//                 </div>
//               </div>

//               {/* Join Button
//               <Link
//                 to="/join"
//                 className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-500 transform hover:scale-105 shadow-md"
//               >
//                 <span className="relative z-10 flex items-center">
//                   <Users className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
//                   Join Network
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
//               </Link> */}

//               {/* User Menu */}
//               {user ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowUserMenu(!showUserMenu)}
//                     className="flex items-center space-x-3 bg-white px-4 py-2.5 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-blue-300 hover:shadow-sm"
//                   >
//                     <div className="relative">
//                       <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
//                         {user.name?.charAt(0).toUpperCase() || 'A'}
//                       </div>
//                       <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                     </div>
//                     <div className="text-left">
//                       <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
//                         {user.name?.split(' ')[0] || 'Alumni'}
//                       </p>
//                       <p className="text-xs text-gray-500">Class of {user.year || '--'}</p>
//                     </div>
//                     <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
//                   </button>

//                   {/* Dropdown Menu */}
//                   {showUserMenu && (
//                     <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-slideDown origin-top-right">
//                       <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
//                             {user.name?.charAt(0).toUpperCase() || 'A'}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="font-semibold text-gray-800 truncate text-sm">{user.name || 'Alumni Member'}</p>
//                             <p className="text-gray-500 text-xs truncate">{user.email}</p>
//                             <div className="mt-1">
//                               <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
//                                 Verified Alumni
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="py-2">
//                         <button
//                           onClick={() => {
//                             navigate('/dashboard');
//                             setShowUserMenu(false);
//                           }}
//                           className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm"
//                         >
//                           <LayoutDashboard className="w-4 h-4 mr-3 text-gray-400" />
//                           Dashboard
//                         </button>
                        
//                         <button className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm">
//                           <Briefcase className="w-4 h-4 mr-3 text-gray-400" />
//                           Career Portal
//                         </button>
                        
//                         <button className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm">
//                           <Bell className="w-4 h-4 mr-3 text-gray-400" />
//                           <div className="flex-1 flex items-center justify-between">
//                             <span>Notifications</span>
//                             <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">5</span>
//                           </div>
//                         </button>
//                       </div>
                      
//                       <div className="p-3 border-t border-gray-100 bg-gray-50">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 text-sm font-medium border border-red-200 hover:border-red-300"
//                         >
//                           Sign Out
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onClick={handleAuthClick}
//                   className="group relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-500 transform hover:scale-105 shadow-md"
//                 >
//                   <span className="relative z-10 flex items-center">
//                     <LogIn className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
//                     Alumni Login
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
//                 </button>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <div className="xl:hidden flex items-center space-x-3">
//               <button 
//                 onClick={handleAuthClick}
//                 className="p-2.5 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
//               >
//                 {user ? (
//                   <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                     {user.name?.charAt(0).toUpperCase() || 'A'}
//                   </div>
//                 ) : (
//                   <LogIn className="w-5 h-5" />
//                 )}
//               </button>
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-2.5 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100 relative group"
//               >
//                 {isOpen ? (
//                   <X className="w-6 h-6 animate-rotateIn" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Navigation Overlay */}
//       {isOpen && (
//         <div className="xl:hidden">
//           {/* Backdrop */}
//           <div 
//             className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fadeIn"
//             onClick={() => setIsOpen(false)}
//           />
          
//           {/* Mobile Menu Panel */}
//           <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-all duration-500 animate-slideInRight overflow-y-auto">
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
//                     <span className="text-blue-700 font-bold text-lg">CG</span>
//                   </div>
//                   <div>
//                     <h2 className="text-lg font-bold">CGTTI Alumni</h2>
//                     <p className="text-white/80 text-xs">Ceylon German Technical Institute</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Quick Search */}
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search alumni, events..."
//                   className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:border-white/50"
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
//               </div>
//             </div>

//             {/* User Profile Section */}
//             {user && (
//               <div className="px-6 py-4 border-b border-gray-100">
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-sm">
//                       {user.name?.charAt(0).toUpperCase() || 'A'}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-gray-800">{user.name || 'Alumni Member'}</h3>
//                       <p className="text-gray-500 text-sm">{user.email}</p>
//                       <div className="mt-1 flex items-center">
//                         <span className="text-xs text-blue-600 font-medium">Premium Member</span>
//                         <div className="ml-2 w-2 h-2 bg-green-500 rounded-full"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Navigation Menu */}
//             <div className="px-6 py-4">
//               <div className="space-y-1">
//                 {navItems.map((item, index) => (
//                   <Link
//                     key={item.path}
//                     to={item.path}
//                     className={`
//                       flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200
//                       ${location.pathname === item.path
//                         ? 'bg-blue-50 text-blue-700 border-l-3 border-blue-500'
//                         : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
//                       }
//                     `}
//                     style={{ animationDelay: `${index * 0.05}s` }}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="flex items-center">
//                       <div className={`w-9 h-9 rounded-lg flex items-center justify-center mr-3 ${
//                         location.pathname === item.path 
//                           ? 'bg-blue-100 text-blue-600' 
//                           : 'bg-gray-100 text-gray-600'
//                       }`}>
//                         <item.icon className="w-4 h-4" />
//                       </div>
//                       <span className="font-medium">{item.label}</span>
//                     </div>
//                     {location.pathname === item.path && (
//                       <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                     )}
//                   </Link>
//                 ))}
//               </div>

//               {/* Action Buttons */}
//               <div className="mt-6 space-y-3">
//                 <Link
//                   to="/join"
//                   className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Join Alumni Network
//                 </Link>

//                 {!user && (
//                   <button
//                     onClick={handleAuthClick}
//                     className="block w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-3.5 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all duration-300 shadow-md hover:shadow-lg"
//                   >
//                     Alumni Login
//                   </button>
//                 )}
//               </div>

//               {/* Quick Links */}
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <h4 className="text-sm font-semibold text-gray-800 mb-4">Quick Links</h4>
//                 <div className="grid grid-cols-3 gap-3">
//                   <Link 
//                     to="/directory" 
//                     className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
//                       <Users className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <span className="text-xs text-gray-600 group-hover:text-blue-600">Directory</span>
//                   </Link>
                  
//                   <Link 
//                     to="/jobs" 
//                     className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
//                       <Briefcase className="w-5 h-5 text-green-600" />
//                     </div>
//                     <span className="text-xs text-gray-600 group-hover:text-green-600">Jobs</span>
//                   </Link>
                  
//                   <Link 
//                     to="/mentorship" 
//                     className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-200 transition-colors">
//                       <HeartHandshake className="w-5 h-5 text-purple-600" />
//                     </div>
//                     <span className="text-xs text-gray-600 group-hover:text-purple-600">Mentor</span>
//                   </Link>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <div className="text-center">
//                   <div className="flex items-center justify-center space-x-2 mb-2">
//                     <Globe className="w-4 h-4 text-gray-400" />
//                     <span className="text-xs text-gray-500">Global Alumni Network</span>
//                   </div>
//                   <p className="text-xs text-gray-400">
//                     © {new Date().getFullYear()} CGTTI Alumni Association
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes slideInRight {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
        
//         @keyframes rotateIn {
//           from {
//             transform: rotate(-180deg);
//             opacity: 0;
//           }
//           to {
//             transform: rotate(0);
//             opacity: 1;
//           }
//         }
        
//         @keyframes slideDown {
//           from {
//             transform: translateY(-10px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
        
//         .animate-slideInRight {
//           animation: slideInRight 0.3s ease-out forwards;
//         }
        
//         .animate-rotateIn {
//           animation: rotateIn 0.3s ease-out forwards;
//         }
        
//         .animate-slideDown {
//           animation: slideDown 0.2s ease-out forwards;
//         }
        
//         /* Custom scrollbar for mobile menu */
//         ::-webkit-scrollbar {
//           width: 4px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 2px;
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: #c1c1c1;
//           border-radius: 2px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: #a1a1a1;
//         }
//       `}</style>
//     </>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, LogIn, ChevronDown, 
  User, Bell, Search, Home, Users, Calendar, 
  Image as ImageIcon, Shield, Mail, Globe, 
  Award, BookOpen, Briefcase, HeartHandshake
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import cgttiLogo from '../assest/cgtti_logo.jpg'; // Import the logo

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

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-xl py-2 border-b border-gray-100' 
            : 'bg-white py-3 shadow-md'
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with Professional Design */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group relative"
              onClick={() => setIsOpen(false)}
            >
              {/* Professional Logo with imported image */}
              <div className="relative">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden transform group-hover:scale-105 transition-all duration-500 shadow-lg">
                  {/* Logo Image */}
                  <img 
                    src={cgttiLogo} 
                    alt="CGTTI Logo" 
                    className="w-full h-full object-contain p-1 bg-white"
                  />
                  
                  {/* Overlay for hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-blue-600/20 transition-all duration-500"></div>
                </div>
                
                {/* Animated Ring */}
                <div className="absolute -inset-3 border-2 border-blue-300/30 rounded-2xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Text Logo */}
              <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                <div className="flex items-baseline space-x-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent tracking-tight">
                    CGTTI
                  </h1>
                  <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent tracking-widest">
                    ALUMNI
                  </span>
                </div>
                <p className="text-xs text-gray-500 tracking-wider mt-1 font-medium">
                  Ceylon German Technical Training Institute
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
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
                      relative px-5 py-3 text-sm font-medium transition-all duration-300
                      ${location.pathname === item.path
                        ? 'text-blue-700 font-semibold'
                        : 'text-gray-700 hover:text-blue-600'
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </span>
                    
                    {/* Professional Underline */}
                    <span className={`
                      absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400
                      transition-all duration-500 rounded-full
                      ${location.pathname === item.path ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}
                    `}></span>
                    
                    {/* Hover Background Effect */}
                    <span className="absolute inset-0 bg-blue-50 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden xl:flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative group">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search alumni..."
                    className="w-56 pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-300 focus:w-64 focus:shadow-sm"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 bg-white px-4 py-2.5 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-blue-300 hover:shadow-sm"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                        {user.name?.charAt(0).toUpperCase() || 'A'}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {user.name?.split(' ')[0] || 'Alumni'}
                      </p>
                      <p className="text-xs text-gray-500">Class of {user.year || '--'}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-slideDown origin-top-right">
                      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                            {user.name?.charAt(0).toUpperCase() || 'A'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 truncate text-sm">{user.name || 'Alumni Member'}</p>
                            <p className="text-gray-500 text-xs truncate">{user.email}</p>
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
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
                          className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-3 text-gray-400" />
                          Dashboard
                        </button>
                        
                        <button className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm">
                          <Briefcase className="w-4 h-4 mr-3 text-gray-400" />
                          Career Portal
                        </button>
                        
                        <button className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm">
                          <Bell className="w-4 h-4 mr-3 text-gray-400" />
                          <div className="flex-1 flex items-center justify-between">
                            <span>Notifications</span>
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">5</span>
                          </div>
                        </button>
                      </div>
                      
                      <div className="p-3 border-t border-gray-100 bg-gray-50">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 text-sm font-medium border border-red-200 hover:border-red-300"
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
                  className="group relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-500 transform hover:scale-105 shadow-md"
                >
                  <span className="relative z-10 flex items-center">
                    <LogIn className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Alumni Login
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center space-x-3">
              <button 
                onClick={handleAuthClick}
                className="p-2.5 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                {user ? (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                ) : (
                  <LogIn className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100 relative group"
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
        <div className="xl:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-all duration-500 animate-slideInRight overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {/* Mobile Logo with Image */}
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden p-1">
                    <img 
                      src={cgttiLogo} 
                      alt="CGTTI Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">CGTTI Alumni</h2>
                    <p className="text-white/80 text-xs">Ceylon German Technical Institute</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search alumni, events..."
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:border-white/50"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
              </div>
            </div>

            {/* User Profile Section */}
            {user && (
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                      {user.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{user.name || 'Alumni Member'}</h3>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                      <div className="mt-1 flex items-center">
                        <span className="text-xs text-blue-600 font-medium">Premium Member</span>
                        <div className="ml-2 w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Menu */}
            <div className="px-6 py-4">
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200
                      ${location.pathname === item.path
                        ? 'bg-blue-50 text-blue-700 border-l-3 border-blue-500'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }
                    `}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mr-3 ${
                        location.pathname === item.path 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {location.pathname === item.path && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Link
                  to="/join"
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Join Alumni Network
                </Link>

                {!user && (
                  <button
                    onClick={handleAuthClick}
                    className="block w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-3.5 rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Alumni Login
                  </button>
                )}
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-4">Quick Links</h4>
                <div className="grid grid-cols-3 gap-3">
                  <Link 
                    to="/directory" 
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-blue-600">Directory</span>
                  </Link>
                  
                  <Link 
                    to="/jobs" 
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-green-200 transition-colors">
                      <Briefcase className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-green-600">Jobs</span>
                  </Link>
                  
                  <Link 
                    to="/mentorship" 
                    className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-200 transition-colors">
                      <HeartHandshake className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-xs text-gray-600 group-hover:text-purple-600">Mentor</span>
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Global Alumni Network</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    © {new Date().getFullYear()} CGTTI Alumni Association
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        .animate-rotateIn {
          animation: rotateIn 0.3s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out forwards;
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
          background: #c1c1c1;
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </>
  );
};