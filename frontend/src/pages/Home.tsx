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

  // Professional Unsplash images for CGTTI
  const images = {
    banner: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", // University campus
    campus: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Graduation ceremony
    workshop: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Technical workshop
    graduation: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Alumni meeting
    alumni: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Group discussion
    sports: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Team sports
    event: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Business meeting
    award: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Award ceremony
    building: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", // Institute building
  };

  // Stats counter animation
  useEffect(() => {
    const finalStats = [10000, 56, 20, 11];
    const duration = 1500;
    const steps = 60;
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
      { threshold: 0.1, rootMargin: '50px' }
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
      delay: 200 
    },
    { 
      label: 'Annual Events', 
      value: `${Math.round(animatedStats[2])}+`, 
      icon: Calendar, 
      color: 'from-emerald-500 to-teal-500',
      delay: 400 
    },
    { 
      label: 'Technical Trades', 
      value: `${Math.round(animatedStats[3])}+`, 
      icon: Briefcase, 
      color: 'from-amber-500 to-orange-500',
      delay: 600 
    },
  ];

  const notices = [
    {
      title: '56th Anniversary Celebration',
      description: 'Join us for CGTTI\'s 56th anniversary celebrations on March 15th, 2024',
      type: 'event',
      date: 'Mar 15, 2024'
    },
    {
      title: 'Annual Membership Drive',
      description: 'Renew your 2024 membership and enjoy exclusive benefits',
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

  const galleryImages = [
    { id: 1, src: images.graduation, alt: 'CGTTI Graduation Ceremony' },
    { id: 2, src: images.workshop, alt: 'Technical Workshop Session' },
    { id: 3, src: images.sports, alt: 'Annual Sports Meet' },
    { id: 4, src: images.alumni, alt: 'Alumni Networking Session' },
    { id: 5, src: images.campus, alt: 'CGTTI Campus View' },
    { id: 6, src: images.event, alt: 'Annual Alumni Meet' },
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

  const cgttiTrades = [
    'Tool & Die Making',
    'Millwright',
    'Auto Mobile',
    'Boilermaker & Blacksmith',
    'Auto Electrical',
    'Refrigeration & AC',
    'Mechatronics',
    'Diesel Pump Fitting',
    'Welding',
    'Power Electrical',
    'Computer Hardware'
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
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 rounded-full opacity-5 animate-float"
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${20 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo/Badge */}
          <div className="mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-2xl mb-8 animate-pulse-gentle">
              <span className="text-3xl font-bold text-white">CGTTI</span>
            </div>
          </div>

          {/* Main Content with Staggered Animation */}
          <div className="space-y-8 mb-12">
            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight animate-slide-up">
                <span className="block">Ceylon German</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 mt-4">
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up-delayed">
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
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm text-blue-200">Explore More</span>
              <ChevronDown className="text-white/60" size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section with Reveal Animation */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900 animate-slide-right">
                  Welcome to CGTTI Alumni Association
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed animate-fade-in-up">
                  Established in 1967 under German-Sri Lankan bilateral cooperation, CGTTI has been at the 
                  forefront of technical education in Sri Lanka for over five decades. Our alumni network 
                  spans across industries, contributing significantly to Sri Lanka's industrial development.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed animate-fade-in-up-delayed">
                  With more than 10,000 skilled professionals graduated from our 11 technical trades, 
                  our alumni are leading in manufacturing, automotive, electrical, refrigeration, 
                  and various engineering sectors both locally and internationally.
                </p>
              </div>

              {/* Trades List with Animation */}
              <div className="pt-8 border-t border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 animate-slide-right-delayed">
                  Our Technical Trades
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {cgttiTrades.map((trade, index) => (
                    <div 
                      key={index}
                      className="flex items-center group"
                      style={{ animation: `slide-right 0.5s ease-out ${index * 50}ms both` }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></div>
                      <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{trade}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image with Overlay */}
            <div className="relative animate-scale-in">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-700">
                <img
                  src={images.building}
                  alt="CGTTI Main Campus"
                  className="w-full h-96 object-cover transform hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              {/* Stats Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-cyan-600 text-white p-8 rounded-2xl shadow-2xl animate-float-gentle">
                <div className="text-center">
                  <div className="text-3xl font-bold">56+</div>
                  <div className="text-sm font-medium">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 animate-pulse-gentle">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up">
              Our Guiding Principles
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-up">
              Building a stronger technical community through alumni engagement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div 
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-card-enter"
              style={{ animationDelay: '0ms' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To strengthen the bond between CGTTI and its alumni, foster lifelong learning, 
                and support the professional growth of our technical graduates while contributing 
                to national development.
              </p>
            </div>

            {/* Vision Card */}
            <div 
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-card-enter"
              style={{ animationDelay: '200ms' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most dynamic alumni network in Sri Lanka's technical education sector, 
                recognized for our contributions to industry development and skilled workforce enhancement.
              </p>
            </div>

            {/* Values Card */}
            <div 
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-card-enter"
              style={{ animationDelay: '400ms' }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-6">
                <HeartHandshake className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-3 text-gray-600">
                {['Technical Excellence', 'Professional Integrity', 'Industry Collaboration', 
                  'Continuous Learning', 'Community Service', 'Sri Lankan Pride'].map((value, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-3"></div>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4 animate-slide-up">
              CGTTI by Numbers
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto animate-fade-in-up">
              Quantifying our impact on Sri Lanka's technical education landscape
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group"
                style={{
                  animation: `fade-in-up 0.8s ease-out ${stat.delay}ms both`
                }}
              >
                <div className={`mb-6 p-6 rounded-3xl bg-gradient-to-br ${stat.color} bg-opacity-10 backdrop-blur-sm inline-block group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-12 h-12 text-white" />
                </div>
                <div className={`text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-blue-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
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
                className="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2"
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
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm font-medium">
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
                  
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              CGTTI Gallery
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Moments from campus life and alumni gatherings
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <span className="text-white font-medium text-sm">{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6">
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
                className={`${link.color} text-white p-8 rounded-3xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border border-white/10 animate-float-in`}
                style={{ animationDelay: `${link.delay}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <link.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{link.label}</h3>
                  <div className="w-12 h-1 bg-white/30 rounded-full mt-3"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-modal-enter">
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