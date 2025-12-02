import axios from 'axios';
import { Event, EventRegistration, RegistrationFormData, RegistrationStatistics } from '@types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

export const eventsAPI = {
  // Event Management
  getEvents: async (params?: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`, { 
        params,
        ...getAuthHeaders() 
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching events:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to fetch events');
    }
  },

  getEventById: async (id: string): Promise<Event> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events/${id}`, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error fetching event:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to fetch event');
    }
  },

  // Registration Management
  getRegistrations: async (params?: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/event-registrations`, { 
        params,
        ...getAuthHeaders() 
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching registrations:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to fetch registrations');
    }
  },

  registerForEvent: async (data: RegistrationFormData): Promise<EventRegistration> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/event-registrations`, data, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error registering for event:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to register for event');
    }
  },

  updateRegistration: async (id: string, data: Partial<EventRegistration>): Promise<EventRegistration> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/event-registrations/${id}`, data, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error updating registration:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to update registration');
    }
  },

  deleteRegistration: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/event-registrations/${id}`, getAuthHeaders());
    } catch (error: any) {
      console.error('Error deleting registration:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to delete registration');
    }
  },

  getRegistrationStatistics: async (eventId: string): Promise<RegistrationStatistics> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/event-registrations/statistics/${eventId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching statistics:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to fetch statistics');
    }
  },

  bulkUpdateRegistrations: async (registrationIds: string[], data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/event-registrations/bulk-update`, 
        { registrationIds, ...data },
        getAuthHeaders()
      );
      return response.data;
    } catch (error: any) {
      console.error('Error bulk updating registrations:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to bulk update registrations');
    }
  },

  exportRegistrations: async (eventId: string, format: string = 'csv'): Promise<Blob> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/event-registrations/export/${eventId}?format=${format}`, {
        ...getAuthHeaders(),
        responseType: 'blob'
      });
      return response.data;
    } catch (error: any) {
      console.error('Error exporting registrations:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to export registrations');
    }
  },

  // Check-in/Check-out
  checkIn: async (registrationId: string) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/event-registrations/${registrationId}`, {
        status: 'ATTENDED',
        checkInTime: new Date().toISOString()
      }, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error checking in:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to check in');
    }
  },

  checkOut: async (registrationId: string) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/event-registrations/${registrationId}`, {
        checkOutTime: new Date().toISOString()
      }, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error checking out:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to check out');
    }
  }
};