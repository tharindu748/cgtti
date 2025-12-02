import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Users, ArrowRight, 
  ChevronRight, Share2, Bookmark, CheckCircle, 
  ExternalLink, Award, Camera, Video, Mic, 
  Coffee, Wifi, Utensils, Car, Train, 
  Filter, Search, X, Download, Mail,
  Facebook, Twitter, Linkedin, Instagram,
  Heart, MessageCircle, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// Sample event data
const events = [
  {
    id: 1,
    title: "Annual Alumni Reunion 2024",
    date: "December 15, 2024",
    time: "6:00 PM - 10:00 PM",
    location: "Grand Ballroom, Colombo Hilton",
    address: "2 Sir Chittampalam A Gardiner Mawatha, Colombo 02",
    category: "Reunion",
    type: "In-Person",
    price: "Free",
    status: "upcoming",
    featured: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Join us for the most anticipated event of the year! Reconnect with old friends, meet new alumni, and celebrate the legacy of CGTTI.",
    speakers: [
      { name: "Dr. Samantha Perera", role: "Class of 1995, CEO Tech Solutions Ltd." },
      { name: "Mr. Rajitha Fernando", role: "Class of 2005, Engineering Director" }
    ],
    attendees: 150,
    capacity: 200,
    tags: ["Networking", "Dinner", "Awards", "Entertainment"]
  },
  {
    id: 2,
    title: "Tech Career Fair 2024",
    date: "November 25, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "CGTTI Main Campus",
    address: "No. 125, Union Place, Colombo 02",
    category: "Career",
    type: "Hybrid",
    price: "Free",
    status: "upcoming",
    featured: true,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Connect with top tech companies and explore career opportunities. Perfect for recent graduates and experienced professionals.",
    speakers: [
      { name: "Ms. Nirmali Silva", role: "HR Director, Virtusa" },
      { name: "Mr. Dilshan Rathnayake", role: "CTO, WSO2" }
    ],
    attendees: 300,
    capacity: 350,
    tags: ["Job Fair", "Networking", "Workshops", "Interviews"]
  },
  {
    id: 3,
    title: "Entrepreneurship Workshop",
    date: "October 30, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Online (Zoom)",
    address: "Virtual Event",
    category: "Workshop",
    type: "Virtual",
    price: "LKR 2,000",
    status: "upcoming",
    featured: false,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Learn the fundamentals of starting and growing your own business from successful alumni entrepreneurs.",
    speakers: [
      { name: "Mr. Kumar De Silva", role: "Founder, Startup Lanka" },
      { name: "Ms. Chathuri Jayasena", role: "Investor, Angel Network" }
    ],
    attendees: 85,
    capacity: 100,
    tags: ["Business", "Startup", "Funding", "Mentoring"]
  },
  {
    id: 4,
    title: "Sports Day & Family Picnic",
    date: "September 20, 2024",
    time: "8:00 AM - 4:00 PM",
    location: "Royal College Grounds",
    address: "Rajakeeya Mawatha, Colombo 07",
    category: "Social",
    type: "In-Person",
    price: "LKR 1,500 per family",
    status: "upcoming",
    featured: false,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "A fun-filled day of sports, games, and activities for the whole CGTTI alumni family.",
    speakers: [],
    attendees: 120,
    capacity: 200,
    tags: ["Family", "Sports", "Fun", "Food"]
  },
  {
    id: 5,
    title: "Industry 4.0 Conference",
    date: "August 15, 2024",
    time: "All Day",
    location: "BMICH",
    address: "Bauddhaloka Mawatha, Colombo 07",
    category: "Conference",
    type: "In-Person",
    price: "LKR 5,000",
    status: "past",
    featured: false,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Exploring the future of manufacturing and technology with industry experts.",
    speakers: [
      { name: "Prof. Mahesh Karunaratne", role: "Dean, Engineering Faculty" },
      { name: "Eng. Sunil Gamage", role: "Director, Factory Automation" }
    ],
    attendees: 250,
    capacity: 300,
    tags: ["Technology", "Industry", "Innovation", "Networking"]
  }
];

// Event categories for filtering
const categories = [
  { id: 'all', label: 'All Events', count: 15 },
  { id: 'upcoming', label: 'Upcoming', count: 8 },
  { id: 'past', label: 'Past Events', count: 7 },
  { id: 'reunion', label: 'Reunions', count: 3 },
  { id: 'career', label: 'Career', count: 4 },
  { id: 'workshop', label: 'Workshops', count: 5 },
  { id: 'social', label: 'Social', count: 3 }
];

export const EventsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([1, 3]);

  // Filter events based on category and search
  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || 
      event.category.toLowerCase() === selectedCategory ||
      event.status === selectedCategory;
    
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Featured event (first featured upcoming event)
  const featuredEvent = events.find(event => event.featured && event.status === 'upcoming');

  // Handle event registration
  const handleRegister = (eventId: number) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
    } else {
      setRegisteredEvents([...registeredEvents, eventId]);
    }
  };

  // Handle event details modal
  const openEventDetails = (event: any) => {
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/40 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Alumni <span className="text-blue-300">Events</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Connect, learn, and grow with fellow CGTTI alumni through our exclusive events
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                View Calendar
              </button>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg border border-blue-500 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Propose an Event
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Event Banner */}
      {featuredEvent && (
        <section className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="bg-white/20 p-3 rounded-full">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">FEATURED EVENT</h3>
                  <p className="text-sm opacity-90">{featuredEvent.title}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-sm opacity-90">Date</div>
                  <div className="font-bold">{featuredEvent.date}</div>
                </div>
                <div className="hidden md:block text-center">
                  <div className="text-sm opacity-90">Location</div>
                  <div className="font-bold">{featuredEvent.location}</div>
                </div>
                <button 
                  onClick={() => openEventDetails(featuredEvent)}
                  className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-orange-50 transition-colors flex items-center"
                >
                  Register Now <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter Events
              </h2>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          selectedCategory === category.id ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        {category.label}
                      </div>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Event Type */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Event Type</h3>
                <div className="space-y-2">
                  {['In-Person', 'Virtual', 'Hybrid'].map((type) => (
                    <label key={type} className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Date Range</h3>
                <div className="space-y-2">
                  <select className="w-full px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500">
                    <option>This Month</option>
                    <option>Next Month</option>
                    <option>Next 3 Months</option>
                    <option>All Dates</option>
                  </select>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-blue-50 rounded-xl p-4 mt-8">
                <h3 className="font-semibold text-blue-800 mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Upcoming Events</span>
                    <span className="font-bold text-blue-700">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Registrations</span>
                    <span className="font-bold text-blue-700">1,245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Countries</span>
                    <span className="font-bold text-blue-700">15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Events Grid */}
          <div className="lg:w-3/4">
            {/* Events Count & Sort */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'all' ? 'All Events' : 
                   selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + ' Events'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {filteredEvents.length} events found {searchQuery && `for "${searchQuery}"`}
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
                  <option>Sort by: Date (Newest)</option>
                  <option>Sort by: Date (Oldest)</option>
                  <option>Sort by: Popularity</option>
                  <option>Sort by: Name</option>
                </select>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden p-2 bg-gray-100 rounded-lg"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        event.status === 'upcoming' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                      </span>
                    </div>
                    {event.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRegister(event.id)}
                        className={`p-2 rounded-lg ${
                          registeredEvents.includes(event.id)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-400 hover:text-blue-500 hover:bg-gray-50'
                        }`}
                      >
                        {registeredEvents.includes(event.id) ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Bookmark className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-start text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.attendees} attending • {event.capacity} capacity</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                      {event.tags.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{event.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-gray-800">
                        {event.price === 'Free' ? 'FREE' : event.price}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => openEventDetails(event)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm font-medium"
                        >
                          View Details <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">No events found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {searchQuery 
                    ? `No events match your search for "${searchQuery}". Try different keywords or browse all events.`
                    : 'There are no events in this category at the moment. Check back soon!'}
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View All Events
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredEvents.length > 0 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    3
                  </button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Next
                  </button>
                </nav>
              </div>
            )}

            {/* Call to Action Section */}
            <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-2/3 mb-8 lg:mb-0">
                  <h2 className="text-3xl font-bold mb-4">
                    Want to host your own event?
                  </h2>
                  <p className="text-blue-100 mb-6">
                    Are you planning a reunion, workshop, or networking session? 
                    Partner with CGTTI Alumni Association to make your event a success!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                      <span>Event promotion support</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                      <span>Venue recommendations</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-300 mr-2" />
                      <span>Registration management</span>
                    </div>
                  </div>
                </div>
                <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Propose an Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              {/* Modal Header with Image */}
              <div className="relative h-64">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                  <div className="flex items-center text-white/90">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{selectedEvent.date} • {selectedEvent.time}</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Details */}
                  <div className="lg:col-span-2">
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">About This Event</h3>
                      <p className="text-gray-600 mb-6">{selectedEvent.description}</p>
                      
                      {selectedEvent.speakers.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <Mic className="w-5 h-5 mr-2" />
                            Featured Speakers
                          </h4>
                          <div className="space-y-4">
                            {selectedEvent.speakers.map((speaker: any, idx: number) => (
                              <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                  {speaker.name.charAt(0)}
                                </div>
                                <div>
                                  <h5 className="font-bold text-gray-800">{speaker.name}</h5>
                                  <p className="text-gray-600 text-sm">{speaker.role}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Event Agenda */}
                      <div className="mb-8">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">Event Agenda</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-3 text-blue-600" />
                              <span className="font-medium">Registration & Welcome</span>
                            </div>
                            <span className="text-blue-600 font-medium">6:00 PM - 6:30 PM</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center">
                              <Coffee className="w-4 h-4 mr-3 text-gray-600" />
                              <span className="font-medium">Networking & Refreshments</span>
                            </div>
                            <span className="text-gray-600 font-medium">6:30 PM - 7:30 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Registration */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-2xl p-6 sticky top-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">Event Details</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-start">
                          <Calendar className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <div className="font-medium text-gray-800">Date & Time</div>
                            <div className="text-gray-600">{selectedEvent.date}</div>
                            <div className="text-gray-600 text-sm">{selectedEvent.time}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <div className="font-medium text-gray-800">Location</div>
                            <div className="text-gray-600">{selectedEvent.location}</div>
                            <div className="text-gray-600 text-sm">{selectedEvent.address}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Users className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                          <div>
                            <div className="font-medium text-gray-800">Attending</div>
                            <div className="text-gray-600">{selectedEvent.attendees} of {selectedEvent.capacity} spots filled</div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${(selectedEvent.attendees / selectedEvent.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                          <div>
                            <div className="font-bold text-2xl text-gray-800">{selectedEvent.price}</div>
                            <div className="text-gray-600 text-sm">per person</div>
                          </div>
                          <div className="text-green-600 font-medium">Free cancellation</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                          {registeredEvents.includes(selectedEvent.id) ? 'Already Registered' : 'Register Now'}
                        </button>
                        
                        <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Add to Calendar
                        </button>
                        
                        <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Event
                        </button>
                      </div>

                      {/* Event Features */}
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-3">What's Included</h4>
                        <div className="space-y-2">
                          {['Networking Opportunities', 'Refreshments', 'Certificate of Participation', 'Event Materials'].map((item, idx) => (
                            <div key={idx} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span className="text-sm text-gray-600">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about CGTTI alumni events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              question: "How do I register for an event?",
              answer: "Click the 'Register Now' button on any event page. You'll need to be logged into your alumni account. Registration is free for most events unless otherwise specified."
            },
            {
              question: "Can I bring a guest?",
              answer: "Yes, most events allow one guest per alumnus. Please indicate this during registration. Some exclusive events may be alumni-only."
            },
            {
              question: "What if I need to cancel?",
              answer: "You can cancel your registration up to 24 hours before the event through your dashboard. For paid events, refunds are processed within 5-7 business days."
            },
            {
              question: "Are events accessible?",
              answer: "All our events are designed to be accessible. If you have specific accessibility requirements, please contact us at events@cgtti-alumni.org before the event."
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Stay Updated with Alumni Events
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss an opportunity to connect with fellow alumni
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-white rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};