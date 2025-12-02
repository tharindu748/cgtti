import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Plus, Edit, Trash2, Eye, 
  Users, CheckCircle, XCircle, Clock,
  Download, Filter, Search, BarChart3,
  Mail, QrCode, Upload
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Mock data - replace with API calls
const mockEvents = [
  {
    id: '1',
    title: 'Annual Alumni Reunion 2024',
    description: 'Join us for the most anticipated event of the year!',
    shortDescription: 'Annual gathering of CGTTI alumni',
    eventDate: '2024-12-15T18:00:00Z',
    startTime: '18:00',
    endTime: '22:00',
    location: 'Grand Ballroom, Colombo Hilton',
    eventType: 'IN_PERSON',
    category: 'REUNION',
    status: 'PUBLISHED',
    visibility: 'ALUMNI_ONLY',
    registrationType: 'FREE',
    capacity: 200,
    registeredCount: 150,
    attendedCount: 0,
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    organizerName: 'CGTTI Alumni Association',
    createdAt: '2024-01-15T10:00:00Z',
    publishedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Tech Career Fair 2024',
    description: 'Connect with top tech companies',
    shortDescription: 'Career opportunities in technology sector',
    eventDate: '2024-11-25T09:00:00Z',
    startTime: '09:00',
    endTime: '17:00',
    location: 'CGTTI Main Campus',
    eventType: 'HYBRID',
    category: 'CAREER',
    status: 'PUBLISHED',
    visibility: 'PUBLIC',
    registrationType: 'FREE',
    capacity: 300,
    registeredCount: 85,
    attendedCount: 0,
    coverImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
    organizerName: 'CGTTI Career Services',
    createdAt: '2024-01-10T09:00:00Z',
    publishedAt: '2024-01-12T09:00:00Z'
  }
];

export const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState(mockEvents);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useAuth();

  const isAdmin = user?.role === 'ADMIN';

  const eventCategories = [
    'REUNION', 'CAREER', 'WORKSHOP', 'SEMINAR', 
    'CONFERENCE', 'SOCIAL', 'SPORTS', 'NETWORKING', 'CHARITY', 'GENERAL'
  ];

  const eventStatuses = [
    { value: 'DRAFT', label: 'Draft', color: 'bg-gray-100 text-gray-800' },
    { value: 'PUBLISHED', label: 'Published', color: 'bg-green-100 text-green-800' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
    { value: 'COMPLETED', label: 'Completed', color: 'bg-blue-100 text-blue-800' }
  ];

  const eventTypes = [
    { value: 'IN_PERSON', label: 'In-Person', icon: '📍' },
    { value: 'VIRTUAL', label: 'Virtual', icon: '💻' },
    { value: 'HYBRID', label: 'Hybrid', icon: '🔄' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = search === '' || 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreateEvent = () => {
    // Implementation for creating event
    setShowCreateModal(true);
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setShowCreateModal(true);
  };

  const handleDeleteEvent = (event: any) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // API call to delete event
    setEvents(events.filter(e => e.id !== selectedEvent.id));
    setShowDeleteModal(false);
    setSelectedEvent(null);
  };

  const handlePublishEvent = (eventId: string) => {
    // API call to publish event
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: 'PUBLISHED', publishedAt: new Date().toISOString() } : event
    ));
  };

  const handleCancelEvent = (eventId: string) => {
    // API call to cancel event
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: 'CANCELLED' } : event
    ));
  };

  const getStatusBadge = (status: string) => {
    const statusObj = eventStatuses.find(s => s.value === status);
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusObj?.color || 'bg-gray-100 text-gray-800'}`}>
        {statusObj?.label || status}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    const typeObj = eventTypes.find(t => t.value === type);
    return typeObj?.icon || '📍';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
          <p className="text-gray-600">Create and manage alumni events</p>
        </div>
        <button
          onClick={handleCreateEvent}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Events</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{events.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Published Events</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {events.filter(e => e.status === 'PUBLISHED').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming Events</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {events.filter(e => new Date(e.eventDate) > new Date()).length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Registrations</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {events.reduce((sum, event) => sum + event.registeredCount, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Events</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              {eventStatuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {eventCategories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0) + category.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end space-x-2">
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registrations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    <div className="text-gray-500">Loading events...</div>
                  </td>
                </tr>
              ) : filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <Calendar className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-600">No events found</p>
                      <p className="text-sm text-gray-500">Try adjusting your filters or create a new event</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    {/* Event Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {event.coverImage ? (
                            <img
                              src={event.coverImage}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{getTypeIcon(event.eventType)}</span>
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {event.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                            {event.shortDescription}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              📍 {event.location}
                            </span>
                            <span className="flex items-center">
                              👤 {event.organizerName}
                            </span>
                            <span className={`px-2 py-1 rounded ${event.visibility === 'PUBLIC' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                              {event.visibility.toLowerCase().replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(event.eventDate)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Created: {formatDate(event.createdAt)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(event.status)}
                      <div className="text-xs text-gray-500 mt-1">
                        Capacity: {event.registeredCount}/{event.capacity}
                      </div>
                    </td>

                    {/* Registrations */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Registered:</span>
                          <span className="font-semibold">{event.registeredCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Attended:</span>
                          <span className="font-semibold">{event.attendedCount}</span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/events/${event.id}`}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center space-x-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </Link>
                          <Link
                            to={`/admin/events/${event.id}/registrations`}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 flex items-center space-x-1"
                          >
                            <Users className="w-3 h-3" />
                            <span>Registrations</span>
                          </Link>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 flex items-center space-x-1"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          {event.status === 'PUBLISHED' ? (
                            <button
                              onClick={() => handleCancelEvent(event.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center space-x-1"
                            >
                              <XCircle className="w-3 h-3" />
                              <span>Cancel</span>
                            </button>
                          ) : event.status === 'DRAFT' ? (
                            <button
                              onClick={() => handlePublishEvent(event.id)}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 flex items-center space-x-1"
                            >
                              <CheckCircle className="w-3 h-3" />
                              <span>Publish</span>
                            </button>
                          ) : null}
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/events/${event.id}/analytics`}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 flex items-center space-x-1"
                          >
                            <BarChart3 className="w-3 h-3" />
                            <span>Analytics</span>
                          </Link>
                          <button
                            onClick={() => handleDeleteEvent(event)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center space-x-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Event Modal */}
      {showCreateModal && (
        <EventFormModal
          event={selectedEvent}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedEvent(null);
          }}
          onSuccess={() => {
            setShowCreateModal(false);
            setSelectedEvent(null);
            // Refresh events list
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete Event</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "<strong>{selectedEvent.title}</strong>"? 
              This action cannot be undone.
            </p>
            {selectedEvent.registeredCount > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-700 text-sm">
                  ⚠️ This event has {selectedEvent.registeredCount} registration(s). 
                  Deleting it will remove all registration records.
                </p>
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Event Form Modal Component
const EventFormModal: React.FC<{
  event?: any;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ event, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    shortDescription: event?.shortDescription || '',
    eventDate: event?.eventDate ? event.eventDate.split('T')[0] : '',
    startTime: event?.startTime || '18:00',
    endTime: event?.endTime || '22:00',
    location: event?.location || '',
    address: event?.address || '',
    city: event?.city || 'Colombo',
    country: event?.country || 'Sri Lanka',
    eventType: event?.eventType || 'IN_PERSON',
    category: event?.category || 'REUNION',
    tags: event?.tags || ['Networking'],
    status: event?.status || 'DRAFT',
    visibility: event?.visibility || 'ALUMNI_ONLY',
    registrationType: event?.registrationType || 'FREE',
    price: event?.price || '',
    capacity: event?.capacity || 100,
    waitlistEnabled: event?.waitlistEnabled || true,
    registrationDeadline: event?.registrationDeadline ? event.registrationDeadline.split('T')[0] : '',
    organizerName: event?.organizerName || 'CGTTI Alumni Association',
    organizerEmail: event?.organizerEmail || 'events@cgtti-alumni.org',
    organizerPhone: event?.organizerPhone || '',
    agenda: event?.agenda || [{ time: '18:00', title: 'Registration', description: 'Welcome drinks' }],
    speakers: event?.speakers || []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call to create/update event
      console.log('Form data:', formData);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {event ? 'Edit Event' : 'Create New Event'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Annual Alumni Reunion 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description for listings"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the event..."
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="IN_PERSON">In-Person</option>
                    <option value="VIRTUAL">Virtual</option>
                    <option value="HYBRID">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="REUNION">Reunion</option>
                  <option value="CAREER">Career</option>
                  <option value="WORKSHOP">Workshop</option>
                  <option value="SEMINAR">Seminar</option>
                  <option value="CONFERENCE">Conference</option>
                  <option value="SOCIAL">Social</option>
                  <option value="SPORTS">Sports</option>
                  <option value="NETWORKING">Networking</option>
                  <option value="CHARITY">Charity</option>
                  <option value="GENERAL">General</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Location Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Name *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Grand Ballroom, Colombo Hilton"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2 Sir Chittampalam A Gardiner Mawatha"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Colombo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sri Lanka"
                />
              </div>
            </div>
          </div>

          {/* Registration Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Registration Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Type *
                </label>
                <select
                  name="registrationType"
                  value={formData.registrationType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="FREE">Free</option>
                  <option value="PAID">Paid</option>
                  <option value="INVITE_ONLY">Invite Only</option>
                </select>
              </div>
              {formData.registrationType === 'PAID' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (LKR)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Deadline
                </label>
                <input
                  type="date"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="waitlistEnabled"
                  checked={formData.waitlistEnabled}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    waitlistEnabled: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  id="waitlist"
                />
                <label htmlFor="waitlist" className="text-sm text-gray-700">
                  Enable waitlist when capacity is reached
                </label>
              </div>
            </div>
          </div>

          {/* Visibility & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visibility *
              </label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PUBLIC">Public (Anyone can register)</option>
                <option value="ALUMNI_ONLY">Alumni Only</option>
                <option value="PRIVATE">Private (Invitation only)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
          </div>

          {/* Organizer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Organizer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organizer Name *
                </label>
                <input
                  type="text"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="CGTTI Alumni Association"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organizer Email *
                </label>
                <input
                  type="email"
                  name="organizerEmail"
                  value={formData.organizerEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="events@cgtti-alumni.org"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organizer Phone
                </label>
                <input
                  type="tel"
                  name="organizerPhone"
                  value={formData.organizerPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+94 11 2345678"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};