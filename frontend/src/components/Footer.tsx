import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, 
  Instagram, Linkedin, Youtube, Globe, 
  Clock, ChevronRight, Heart, Shield,
  Building, Users, Award, ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [year] = useState(new Date().getFullYear());

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Reset subscription status after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Animation for stats counter
  const [stats, setStats] = useState({
    alumni: 0,
    years: 0,
    events: 0,
    partnerships: 0
  });

  useEffect(() => {
    const finalStats = { alumni: 10000, years: 56, events: 250, partnerships: 45 };
    const duration = 2000;
    const steps = 60;
    const increment = {
      alumni: finalStats.alumni / steps,
      years: finalStats.years / steps,
      events: finalStats.events / steps,
      partnerships: finalStats.partnerships / steps
    };

    const timer = setInterval(() => {
      setStats(prev => ({
        alumni: Math.min(prev.alumni + increment.alumni, finalStats.alumni),
        years: Math.min(prev.years + increment.years, finalStats.years),
        events: Math.min(prev.events + increment.events, finalStats.events),
        partnerships: Math.min(prev.partnerships + increment.partnerships, finalStats.partnerships)
      }));
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Real CGTTI Data
  const contactInfo = {
    address: '582, Galle Road, Mount Lavinia, Sri Lanka',
    phone: ['+94 11 2605625', '+94 11 2605535'],
    email: 'cgtti@sltnet.lk',
    website: 'www.cgtti.lk',
    alumniEmail: 'alumni@cgtti.lk',
    founded: 1959
  };

  const socialLinks = {
    facebook: 'https://facebook.com/cgttialumni',
    linkedin: 'https://linkedin.com/company/cgtti',
    instagram: 'https://instagram.com/cgtti_alumni',
    youtube: 'https://youtube.com/cgttialumni',
    twitter: 'https://twitter.com/cgtti_alumni'
  };

  const quickLinks = [
    { path: '/about', label: 'About CGTTI' },
    // { path: '/admissions', label: 'Admissions' },
    // { path: '/courses', label: 'Technical Courses' },
    // { path: '/facilities', label: 'Campus Facilities' },
    { path: '/partners', label: 'Industry Partners' },
    { path: '/careers', label: 'Career Services' },
  ];

  const alumniLinks = [
    { path: '/membership', label: 'Become a Member' },
    { path: '/directory', label: 'Alumni Directory' },
    { path: '/mentorship', label: 'Mentorship Program' },
    { path: '/scholarships', label: 'Student Scholarships' },
    { path: '/donate', label: 'Donate' },
    { path: '/volunteer', label: 'Volunteer' },
  ];

  const resourceLinks = [
    { path: '/news', label: 'News & Updates' },
    { path: '/events', label: 'Event Calendar' },
    { path: '/gallery', label: 'Photo Gallery' },
    { path: '/library', label: 'Digital Library' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 py-8 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                {Math.round(stats.alumni).toLocaleString()}+
              </div>
              <div className="text-sm text-gray-300 font-medium">Registered Alumni</div>
            </div>
            <div className="text-center group transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                {Math.round(stats.years)}+
              </div>
              <div className="text-sm text-gray-300 font-medium">Years of Excellence</div>
            </div>
            <div className="text-center group transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                {Math.round(stats.events)}+
              </div>
              <div className="text-sm text-gray-300 font-medium">Annual Events</div>
            </div>
            <div className="text-center group transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                {Math.round(stats.partnerships)}+
              </div>
              <div className="text-sm text-gray-300 font-medium">Industry Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Institution Info */}
          <div>
            {/* Logo and Description */}
            <div className="mb-8 animate-slideUp">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-3 transition-all duration-500">
                    <span className="text-white font-bold text-xl">CG</span>
                  </div>
                  <div className="absolute -inset-2 border-2 border-blue-400/20 rounded-xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    CGTTI
                  </h2>
                  <p className="text-sm text-gray-400 font-medium tracking-wider">
                    CEYLON GERMAN TECHNICAL TRAINING INSTITUTE
                  </p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-lg">
                Established in {contactInfo.founded}, CGTTI has been at the forefront of technical 
                education in Sri Lanka, producing highly skilled professionals who contribute 
                significantly to national development and global industries.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-400" />
                Contact Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 group cursor-pointer transform hover:translate-x-1 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {contactInfo.address}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    {contactInfo.phone.map((phone, index) => (
                      <a 
                        key={index}
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="text-gray-300 group-hover:text-white transition-colors hover:underline"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-300 group-hover:text-white transition-colors hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <Globe className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a 
                    href={`https://${contactInfo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 group-hover:text-white transition-colors hover:underline flex items-center"
                  >
                    {contactInfo.website}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Links and Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <ChevronRight className="w-5 h-5 mr-2 text-blue-400" />
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group transform hover:translate-x-1"
                    >
                      <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alumni Resources */}
            <div className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-400" />
                Alumni Resources
              </h3>
              <ul className="space-y-2">
                {alumniLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group transform hover:translate-x-1"
                    >
                      <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="animate-slideUp" style={{ animationDelay: '0.4s' }}>
              {/* <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-400" />
                Stay Updated
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Subscribe to our newsletter for the latest updates, events, and alumni news.
              </p> */}
              
              {/* <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-gray-400 transition-all duration-300"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                    {!isSubscribed && <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
                
                {isSubscribed && (
                  <div className="text-green-400 text-sm text-center animate-fadeIn">
                    🎉 Thank you for subscribing to our newsletter!
                  </div>
                )}
              </form> */}

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-white mb-3">Connect With Us</h4>
                <div className="flex space-x-3">
                  {[
                    { icon: Facebook, href: socialLinks.facebook, color: 'hover:bg-blue-600' },
                    { icon: Linkedin, href: socialLinks.linkedin, color: 'hover:bg-blue-700' },
                    { icon: Instagram, href: socialLinks.instagram, color: 'hover:bg-pink-600' },
                    { icon: Twitter, href: socialLinks.twitter, color: 'hover:bg-blue-400' },
                    { icon: Youtube, href: socialLinks.youtube, color: 'hover:bg-red-600' },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-300 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-110`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="animate-slideUp" style={{ animationDelay: '0.5s' }}>
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                Office Hours
              </h4>
              <p className="text-gray-300 text-sm">
                Monday - Friday: 8:30 AM - 4:30 PM<br />
                Saturday: 8:30 AM - 4:30 PM<br />
                Sunday: 8:30 AM - 4:30 PM
              </p>
            </div>
            
            <div className="animate-slideUp" style={{ animationDelay: '0.6s' }}>
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                Accreditation
              </h4>
              <p className="text-gray-300 text-sm">
                Recognized by Tertiary and Vocational Education Commission (TVEC)<br />
                Member of German-Sri Lankan Technical Cooperation
              </p>
            </div>
            
            <div className="animate-slideUp" style={{ animationDelay: '0.7s' }}>
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2 text-purple-400" />
                Alumni Login
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                Access exclusive alumni resources, networking opportunities, and career services.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group"
              >
                Login to Alumni Portal
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/50 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© {year} Ceylon German Technical Training Institute. All rights reserved.</p>
              <p className="mt-1 text-xs">Established {contactInfo.founded} | Upholding German Technical Standards</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
              <div className="flex items-center text-gray-400 text-sm">
                <Heart className="w-4 h-4 mr-1 text-red-400 animate-pulse" />
                k t lakmal
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};