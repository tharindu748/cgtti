// import React, { useState } from 'react';
// import { useAuth } from '@context/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';

// export const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await login(email, password);
//       navigate('/dashboard');
//     } catch (err: any) {
//       setError(err.response?.data?.error || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
//             <span className="text-white font-bold text-lg">C</span>
//           </div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             CGTTI Alumni Association
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Sign in to your account
//           </p>
//         </div>
        
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
//               {error}
//             </div>
//           )}
          
//           <div>
//             <label htmlFor="email" className="sr-only">
//               Email address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="input-field"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
          
//           <div>
//             <label htmlFor="password" className="sr-only">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               className="input-field"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="btn-primary w-full"
//             >
//               {loading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>

//           <div className="text-center">
//             <Link
//               to="/register"
//               className="font-medium text-blue-600 hover:text-blue-500"
//             >
//               Don't have an account? Register
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock, Mail, Eye, EyeOff, LogIn, Shield, 
  Building, GraduationCap, Sparkles, AlertCircle,
  ArrowRight, Loader
} from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [shake, setShake] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Animated background particles
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #3B82F6, #8B5CF6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      `;
      
      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight + 10;
      const endX = startX + (Math.random() - 0.5) * 200;
      const endY = -10;
      const duration = 8 + Math.random() * 10;
      const opacity = 0.2 + Math.random() * 0.3;
      
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.opacity = `${opacity}`;
      document.getElementById('particles-container')?.appendChild(particle);
      
      particle.animate([
        { transform: `translate(0, 0)`, opacity },
        { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }).onfinish = () => particle.remove();
    };

    const interval = setInterval(createParticle, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password, rememberMe);
      // Success animation before navigation
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div id="particles-container" className="absolute inset-0 pointer-events-none" />
      
      {/* Animated Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-24 h-24 border-2 border-blue-200/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${15 + i * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className={`max-w-lg w-full relative z-10 transform transition-transform duration-300 ${shake ? 'animate-shake' : ''}`}>
        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative">
          {/* Floating Header */}
          <div className="text-center mb-8 animate-slideDown">
            <div className="inline-block relative mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-3 transition-all duration-500 shadow-2xl">
                <Building className="w-10 h-10 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spinSlow" />
            </div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">
              Welcome Back to CGTTI
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Access exclusive alumni resources, networking opportunities, and professional development tools
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Card Header Gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Shield className="w-8 h-8 text-white/90" />
                  <h2 className="text-2xl font-bold text-white">Alumni Portal Login</h2>
                  <Shield className="w-8 h-8 text-white/90" />
                </div>
                <p className="text-blue-100">
                  Sign in with your registered email or training number
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Alert */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 animate-slideIn">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-red-700 font-medium">Authentication Failed</p>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {/* Email Input */}
                <div className="space-y-2 animate-slideIn" style={{ animationDelay: '0.1s' }}>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-blue-500" />
                    Email Address / Training Number
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      className="w-full px-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300 placeholder-gray-400"
                      placeholder="training-no@cgtti.lk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use your CGTTI training number or registered email
                  </p>
                </div>

                {/* Password Input */}
                <div className="space-y-2 animate-slideIn" style={{ animationDelay: '0.2s' }}>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 mr-2 text-blue-500" />
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="w-full px-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300 placeholder-gray-400 pr-12"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors">
                      <Lock className="w-5 h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between animate-slideIn" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      disabled={loading}
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600 select-none">
                      Remember me for 30 days
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <div className="animate-slideIn" style={{ animationDelay: '0.4s' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="w-5 h-5" />
                          <span>Sign in to Alumni Portal</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                </div>
              </form>

              {/* Registration Link */}
              <div className="text-center pt-6 border-t border-gray-100 animate-slideIn" style={{ animationDelay: '0.5s' }}>
                <p className="text-gray-600">
                  Not a member yet?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center group"
                  >
                    Join the Alumni Network
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure login • Encrypted connection • Privacy protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
          animation-fill-mode: both;
        }
        
        .animate-slideDown {
          animation: slideDown 0.6s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .animate-spinSlow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};