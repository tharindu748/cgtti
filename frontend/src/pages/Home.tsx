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
  ChevronRight as RightIcon,
  GraduationCap,
  Briefcase,
  HeartHandshake
} from 'lucide-react';

export const Home: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [currentSlide, setCurrentSlide] = useState(0);

  // CGTTI-Specific Stats
  const stats = [
    { label: 'Registered Alumni', value: '10,000+', icon: Users, color: 'text-blue-600' },
    { label: 'Annual Events', value: '20+', icon: Calendar, color: 'text-green-600' },
    { label: 'Since 1967', value: '56+ Years', icon: GraduationCap, color: 'text-purple-600' },
    { label: 'Industry Trades', value: '11+ Trades', icon: Briefcase, color: 'text-orange-600' },
  ];

  // CGTTI-Specific Notices
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

  // CGTTI-Specific Events
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

  // CGTTI-Specific Gallery Images
  const galleryImages = [
    { id: 1, src: '/images/cgtti-campus.jpg', alt: 'CGTTI Main Campus Katunayake' },
    { id: 2, src: '/images/graduation.jpg', alt: 'CGTTI Graduation Ceremony' },
    { id: 3, src: '/images/workshop.jpg', alt: 'Technical Workshop Session' },
    { id: 4, src: '/images/sports.jpg', alt: 'Annual Sports Meet' },
    { id: 5, src: '/images/alumni-meet.jpg', alt: 'Alumni Networking Session' },
    { id: 6, src: '/images/award.jpg', alt: 'Award Ceremony' },
  ];

  // CGTTI Trades
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

  const quickLinks = [
    { path: '/join', label: 'Join Alumni', icon: Users, color: 'bg-blue-600 hover:bg-blue-700' },
    { path: '/events', label: 'Upcoming Events', icon: Calendar, color: 'bg-green-600 hover:bg-green-700' },
    { path: '/gallery', label: 'Photo Gallery', icon: ImageIcon, color: 'bg-purple-600 hover:bg-purple-700' },
    { path: '/contact', label: 'Contact Office', icon: Mail, color: 'bg-orange-600 hover:bg-orange-700' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
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
              <h3 className="text-2xl font-bold text-gray-800">CGTTI Alumni Login</h3>
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
                  Email or Training Number
                </label>
                <input
                  type="text"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="training-no@cgtti.lk"
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
                Login to Alumni Portal
              </button>
              <p className="text-center text-sm text-gray-600">
                New to alumni network?{' '}
                <Link to="/join" className="text-blue-600 hover:underline">
                  Register Here
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
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/cgtti-banner.jpg)'
        }}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Ceylon German Technical Training Institute
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Connecting Generations of Skilled Professionals Since 1967
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/join"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center"
              >
                Join Alumni Network <ArrowRight className="ml-2" size={20} />
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
                Alumni Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CGTTI Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Welcome to CGTTI Alumni Association
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Established in 1967 under German-Sri Lankan bilateral cooperation, CGTTI has been at the forefront of technical education in Sri Lanka for over five decades. Our alumni network spans across industries, contributing significantly to Sri Lanka's industrial development.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With more than 10,000 skilled professionals graduated from our 11 technical trades, our alumni are leading in manufacturing, automotive, electrical, refrigeration, and various engineering sectors both locally and internationally.
              </p>
              
              {/* CGTTI Trades List */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Technical Trades:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {cgttiTrades.map((trade, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {trade}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/cgtti-building.jpg"
                  alt="CGTTI Main Building Katunayake"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">56+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Commitment</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Building a stronger technical community through alumni engagement
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To strengthen the bond between CGTTI and its alumni, foster lifelong learning, and support the professional growth of our technical graduates while contributing to national development.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the most dynamic alumni network in Sri Lanka's technical education sector, recognized for our contributions to industry development and skilled workforce enhancement.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <HeartHandshake className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Technical Excellence • Professional Integrity • Industry Collaboration • Continuous Learning • Community Service • Sri Lankan Pride
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">CGTTI by Numbers</h2>
            <p className="text-blue-200">Our impact in Sri Lanka's technical sector</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${stat.color.replace('text', 'bg')} bg-opacity-20`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Highlights / Notices */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">CGTTI Announcements</h2>
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                aria-label="Previous notice"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                aria-label="Next notice"
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
                      <Link to="/events" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        View Details <ChevronRight className="ml-1" size={16} />
                      </Link>
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
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
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
              <p className="text-gray-600">Technical workshops, networking sessions, and alumni gatherings</p>
            </div>
            <Link to="/events" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View All Events <ChevronRight className="ml-1" size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
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
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">{event.description}</p>
                  <div className="flex space-x-2">
                    <Link 
                      to="/register-event" 
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center"
                    >
                      Register
                    </Link>
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
              <h2 className="text-3xl font-bold text-gray-800 mb-2">CGTTI Memories</h2>
              <p className="text-gray-600">Moments from campus life and alumni gatherings</p>
            </div>
            <Link to="/gallery" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View Full Gallery <ChevronRight className="ml-1" size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer">
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Note for adding real images */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Add your CGTTI photos to the <code>/public/images/</code> folder</p>
            <p>Suggested: cgtti-campus.jpg, graduation.jpg, workshop.jpg, sports.jpg, alumni-meet.jpg, award.jpg</p>
          </div>
        </div>
      </section>

      {/* Quick Links / Shortcuts */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Quick Access for Alumni
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`${link.color} text-white p-8 rounded-2xl text-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <div className="flex flex-col items-center">
                  <link.icon size={32} className="mb-4" />
                  <span className="font-semibold">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Additional CTAs */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h4 className="text-white font-semibold mb-2">Find Alumni</h4>
              <p className="text-blue-100 text-sm">Connect with batchmates and colleagues</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h4 className="text-white font-semibold mb-2">Job Portal</h4>
              <p className="text-blue-100 text-sm">Career opportunities for CGTTI graduates</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h4 className="text-white font-semibold mb-2">Mentorship</h4>
              <p className="text-blue-100 text-sm">Guide current CGTTI students</p>
            </div>
          </div>
        </div>
      </section>
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