import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Save, X, Upload, Calendar, Clock, MapPin, 
  Users, DollarSign, Eye, Globe, Lock, 
  Building, Phone, Mail, Image as ImageIcon,
  Plus, Trash2, Copy, AlertCircle, CheckCircle,
  ChevronLeft, Loader, Tag, FileText, Video,
  Wifi, Users as UsersIcon, CreditCard,
  Zap, Award, Heart, TrendingUp, Edit 
} from 'lucide-react';
import { eventsAPI } from '../../api/events';
import { useAuth } from '../../context/AuthContext';

interface EventFormData {
  title: string;
  description: string;
  shortDescription: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  city: string;
  country: string;
  eventType: 'IN_PERSON' | 'VIRTUAL' | 'HYBRID';
  category: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED';
  visibility: 'PUBLIC' | 'PRIVATE' | 'ALUMNI_ONLY';
  registrationType: 'FREE' | 'PAID' | 'INVITE_ONLY';
  price: string;
  currency: string;
  capacity: string;
  waitlistEnabled: boolean;
  registrationDeadline: string;
  coverImage: string;
  galleryImages: string[];
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  agenda: AgendaItem[];
  speakers: Speaker[];
}

interface AgendaItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

interface Speaker {
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

const defaultAgendaItem: AgendaItem = {
  time: '09:00',
  title: '',
  description: '',
  speaker: ''
};

const defaultSpeaker: Speaker = {
  name: '',
  role: '',
  bio: '',
  photo: ''
};

export const EventCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    shortDescription: '',
    eventDate: '',
    startTime: '09:00',
    endTime: '17:00',
    location: '',
    address: '',
    city: 'Colombo',
    country: 'Sri Lanka',
    eventType: 'IN_PERSON',
    category: 'GENERAL',
    tags: ['Networking'],
    status: 'DRAFT',
    visibility: 'ALUMNI_ONLY',
    registrationType: 'FREE',
    price: '',
    currency: 'LKR',
    capacity: '100',
    waitlistEnabled: true,
    registrationDeadline: '',
    coverImage: '',
    galleryImages: [],
    organizerName: 'CGTTI Alumni Association',
    organizerEmail: user?.email || 'events@cgtti-alumni.org',
    organizerPhone: '',
    agenda: [defaultAgendaItem],
    speakers: []
  });

  // Predefined options
  const eventCategories = [
    { value: 'REUNION', label: 'Reunion', icon: '🎓' },
    { value: 'CAREER', label: 'Career Fair', icon: '💼' },
    { value: 'WORKSHOP', label: 'Workshop', icon: '🔧' },
    { value: 'SEMINAR', label: 'Seminar', icon: '📚' },
    { value: 'CONFERENCE', label: 'Conference', icon: '🎤' },
    { value: 'SOCIAL', label: 'Social Event', icon: '🎉' },
    { value: 'SPORTS', label: 'Sports Event', icon: '⚽' },
    { value: 'NETWORKING', label: 'Networking', icon: '🤝' },
    { value: 'CHARITY', label: 'Charity Event', icon: '❤️' },
    { value: 'GENERAL', label: 'General Event', icon: '📅' }
  ];

  const eventTypes = [
    { value: 'IN_PERSON', label: 'In-Person', icon: '📍' },
    { value: 'VIRTUAL', label: 'Virtual', icon: '💻' },
    { value: 'HYBRID', label: 'Hybrid', icon: '🔄' }
  ];

  const visibilityOptions = [
    { value: 'PUBLIC', label: 'Public', description: 'Anyone can view and register' },
    { value: 'ALUMNI_ONLY', label: 'Alumni Only', description: 'Only CGTTI alumni can register' },
    { value: 'PRIVATE', label: 'Private', description: 'Invitation only' }
  ];

  const registrationTypes = [
    { value: 'FREE', label: 'Free Registration' },
    { value: 'PAID', label: 'Paid Registration' },
    { value: 'INVITE_ONLY', label: 'Invitation Only' }
  ];

  const statusOptions = [
    { value: 'DRAFT', label: 'Draft', color: 'bg-gray-100 text-gray-800' },
    { value: 'PUBLISHED', label: 'Published', color: 'bg-green-100 text-green-800' }
  ];

  const popularTags = [
    'Networking', 'Workshop', 'Seminar', 'Conference', 'Alumni',
    'Career', 'Technology', 'Business', 'Education', 'Social',
    'Sports', 'Charity', 'Fundraising', 'Professional', 'Development'
  ];

  useEffect(() => {
    if (isEditMode) {
      loadEventData();
    }
  }, [id]);

  const loadEventData = async () => {
    setLoading(true);
    try {
      const event = await eventsAPI.getEventById(id!);
      
      // Parse agenda and speakers from JSON strings
      let agenda: AgendaItem[] = [defaultAgendaItem];
      let speakers: Speaker[] = [];
      
      try {
        if (event.agenda) {
          agenda = typeof event.agenda === 'string' 
            ? JSON.parse(event.agenda) 
            : event.agenda;
        }
        if (event.speakers) {
          speakers = typeof event.speakers === 'string'
            ? JSON.parse(event.speakers)
            : event.speakers;
        }
      } catch (error) {
        console.error('Failed to parse JSON data:', error);
      }

      setFormData({
        title: event.title || '',
        description: event.description || '',
        shortDescription: event.shortDescription || '',
        eventDate: event.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : '',
        startTime: event.startTime || '09:00',
        endTime: event.endTime || '17:00',
        location: event.location || '',
        address: event.address || '',
        city: event.city || 'Colombo',
        country: event.country || 'Sri Lanka',
        eventType: event.eventType || 'IN_PERSON',
        category: event.category || 'GENERAL',
        tags: Array.isArray(event.tags) ? event.tags : ['Networking'],
        status: event.status || 'DRAFT',
        visibility: event.visibility || 'ALUMNI_ONLY',
        registrationType: event.registrationType || 'FREE',
        price: event.price ? event.price.toString() : '',
        currency: event.currency || 'LKR',
        capacity: event.capacity ? event.capacity.toString() : '100',
        waitlistEnabled: event.waitlistEnabled !== false,
        registrationDeadline: event.registrationDeadline 
          ? new Date(event.registrationDeadline).toISOString().split('T')[0] 
          : '',
        coverImage: event.coverImage || '',
        galleryImages: Array.isArray(event.galleryImages) ? event.galleryImages : [],
        organizerName: event.organizerName || 'CGTTI Alumni Association',
        organizerEmail: event.organizerEmail || user?.email || '',
        organizerPhone: event.organizerPhone || '',
        agenda: agenda.length > 0 ? agenda : [defaultAgendaItem],
        speakers: speakers
      });
    } catch (error) {
      console.error('Failed to load event:', error);
      setError('Failed to load event data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleTagAdd = (tag: string) => {
    if (!formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!formData.tags.includes(newTag) && formData.tags.length < 10) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
        e.currentTarget.value = '';
      }
    }
  };

  const addAgendaItem = () => {
    setFormData(prev => ({
      ...prev,
      agenda: [...prev.agenda, { ...defaultAgendaItem }]
    }));
  };

  const updateAgendaItem = (index: number, field: keyof AgendaItem, value: string) => {
    const updatedAgenda = [...formData.agenda];
    updatedAgenda[index] = { ...updatedAgenda[index], [field]: value };
    setFormData(prev => ({ ...prev, agenda: updatedAgenda }));
  };

  const removeAgendaItem = (index: number) => {
    if (formData.agenda.length > 1) {
      const updatedAgenda = formData.agenda.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, agenda: updatedAgenda }));
    }
  };

  const addSpeaker = () => {
    setFormData(prev => ({
      ...prev,
      speakers: [...prev.speakers, { ...defaultSpeaker }]
    }));
  };

  const updateSpeaker = (index: number, field: keyof Speaker, value: string) => {
    const updatedSpeakers = [...formData.speakers];
    updatedSpeakers[index] = { ...updatedSpeakers[index], [field]: value };
    setFormData(prev => ({ ...prev, speakers: updatedSpeakers }));
  };

  const removeSpeaker = (index: number) => {
    const updatedSpeakers = formData.speakers.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, speakers: updatedSpeakers }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      // Basic validation
      if (!formData.title.trim()) {
        throw new Error('Event title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Event description is required');
      }
      if (!formData.eventDate) {
        throw new Error('Event date is required');
      }
      if (!formData.location.trim()) {
        throw new Error('Location is required');
      }

      // Prepare data
      const eventData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        capacity: parseInt(formData.capacity) || 100,
        // Ensure arrays are properly formatted
        tags: formData.tags,
        galleryImages: formData.galleryImages,
        // Handle JSON data
        agenda: formData.agenda,
        speakers: formData.speakers
      };

      if (isEditMode) {
        // Update existing event
        await eventsAPI.updateEvent(id!, eventData);
        setSuccess('Event updated successfully!');
      } else {
        // Create new event
        await eventsAPI.createEvent(eventData);
        setSuccess('Event created successfully!');
        
        // Reset form after successful creation
        if (!previewMode) {
          setTimeout(() => {
            setFormData({
              title: '',
              description: '',
              shortDescription: '',
              eventDate: '',
              startTime: '09:00',
              endTime: '17:00',
              location: '',
              address: '',
              city: 'Colombo',
              country: 'Sri Lanka',
              eventType: 'IN_PERSON',
              category: 'GENERAL',
              tags: ['Networking'],
              status: 'DRAFT',
              visibility: 'ALUMNI_ONLY',
              registrationType: 'FREE',
              price: '',
              currency: 'LKR',
              capacity: '100',
              waitlistEnabled: true,
              registrationDeadline: '',
              coverImage: '',
              galleryImages: [],
              organizerName: 'CGTTI Alumni Association',
              organizerEmail: user?.email || 'events@cgtti-alumni.org',
              organizerPhone: '',
              agenda: [defaultAgendaItem],
              speakers: []
            });
          }, 2000);
        }
      }

      // Redirect after success if in edit mode
      if (isEditMode) {
        setTimeout(() => {
          navigate(`/admin/events/${id}`);
        }, 1500);
      }
    } catch (error: any) {
      console.error('Failed to save event:', error);
      setError(error.message || 'Failed to save event. Please check your input.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!confirm('Are you sure you want to publish this event? This will make it visible to users.')) {
      return;
    }

    setSaving(true);
    try {
      await eventsAPI.updateEvent(id!, { ...formData, status: 'PUBLISHED' });
      setSuccess('Event published successfully!');
      setFormData(prev => ({ ...prev, status: 'PUBLISHED' }));
    } catch (error: any) {
      setError('Failed to publish event: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDuplicate = async () => {
    if (!confirm('Create a duplicate of this event?')) {
      return;
    }

    try {
      const duplicatedEvent = await eventsAPI.duplicateEvent(id!);
      setSuccess('Event duplicated successfully!');
      navigate(`/admin/events/edit/${duplicatedEvent.id}`);
    } catch (error: any) {
      setError('Failed to duplicate event: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link
              to="/admin/events"
              className="flex items-center text-gray-600 hover:text-blue-600 mb-2"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {isEditMode ? 'Edit Event' : 'Create New Event'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isEditMode 
                ? 'Update event details and manage registrations'
                : 'Fill in the details to create a new alumni event'}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Eye className="w-4 h-4 mr-2" />
              {previewMode ? 'Edit Mode' : 'Preview'}
            </button>
            
            {isEditMode && (
              <>
                <button
                  onClick={handleDuplicate}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </button>
                {formData.status === 'DRAFT' && (
                  <button
                    onClick={handlePublish}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Publish
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                formData.status === 'DRAFT' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {formData.status === 'DRAFT' ? 'Draft' : 'Published'}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                formData.eventType === 'IN_PERSON' 
                  ? 'bg-blue-100 text-blue-800' 
                  : formData.eventType === 'VIRTUAL'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {formData.eventType.replace('_', ' ')}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                formData.registrationType === 'FREE'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {formData.registrationType === 'FREE' ? 'Free' : 'Paid'} Event
              </span>
            </div>
            
            <div className="text-sm text-gray-600">
              {isEditMode ? 'Last updated: Just now' : 'New event'}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-6">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {success}
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Basic Information
              </h2>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Annual Alumni Reunion 2024"
                    disabled={previewMode}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description that will appear in listings (max 150 characters)"
                    maxLength={150}
                    disabled={previewMode}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.shortDescription.length}/150 characters
                  </p>
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
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Detailed description of the event. Include agenda, benefits, and what attendees will gain."
                    disabled={previewMode}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tag}
                        {!previewMode && (
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  
                  {!previewMode && (
                    <>
                      <input
                        type="text"
                        placeholder="Type a tag and press Enter"
                        onKeyDown={handleTagInput}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 mb-2">Popular tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {popularTags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleTagAdd(tag)}
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Date & Time Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Date & Time
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={previewMode}
                  />
                </div>

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={previewMode}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={previewMode}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Deadline
                </label>
                <input
                  type="date"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={previewMode}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to allow registration until event starts
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Location
              </h2>

              <div className="space-y-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Grand Ballroom, Colombo Hilton"
                    disabled={previewMode}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2 Sir Chittampalam A Gardiner Mawatha, Colombo 02"
                    disabled={previewMode}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Colombo"
                      disabled={previewMode}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Sri Lanka"
                      disabled={previewMode}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Agenda Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Event Agenda
                </h2>
                {!previewMode && (
                  <button
                    type="button"
                    onClick={addAgendaItem}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Session
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {formData.agenda.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="time"
                          value={item.time}
                          onChange={(e) => updateAgendaItem(index, 'time', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                          disabled={previewMode}
                        />
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateAgendaItem(index, 'title', e.target.value)}
                          placeholder="Session title"
                          className="px-3 py-2 border border-gray-300 rounded-lg flex-1"
                          disabled={previewMode}
                        />
                      </div>
                      {!previewMode && formData.agenda.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAgendaItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateAgendaItem(index, 'description', e.target.value)}
                      placeholder="Session description"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      disabled={previewMode}
                    />
                    {!previewMode && (
                      <input
                        type="text"
                        value={item.speaker || ''}
                        onChange={(e) => updateAgendaItem(index, 'speaker', e.target.value)}
                        placeholder="Speaker name (optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-2"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Speakers Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Featured Speakers
                </h2>
                {!previewMode && (
                  <button
                    type="button"
                    onClick={addSpeaker}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Speaker
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {formData.speakers.map((speaker, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-gray-800">Speaker {index + 1}</h3>
                      {!previewMode && (
                        <button
                          type="button"
                          onClick={() => removeSpeaker(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={speaker.name}
                        onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                        placeholder="Speaker full name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        disabled={previewMode}
                      />
                      <input
                        type="text"
                        value={speaker.role}
                        onChange={(e) => updateSpeaker(index, 'role', e.target.value)}
                        placeholder="Position/Role"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        disabled={previewMode}
                      />
                      <textarea
                        value={speaker.bio}
                        onChange={(e) => updateSpeaker(index, 'bio', e.target.value)}
                        placeholder="Short biography"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        disabled={previewMode}
                      />
                      {!previewMode && (
                        <input
                          type="text"
                          value={speaker.photo || ''}
                          onChange={(e) => updateSpeaker(index, 'photo', e.target.value)}
                          placeholder="Photo URL (optional)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Settings & Actions */}
          <div className="space-y-6">
            {/* Event Settings Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Settings</h2>
              
              <div className="space-y-4">
                {/* Event Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {eventTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer ${
                          formData.eventType === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="eventType"
                          value={type.value}
                          checked={formData.eventType === type.value}
                          onChange={handleChange}
                          className="sr-only"
                          disabled={previewMode}
                        />
                        <span className="text-lg mb-1">{type.icon}</span>
                        <span className="text-xs font-medium">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={previewMode}
                  >
                    {eventCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex space-x-2">
                    {statusOptions.map((status) => (
                      <label
                        key={status.value}
                        className={`flex-1 text-center px-4 py-3 border rounded-lg cursor-pointer ${
                          formData.status === status.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={status.value}
                          checked={formData.status === status.value}
                          onChange={handleChange}
                          className="sr-only"
                          disabled={previewMode}
                        />
                        <span className={`text-sm font-medium ${formData.status === status.value ? 'text-blue-700' : 'text-gray-700'}`}>
                          {status.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility
                  </label>
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={previewMode}
                  >
                    {visibilityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {visibilityOptions.find(v => v.value === formData.visibility)?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Settings Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Registration Settings
              </h2>

              <div className="space-y-4">
                {/* Registration Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Type
                  </label>
                  <select
                    name="registrationType"
                    value={formData.registrationType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={previewMode}
                  >
                    {registrationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                {formData.registrationType === 'PAID' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ticket Price (LKR)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                        disabled={previewMode}
                      />
                    </div>
                  </div>
                )}

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      min="1"
                      max="10000"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={previewMode}
                    />
                  </div>
                </div>

                {/* Waitlist */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="waitlistEnabled"
                    checked={formData.waitlistEnabled}
                    onChange={handleChange}
                    id="waitlist"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    disabled={previewMode}
                  />
                  <label htmlFor="waitlist" className="text-sm text-gray-700">
                    Enable waitlist when capacity is reached
                  </label>
                </div>
              </div>
            </div>

            {/* Media Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-blue-600" />
                Media
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                    disabled={previewMode}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 1200×600 pixels
                  </p>
                </div>

                {formData.coverImage && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x600/3B82F6/FFFFFF?text=Event+Cover+Image';
                      }}
                    />
                  </div>
                )}

                {!previewMode && (
                  <button
                    type="button"
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-gray-600"
                  >
                    <Upload className="w-5 h-5 mx-auto mb-2" />
                    <span className="text-sm">Upload Image</span>
                  </button>
                )}
              </div>
            </div>

            {/* Organizer Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                Organizer Info
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organizer Name
                  </label>
                  <input
                    type="text"
                    name="organizerName"
                    value={formData.organizerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={previewMode}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organizer Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      name="organizerEmail"
                      value={formData.organizerEmail}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={previewMode}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organizer Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      name="organizerPhone"
                      value={formData.organizerPhone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={previewMode}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-white rounded-xl shadow p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions</h2>
              
              <div className="space-y-3">
                {!previewMode ? (
                  <>
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {saving ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          {isEditMode ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {isEditMode ? 'Update Event' : 'Create Event'}
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/admin/events')}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(false)}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Edit className="w-4 h-4 mr-2 inline" />
                      Edit Event
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => navigate('/admin/events')}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2 inline" />
                      Back to Events
                    </button>
                  </>
                )}
              </div>

              {/* Event Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Event Summary</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{formData.eventType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium">
                      {eventCategories.find(c => c.value === formData.category)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Registration:</span>
                    <span className="font-medium">{formData.registrationType}</span>
                  </div>
                  {formData.registrationType === 'PAID' && formData.price && (
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-medium">LKR {parseFloat(formData.price).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span className="font-medium">{formData.capacity} people</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};