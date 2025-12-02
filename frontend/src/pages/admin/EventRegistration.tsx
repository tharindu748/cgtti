import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, Users, MapPin, Clock, Ticket, 
  CheckCircle, XCircle, User, Mail, Phone,
  Download, Search, Filter, Eye, Edit, Trash2,
  ArrowLeft, ChevronRight, Loader, AlertCircle,
  CheckSquare, Square, Award, CreditCard,
  QrCode, Printer, Send, Shield
} from 'lucide-react';
import { eventsAPI } from '../../api/events';
import { membersAPI } from '../../api/members';
import { useAuth } from '../../context/AuthContext';
interface EventRegistration {
  id: string;
  ticketNumber?: string;
  status: string;
  paymentStatus: string;
  paymentAmount?: number;
  guests: number;
  notes?: string;
  dietaryRequirements?: string;
  specialRequests?: string;
  checkInTime?: string;
  checkOutTime?: string;
  registrationDate: string;
  member: {
    id: string;
    name: string;
    email?: string;
    mobile: string;
    trainingNumber: string;
    district: string;
    trade: string;
  };
  event?: {
    title: string;
    eventDate: string;
    location: string;
  };
}

interface EventDetails {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  city: string;
  country: string;
  eventType: string;
  category: string;
  status: string;
  capacity: number;
  registeredCount: number;
  attendedCount: number;
  registrationType: string;
  price?: number;
  waitlistEnabled: boolean;
  registrationDeadline?: string;
  coverImage?: string;
}

export const EventRegistrationPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [event, setEvent] = useState<EventDetails | null>(null);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedRegistrations, setSelectedRegistrations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  
  // Registration form state
  const [memberSearch, setMemberSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [registrationForm, setRegistrationForm] = useState({
    guests: 0,
    notes: '',
    dietaryRequirements: '',
    specialRequests: ''
  });
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (eventId) {
      loadEventData();
      loadRegistrations();
    }
  }, [eventId]);

  const loadEventData = async () => {
    try {
      const eventData = await eventsAPI.getEventById(eventId!);
      setEvent(eventData);
      
      const statistics = await eventsAPI.getRegistrationStatistics(eventId!);
      setStats(statistics);
    } catch (error) {
      console.error('Failed to load event data:', error);
    }
  };

  const loadRegistrations = async () => {
    try {
      const params: any = { eventId };
      if (statusFilter !== 'all') params.status = statusFilter;
      if (paymentFilter !== 'all') params.paymentStatus = paymentFilter;
      if (searchQuery) params.search = searchQuery;

      const data = await eventsAPI.getRegistrations(params);
      setRegistrations(data.registrations);
    } catch (error) {
      console.error('Failed to load registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchMembers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const data = await membersAPI.getAll({
          search: query, limit: 10,
          trade: '',
          district: '',
          membershipYear: '',
          livingStatus: '',
          paymentStatus: '',
          isVerified: ''
      });
      setSearchResults(data.members);
    } catch (error) {
      console.error('Failed to search members:', error);
    }
  };

  const handleRegister = async () => {
    if (!selectedMember) {
      alert('Please select a member to register');
      return;
    }

    setRegistering(true);
    try {
      const registrationData = {
        eventId: eventId!,
        memberId: selectedMember.id,
        ...registrationForm
      };

      const result = await eventsAPI.registerForEvent(registrationData);
      
      alert(result.message || 'Registration successful!');
      setShowRegisterModal(false);
      resetRegistrationForm();
      loadRegistrations();
      loadEventData();
    } catch (error: any) {
      alert(error.message || 'Failed to register');
    } finally {
      setRegistering(false);
    }
  };

  const handleUpdateStatus = async (registrationId: string, newStatus: string) => {
    if (!confirm('Are you sure you want to update this registration?')) return;

    try {
      await eventsAPI.updateRegistration(registrationId, { status: newStatus });
      loadRegistrations();
      loadEventData();
    } catch (error) {
      alert('Failed to update registration');
    }
  };

  const handleCheckIn = async (registrationId: string) => {
    try {
      await eventsAPI.checkIn(registrationId);
      loadRegistrations();
      loadEventData();
    } catch (error) {
      alert('Failed to check in');
    }
  };

  const handleBulkUpdate = async (status: string) => {
    if (selectedRegistrations.length === 0) {
      alert('Please select registrations to update');
      return;
    }

    if (!confirm(`Update ${selectedRegistrations.length} registration(s) to ${status}?`)) return;

    try {
      await eventsAPI.bulkUpdateRegistrations(selectedRegistrations, { status });
      setSelectedRegistrations([]);
      loadRegistrations();
      loadEventData();
    } catch (error) {
      alert('Failed to update registrations');
    }
  };

  const handleExport = async () => {
    try {
      const blob = await eventsAPI.exportRegistrations(eventId!);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `registrations-${eventId}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Failed to export registrations');
    }
  };

  const toggleSelectRegistration = (id: string) => {
    setSelectedRegistrations(prev =>
      prev.includes(id)
        ? prev.filter(regId => regId !== id)
        : [...prev, id]
    );
  };

  const selectAllRegistrations = () => {
    if (selectedRegistrations.length === registrations.length) {
      setSelectedRegistrations([]);
    } else {
      setSelectedRegistrations(registrations.map(r => r.id));
    }
  };

  const resetRegistrationForm = () => {
    setSelectedMember(null);
    setMemberSearch('');
    setSearchResults([]);
    setRegistrationForm({
      guests: 0,
      notes: '',
      dietaryRequirements: '',
      specialRequests: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'WAITLISTED': return 'bg-orange-100 text-orange-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'ATTENDED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status: string) => {
    return status === 'PAID' 
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/events')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/events')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(event.eventDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {event.startTime} - {event.endTime}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            {isAdmin && (
              <>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Bulk Actions
                </button>
              </>
            )}
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Users className="w-4 h-4 mr-2" />
              Register Member
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Registrations</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.totalRegistrations || 0}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{stats?.confirmedRegistrations || 0}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Capacity</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats?.confirmedRegistrations || 0}/{stats?.capacity || 0}
              </p>
            </div>
            <div className="w-8 h-8 text-purple-500">📊</div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full"
                style={{ 
                  width: `${Math.min(100, ((stats?.confirmedRegistrations || 0) / (stats?.capacity || 1)) * 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Attended</p>
              <p className="text-2xl font-bold text-blue-600">{stats?.attended || 0}</p>
            </div>
            <Award className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {showBulkActions && isAdmin && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Bulk Actions</h3>
              <p className="text-sm text-yellow-700">
                {selectedRegistrations.length} registration(s) selected
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleBulkUpdate('CONFIRMED')}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Confirm Selected
              </button>
              <button
                onClick={() => handleBulkUpdate('CANCELLED')}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Cancel Selected
              </button>
              <button
                onClick={() => setSelectedRegistrations([])}
                className="px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={() => loadRegistrations()}
                placeholder="Search by name, email, ticket..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                loadRegistrations();
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="WAITLISTED">Waitlisted</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="ATTENDED">Attended</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment</label>
            <select
              value={paymentFilter}
              onChange={(e) => {
                setPaymentFilter(e.target.value);
                loadRegistrations();
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Payments</option>
              <option value="PAID">Paid</option>
              <option value="NON_PAID">Non-Paid</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setPaymentFilter('all');
                loadRegistrations();
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {isAdmin && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedRegistrations.length === registrations.length && registrations.length > 0}
                      onChange={selectAllRegistrations}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <Users className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-600">No registrations found</p>
                      <p className="text-sm text-gray-500">Try adjusting your filters or register a new member</p>
                    </div>
                  </td>
                </tr>
              ) : (
                registrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedRegistrations.includes(registration.id)}
                          onChange={() => toggleSelectRegistration(registration.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    )}
                    
                    {/* Member Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {registration.member.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {registration.member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {registration.member.email || registration.member.mobile}
                          </div>
                          <div className="text-xs text-gray-400">
                            {registration.member.trainingNumber} • {registration.member.district}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Ticket */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {registration.ticketNumber ? (
                        <div className="flex items-center space-x-2">
                          <Ticket className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-mono">{registration.ticketNumber}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                        {registration.status}
                      </span>
                      {registration.guests > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          +{registration.guests} guest(s)
                        </div>
                      )}
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(registration.paymentStatus)}`}>
                          {registration.paymentStatus}
                        </span>
                        {registration.paymentAmount && (
                          <div className="text-xs text-gray-600">
                            LKR {registration.paymentAmount.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(registration.registrationDate).toLocaleDateString()}
                      <div className="text-xs text-gray-500">
                        {new Date(registration.registrationDate).toLocaleTimeString()}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {isAdmin && (
                        <>
                          {registration.status === 'CONFIRMED' && !registration.checkInTime && (
                            <button
                              onClick={() => handleCheckIn(registration.id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Check In"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          
                          {registration.checkInTime && !registration.checkOutTime && (
                            <button
                              onClick={() => handleCheckIn(registration.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Checked In"
                            >
                              ✓
                            </button>
                          )}

                          <button
                            onClick={() => navigate(`/registrations/${registration.id}`)}
                            className="text-gray-600 hover:text-gray-900"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleUpdateStatus(registration.id, 'CANCELLED')}
                            className="text-red-600 hover:text-red-900"
                            title="Cancel Registration"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Register Member for Event
                </h2>
                <button
                  onClick={() => {
                    setShowRegisterModal(false);
                    resetRegistrationForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Member Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Member *
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={memberSearch}
                    onChange={(e) => {
                      setMemberSearch(e.target.value);
                      handleSearchMembers(e.target.value);
                    }}
                    placeholder="Search by name, training number, or email..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && !selectedMember && (
                  <div className="mt-2 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                    {searchResults.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => setSelectedMember(member)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      >
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-600">
                          {member.trainingNumber} • {member.district} • {member.trade.replace('_', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Member */}
                {selectedMember && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-green-800">{selectedMember.name}</h4>
                        <div className="text-sm text-green-700 mt-1">
                          <div>Training: {selectedMember.trainingNumber}</div>
                          <div>Email: {selectedMember.email || 'Not provided'}</div>
                          <div>Mobile: {selectedMember.mobile}</div>
                          <div>District: {selectedMember.district}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMember(null)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={registrationForm.guests}
                    onChange={(e) => setRegistrationForm(prev => ({
                      ...prev,
                      guests: parseInt(e.target.value) || 0
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Requirements
                  </label>
                  <input
                    type="text"
                    value={registrationForm.dietaryRequirements}
                    onChange={(e) => setRegistrationForm(prev => ({
                      ...prev,
                      dietaryRequirements: e.target.value
                    }))}
                    placeholder="Vegetarian, allergies, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={registrationForm.specialRequests}
                    onChange={(e) => setRegistrationForm(prev => ({
                      ...prev,
                      specialRequests: e.target.value
                    }))}
                    rows={3}
                    placeholder="Any special requests or notes..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={registrationForm.notes}
                    onChange={(e) => setRegistrationForm(prev => ({
                      ...prev,
                      notes: e.target.value
                    }))}
                    rows={2}
                    placeholder="Internal notes..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Event Info Summary */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Event Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                  <div>Event: {event.title}</div>
                  <div>Date: {new Date(event.eventDate).toLocaleDateString()}</div>
                  <div>Time: {event.startTime} - {event.endTime}</div>
                  <div>Location: {event.location}</div>
                  <div>Type: {event.registrationType} {event.price ? `(LKR ${event.price})` : ''}</div>
                  <div>Capacity: {event.registeredCount}/{event.capacity}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => {
                    setShowRegisterModal(false);
                    resetRegistrationForm();
                  }}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegister}
                  disabled={!selectedMember || registering}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {registering ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Register Member'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};