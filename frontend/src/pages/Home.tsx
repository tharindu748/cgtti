import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Image as ImageIcon, 
  Award, 
  Target,
  Eye,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  LogIn,
  ArrowRight,
  ChevronLeft,
  ChevronRight as RightIcon,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Sparkles,
  TrendingUp,
  Clock,
  Building,
  Globe,
  ChevronDown,
  Target as TargetIcon
} from 'lucide-react';

export const Home: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Professional placeholder images
  const placeholderImages = {
    banner: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    campus: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    workshop: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    graduation: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alumni: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    sports: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    event: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  };

  // Stats counter animation
  useEffect(() => {
    const finalStats = [10000, 56, 20, 11];
    const duration = 2000;
    const steps = 100;
    const increment = finalStats.map(stat => stat / steps);
    
    const timer = setInterval(() => {
      setAnimatedStats(prev => prev.map((current, index) => {
        if (current < finalStats[index]) {
          return Math.min(current + increment[index], finalStats[index]);
        }
        return current;
      }));
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { 
      label: 'Registered Alumni', 
      value: `${Math.round(animatedStats[0]).toLocaleString()}+`, 
      icon: Users, 
      color: 'from-blue-500 to-cyan-500',
      delay: 0 
    },
    { 
      label: 'Years of Excellence', 
      value: `${Math.round(animatedStats[1])}+`, 
      icon: GraduationCap, 
      color: 'from-purple-500 to-pink-500',
      delay: 100 
    },
    { 
      label: 'Annual Events', 
      value: `${Math.round(animatedStats[2])}+`, 
      icon: Calendar, 
      color: 'from-emerald-500 to-teal-500',
      delay: 200 
    },
    { 
      label: 'Technical Trades', 
      value: `${Math.round(animatedStats[3])}+`, 
      icon: Briefcase, 
      color: 'from-amber-500 to-orange-500',
      delay: 300 
    },
  ];

  const notices = [
    {
      title: '56th Anniversary Celebration',
      description: 'Join us for CGTTI\'s 56th anniversary celebrations',
      type: 'event',
      date: 'Mar 15, 2024'
    },
    {
      title: 'Annual Membership Drive',
      description: 'Renew your 2024 membership for exclusive benefits',
      type: 'announcement',
      date: 'Dec 31, 2024'
    },
    {
      title: 'Technical Skills Workshop',
      description: 'Free workshop for alumni on emerging technologies',
      type: 'opportunity',
      date: 'Jan 25, 2024'
    },
    {
      title: 'Student Scholarship Program',
      description: 'Applications open for alumni-sponsored scholarships',
      type: 'scholarship',
      date: 'Feb 15, 2024'
    },
  ];

  const events = [
    {
      title: 'Annual Alumni Meet 2024',
      date: 'March 20, 2024',
      time: '6:00 PM - 10:00 PM',
      location: 'CGTTI Main Auditorium, Katunayake',
      description: 'Annual gathering of CGTTI alumni with special guests'
    },
    {
      title: 'Industry-Connect Workshop',
      date: 'April 15, 2024',
      time: '9:00 AM - 4:00 PM',
      location: 'CGTTI Training Center',
      description: 'Connect with industry leaders and update technical skills'
    },
    {
      title: 'Sports & Cultural Day',
      date: 'May 10, 2024',
      time: '8:00 AM - 6:00 PM',
      location: 'CGTTI Sports Ground',
      description: 'Annual sports meet and cultural show'
    },
    {
      title: 'Entrepreneurship Seminar',
      date: 'June 5, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'CGTTI Conference Hall',
      description: 'Success stories from CGTTI alumni entrepreneurs'
    },
  ];

  const quickLinks = [
    { 
      path: '/join', 
      label: 'Join Alumni', 
      icon: Users, 
      color: 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      delay: 0
    },
    { 
      path: '/events', 
      label: 'Upcoming Events', 
      icon: Calendar, 
      color: 'bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
      delay: 100
    },
    { 
      path: '/gallery', 
      label: 'Photo Gallery', 
      icon: ImageIcon, 
      color: 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      delay: 200
    },
    { 
      path: '/contact', 
      label: 'Contact Office', 
      icon: Mail, 
      color: 'bg-gradient-to-br from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
      delay: 300
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginModalOpen(false);
    setLoginData({ email: '', password: '' });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === notices.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? notices.length - 1 : prev - 1));
  };

  // Auto slide for notices
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden" ref={sectionRef}>
      {/* Elegant Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                background: `rgba(255, 255, 255, ${0.03 + Math.random() * 0.03})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Title with Staggered Animation */}
          <div className="space-y-6 mb-12">
            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight animate-slide-up">
                <span className="block">Ceylon German</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mt-2">
                  Technical Training Institute
                </span>
              </h1>
            </div>
            
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-slide-up-delayed">
                Pioneering technical excellence in Sri Lanka since 1967. 
                Join our network of 10,000+ skilled professionals shaping industries nationwide.
              </p>
            </div>
          </div>

          {/* CTA Buttons with Smooth Hover Effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/join"
              className="group relative px-10 py-4 bg-white text-blue-700 rounded-xl font-semibold text-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center">
                Join Alumni Network
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            
            <button
              onClick={() => setLoginModalOpen(true)}
              className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold text-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center">
                <LogIn className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={20} />
                Alumni Login
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <ChevronDown className="text-white/60" size={32} />
          </div>
        </div>
      </section>

      {/* Stats Section - Elegant Counter Animation */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl mb-6">
              <TargetIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Excellence in Numbers
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our journey of technical education excellence quantified
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center transform transition-all duration-700 hover:scale-105"
                style={{
                  animation: `fade-in-up 0.8s ease-out ${stat.delay}ms both`
                }}
              >
                <div className={`mb-6 p-6 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 backdrop-blur-sm inline-block`}>
                  <stat.icon className="w-12 h-12 text-gray-800" />
                </div>
                <div className={`text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Split Screen Animation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mission */}
            <div 
              className="space-y-6 transform transition-all duration-1000"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-50px)'
              }}
            >
              <div className="inline-flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To cultivate a dynamic alumni community that fosters professional growth, 
                supports institutional advancement, and contributes to Sri Lanka's 
                industrial development through technical excellence and innovation.
              </p>
              <div className="pt-6 border-t border-gray-200">
                <ul className="space-y-3">
                  {['Industry Collaboration', 'Continuous Learning', 'Professional Development', 'Community Service'].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vision */}
            <div 
              className="space-y-6 transform transition-all duration-1000"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                transitionDelay: '200ms'
              }}
            >
              <div className="inline-flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the premier alumni network in Sri Lanka's technical education sector, 
                recognized for our transformative impact on industry development, 
                skilled workforce enhancement, and national economic growth.
              </p>
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Global Reach</h4>
                </div>
                <p className="text-gray-600">
                  Our alumni network spans across 12+ countries, creating global opportunities 
                  for collaboration and knowledge exchange.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section - Card Stack Animation */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming Professional Events
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Industry-relevant workshops, networking sessions, and technical seminars
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2"
                style={{
                  animation: `card-enter 0.8s ease-out ${index * 150}ms both`
                }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-700">{event.date}</span>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links - Floating Animation */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Alumni Resources Portal
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Everything you need to stay connected and advance your career
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`${link.color} text-white p-8 rounded-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border border-white/10`}
                style={{
                  animation: `float-in 0.8s ease-out ${link.delay}ms both`
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-white/20 rounded-full backdrop-blur-sm">
                    <link.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{link.label}</h3>
                  <div className="w-8 h-1 bg-white/30 rounded-full mt-2"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal - Professional Design */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden animate-modal-enter">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                    <LogIn className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Alumni Portal</h3>
                    <p className="text-gray-500 text-sm">CGTTI Alumni Network</p>
                  </div>
                </div>
                <button
                  onClick={() => setLoginModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl text-gray-400 hover:text-gray-600">×</span>
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="alumni@cgtti.lk"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Access Alumni Dashboard
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  New to the network?{' '}
                  <Link to="/join" className="text-blue-600 font-semibold hover:text-blue-800">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};