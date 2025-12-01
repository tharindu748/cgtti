import React, { useState, useEffect } from 'react';
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
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  LogIn,
  ArrowRight,
  ChevronLeft,
  ChevronRight as RightIcon,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Sparkles,
  Building,
  Globe,
  TrendingUp
} from 'lucide-react';

export const Home: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

  // Temporary placeholder images
  const placeholderImages = {
    banner: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    campus: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    workshop: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    graduation: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alumni: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    sports: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    event: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  };

  // Animation for stats counter
  useEffect(() => {
    const finalStats = [10000, 56, 20, 11];
    const duration = 2000; // 2 seconds
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

  const stats = [
    { label: 'Registered Alumni', value: `${Math.round(animatedStats[0]).toLocaleString()}+`, icon: Users, color: 'text-blue-600' },
    { label: 'Years of Excellence', value: `${Math.round(animatedStats[1])}+`, icon: GraduationCap, color: 'text-purple-600' },
    { label: 'Annual Events', value: `${Math.round(animatedStats[2])}+`, icon: Calendar, color: 'text-green-600' },
    { label: 'Technical Trades', value: `${Math.round(animatedStats[3])}+`, icon: Briefcase, color: 'text-orange-600' },
  ];

  const notices = [
    {
      title: '56th Anniversary Celebration',
      description: 'Join us for CGTTI\'s 56th anniversary celebrations on March 15th, 2024',
      type: 'event',
      date: 'Mar 15, 2024',
      icon: '🎉'
    },
    {
      title: 'Annual Membership Drive',
      description: 'Renew your 2024 membership and enjoy exclusive benefits',
      type: 'announcement',
      date: 'Dec 31, 2024',
      icon: '📢'
    },
    {
      title: 'Technical Skills Workshop',
      description: 'Free workshop for alumni on emerging technologies',
      type: 'opportunity',
      date: 'Jan 25, 2024',
      icon: '⚙️'
    },
    {
      title: 'Student Scholarship Program',
      description: 'Applications open for alumni-sponsored scholarships',
      type: 'scholarship',
      date: 'Feb 15, 2024',
      icon: '🎓'
    },
  ];

  const events = [
    {
      title: 'Annual Alumni Meet 2024',
      date: 'March 20, 2024',
      time: '6:00 PM - 10:00 PM',
      location: 'CGTTI Main Auditorium, Katunayake',
      description: 'Annual gathering of CGTTI alumni with special guests',
      image: placeholderImages.event
    },
    {
      title: 'Industry-Connect Workshop',
      date: 'April 15, 2024',
      time: '9:00 AM - 4:00 PM',
      location: 'CGTTI Training Center',
      description: 'Connect with industry leaders and update technical skills',
      image: placeholderImages.workshop
    },
    {
      title: 'Sports & Cultural Day',
      date: 'May 10, 2024',
      time: '8:00 AM - 6:00 PM',
      location: 'CGTTI Sports Ground',
      description: 'Annual sports meet and cultural show',
      image: placeholderImages.sports
    },
    {
      title: 'Entrepreneurship Seminar',
      date: 'June 5, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'CGTTI Conference Hall',
      description: 'Success stories from CGTTI alumni entrepreneurs',
      image: placeholderImages.alumni
    },
  ];

  const galleryImages = [
    { id: 1, src: placeholderImages.graduation, alt: 'CGTTI Graduation Ceremony' },
    { id: 2, src: placeholderImages.workshop, alt: 'Technical Workshop Session' },
    { id: 3, src: placeholderImages.sports, alt: 'Annual Sports Meet' },
    { id: 4, src: placeholderImages.alumni, alt: 'Alumni Networking Session' },
    { id: 5, src: placeholderImages.campus, alt: 'CGTTI Campus View' },
    { id: 6, src: placeholderImages.event, alt: 'Annual Alumni Meet' },
  ];

  const quickLinks = [
    { path: '/join', label: 'Join Alumni', icon: Users, color: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' },
    { path: '/events', label: 'Upcoming Events', icon: Calendar, color: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' },
    { path: '/gallery', label: 'Photo Gallery', icon: ImageIcon, color: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' },
    { path: '/contact', label: 'Contact Office', icon: Mail, color: 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800' },
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
    <div className="overflow-hidden">
      {/* Floating Animations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Login Modal with Animation */}
      {loginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                  <LogIn className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">CGTTI Alumni Login</h3>
              </div>
              <button
                onClick={() => setLoginModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email or Training Number
                </label>
                <input
                  type="text"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="training-no@cgtti.lk"
                  required
                />
              </div>
              <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] font-semibold shadow-lg hover:shadow-xl animate-slideIn"
                style={{ animationDelay: '0.3s' }}
              >
                Login to Alumni Portal
              </button>
              <p className="text-center text-sm text-gray-600 animate-slideIn" style={{ animationDelay: '0.4s' }}>
                New to alumni network?{' '}
                <Link to="/join" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Register Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Hero Banner Section with Parallax */}
      <section 
        className="relative h-[90vh] bg-cover bg-center bg-fixed overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${placeholderImages.banner})`
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-20 h-20 border-2 border-blue-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            {/* Animated Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slideDown">
              <span className="block">Ceylon German</span>
              <span className="block text-blue-400 animate-glow">Technical Training Institute</span>
            </h1>
            
            {/* Animated Subtitle */}
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <span className="inline-block animate-bounceSlow">✨</span> Connecting Generations of Skilled Professionals Since 1967 <span className="inline-block animate-bounceSlow" style={{ animationDelay: '0.5s' }}>✨</span>
            </p>
            
            {/* Animated CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <Link
                to="/join"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center animate-pulse-once"
              >
                <span>Join Alumni Network</span>
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </Link>
              
              <Link
                to="/events"
                className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
              >
                <span>View Events Calendar</span>
                <Calendar className="ml-2 inline-block group-hover:rotate-12 transition-transform" size={20} />
              </Link>
              
              <button
                onClick={() => setLoginModalOpen(true)}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center"
              >
                <LogIn className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
                <span>Alumni Login Portal</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white" />
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern animate-grid"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-slideUp">
              <Sparkles className="inline-block mr-3 animate-spinSlow" size={32} />
              CGTTI by Numbers
              <Sparkles className="inline-block ml-3 animate-spinSlow" style={{ animationDelay: '0.5s' }} size={32} />
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Our impact in Sri Lanka's technical education landscape
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300 animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-white/20 group-hover:border-blue-400 transition-all">
                    <stat.icon className={`w-12 h-12 ${stat.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-ping opacity-75">
                    <TrendingUp size={16} />
                  </div>
                </div>
                <div className="text-5xl font-bold mb-2 text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-blue-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notice Carousel with 3D Effect */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 animate-slideUp">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                Latest Announcements
              </h2>
              <p className="text-gray-600">Stay updated with CGTTI news and events</p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all"
                aria-label="Previous notice"
              >
                <ChevronLeft size={24} className="text-blue-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all"
                aria-label="Next notice"
              >
                <RightIcon size={24} className="text-blue-600" />
              </button>
            </div>
          </div>
          
          <div className="relative h-96">
            {notices.map((notice, index) => {
              const offset = (index - currentSlide + notices.length) % notices.length;
              const isActive = offset === 0;
              const isNext = offset === 1;
              const isPrev = offset === notices.length - 1;
              
              return (
                <div
                  key={index}
                  className={`absolute top-0 w-full md:w-3/4 lg:w-2/3 transition-all duration-500 ease-in-out ${
                    isActive 
                      ? 'left-1/2 transform -translate-x-1/2 z-30 scale-100 opacity-100' 
                      : isNext
                      ? 'left-3/4 transform translate-x-1/4 z-20 scale-90 opacity-70'
                      : isPrev
                      ? 'left-1/4 transform -translate-x-3/4 z-20 scale-90 opacity-70'
                      : 'opacity-0 scale-50'
                  }`}
                >
                  <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${
                    isActive ? 'border-blue-500' : 'border-gray-200'
                  }`}>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <span className="text-3xl">{notice.icon}</span>
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            notice.type === 'event' ? 'bg-blue-100 text-blue-800' :
                            notice.type === 'announcement' ? 'bg-green-100 text-green-800' :
                            notice.type === 'opportunity' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                          </span>
                        </div>
                        <span className="text-gray-500 font-medium">{notice.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {notice.title}
                      </h3>
                      <p className="text-gray-600 text-lg mb-6">{notice.description}</p>
                      <Link 
                        to="/notices" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group"
                      >
                        Read Full Story
                        <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Section with Hover Effects */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slideUp">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Upcoming Events & Workshops
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join fellow alumni for technical workshops, networking sessions, and alumni gatherings
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Event Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-blue-600">
                      {event.date}
                    </span>
                  </div>
                </div>
                
                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <ClockIcon size={16} className="mr-2 text-blue-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-blue-500" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">{event.description}</p>
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 text-sm font-semibold shadow-md hover:shadow-lg">
                      Register Now
                    </button>
                    <button className="px-4 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section with Masonry Layout */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slideUp">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              CGTTI Gallery
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Moments from campus life, technical workshops, and alumni gatherings
            </p>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className="break-inside-avoid relative group cursor-pointer animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="font-semibold">{image.alt}</p>
                      <p className="text-sm opacity-90">Click to view full size</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links with Gradient Animations */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Quick Access Portal
            </h2>
            <p className="text-blue-100 text-lg">
              Everything you need as a CGTTI alumnus in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`${link.color} text-white p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group animate-slideUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-6 p-4 bg-white/20 rounded-full group-hover:rotate-12 transition-transform duration-500">
                    <link.icon size={40} className="text-white" />
                  </div>
                  <span className="font-bold text-xl mb-2">{link.label}</span>
                  <div className="w-0 group-hover:w-12 h-0.5 bg-white/50 transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Additional Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '👥', title: 'Find Batchmates', desc: 'Connect with your CGTTI colleagues' },
              { icon: '💼', title: 'Job Portal', desc: 'Career opportunities for graduates' },
              { icon: '🎯', title: 'Mentorship Program', desc: 'Guide current CGTTI students' },
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-500 group hover:scale-105 cursor-pointer animate-slideUp"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl group-hover:animate-bounce">{feature.icon}</span>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{feature.title}</h4>
                    <p className="text-blue-100 text-sm mt-1">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Custom Icons
const ChevronDown = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const ClockIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);