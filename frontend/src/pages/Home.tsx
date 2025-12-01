import React, { useState } from 'react';
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
  ChevronRight as RightIcon
} from 'lucide-react';

export const Home: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [currentSlide, setCurrentSlide] = useState(0);

  const stats = [
    { label: 'Active Alumni', value: '5,000+', icon: Users, color: 'text-blue-600' },
    { label: 'Events This Year', value: '24+', icon: Calendar, color: 'text-green-600' },
    { label: 'Years Established', value: '54+', icon: Award, color: 'text-purple-600' },
    { label: 'Global Chapters', value: '12+', icon: Target, color: 'text-orange-600' },
  ];

  const notices = [
    {
      title: 'Annual Reunion 2024',
      description: 'Join us for the grand alumni reunion on December 20th',
      type: 'event',
      date: 'Dec 20, 2024'
    },
    {
      title: 'Membership Renewal',
      description: 'Renew your membership for 2025 to enjoy exclusive benefits',
      type: 'announcement',
      date: 'Dec 31, 2024'
    },
    {
      title: 'Career Fair',
      description: 'Connect with top recruiters at our annual career fair',
      type: 'opportunity',
      date: 'Jan 15, 2025'
    },
    {
      title: 'Scholarship Program',
      description: 'Apply for alumni-sponsored scholarships for current students',
      type: 'scholarship',
      date: 'Feb 1, 2025'
    },
  ];

  const events = [
    {
      title: 'Annual Alumni Meet 2024',
      date: 'December 20, 2024',
      time: '6:00 PM - 10:00 PM',
      location: 'CGTTI Main Auditorium',
      description: 'An evening of networking, reminiscing, and celebration'
    },
    {
      title: 'Career Development Workshop',
      date: 'January 15, 2025',
      time: '9:00 AM - 4:00 PM',
      location: 'Virtual Event',
      description: 'Enhance your professional skills with industry experts'
    },
    {
      title: 'Sports Day & Family Picnic',
      date: 'February 10, 2025',
      time: '8:00 AM - 6:00 PM',
      location: 'CGTTI Sports Ground',
      description: 'Fun day for alumni and their families'
    },
    {
      title: 'Industry Leaders Panel',
      date: 'March 5, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'College Conference Hall',
      description: 'Insights from successful alumni entrepreneurs'
    },
  ];

  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Alumni Meet 2023' },
    { id: 2, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Graduation Ceremony' },
    { id: 3, src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Workshop Session' },
    { id: 4, src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Sports Event' },
    { id: 5, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Networking Session' },
    { id: 6, src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', alt: 'Award Ceremony' },
  ];

  const quickLinks = [
    { path: '/join', label: 'Join Membership', icon: Users, color: 'bg-blue-600 hover:bg-blue-700' },
    { path: '/events', label: 'View Events', icon: Calendar, color: 'bg-green-600 hover:bg-green-700' },
    { path: '/gallery', label: 'Browse Gallery', icon: ImageIcon, color: 'bg-purple-600 hover:bg-purple-700' },
    { path: '/contact', label: 'Contact Us', icon: Mail, color: 'bg-orange-600 hover:bg-orange-700' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    // Add your login logic here
    setLoginModalOpen(false);
    setLoginData({ email: '', password: '' });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === notices.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? notices.length - 1 : prev - 1));
  };

  return (
    <div>
      {/* Login Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Member Login</h3>
              <button
                onClick={() => setLoginModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="alumni@example.com"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Login to Dashboard
              </button>
              <p className="text-center text-sm text-gray-600">
                Need an account?{' '}
                <Link to="/join" className="text-blue-600 hover:underline">
                  Join Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Hero Banner Section */}
      <section 
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Connecting Past & Present
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Welcome to the CGTTI Alumni Association - Your lifelong connection to success, growth, and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/join"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center"
              >
                Join Our Network <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/events"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
              >
                View Events
              </Link>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all flex items-center"
              >
                <LogIn className="mr-2" size={20} />
                Member Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Welcome to CGTTI Alumni Network
              </h2>
              <p className="text-lg text-gray-600 mb-6">
We are a vibrant community of graduates dedicated to fostering lifelong connections, supporting professional growth, and contributing to the success of current students. Our network spans generations and industries, creating opportunities for collaboration, mentorship, and shared success.

Whether you graduated last year or decades ago, there’s a place for you in our growing community of over 10000 alumni worldwide.
              </p>
              <p className="text-lg text-gray-600">
                Whether you graduated last year or decades ago, there's a place for you in our growing 
                community of over 5,000 alumni worldwide.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="CGTTI Alumni Community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Guiding Principles</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Driving excellence and building bridges across generations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To connect, engage, and support CGTTI alumni worldwide through meaningful interactions, 
                professional development opportunities, and philanthropic initiatives that strengthen 
                our community and support our alma mater.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the most dynamic and supportive alumni network, recognized for our contributions 
                to individual success, institutional excellence, and societal development through 
                innovation, collaboration, and lifelong learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color.replace('text', 'bg')} bg-opacity-20`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Highlights / Notices */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Latest Updates & Notices</h2>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <RightIcon size={20} />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {notices.map((notice, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-blue-100">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          notice.type === 'event' ? 'bg-blue-100 text-blue-800' :
                          notice.type === 'announcement' ? 'bg-green-100 text-green-800' :
                          notice.type === 'opportunity' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">{notice.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {notice.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{notice.description}</p>
                      <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        Read More <ChevronRight className="ml-1" size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {notices.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Upcoming Events</h2>
              <p className="text-gray-600">Connect, learn, and grow with fellow alumni</p>
            </div>
            <Link to="/events" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View All Events <ChevronRight className="ml-1" size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center text-blue-600 mb-4">
                    <Calendar className="mr-2" size={20} />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <ClockIcon size={16} className="mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">{event.description}</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Register
                    </button>
                    <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Gallery Moments</h2>
              <p className="text-gray-600">Memories that define our journey together</p>
            </div>
            <Link to="/gallery" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View Full Gallery <ChevronRight className="ml-1" size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links / Shortcuts */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Quick Access to Alumni Resources
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`${link.color} text-white p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                <div className="flex flex-col items-center">
                  <link.icon size={32} className="mb-4" />
                  <span className="font-semibold">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      
    </div>
  );
};

// Custom Clock Icon Component
const ClockIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);