import axios from 'axios';
import { Member, MemberFormData, FilterOptions } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.warn('No authentication token found');
    throw new Error('No authentication token found. Please login again.');
  }

  return {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

export const membersAPI = {
  getAll: async (filters: FilterOptions & { page?: number; limit?: number } = {}): Promise<{ 
    members: Member[]; 
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> => {
    try {
      // Clean the filters - remove empty values
      const cleanFilters: Record<string, any> = {};
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          cleanFilters[key] = value;
        }
      });

      const params = new URLSearchParams();
      
      Object.entries(cleanFilters).forEach(([key, value]) => {
        params.append(key, value.toString());
      });

      console.log('Fetching members with params:', params.toString());

      const response = await axios.get(
        `${API_BASE_URL}/members?${params.toString()}`,
        getAuthHeaders()
      );
      
      console.log('Members fetched successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching members:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = '/login';
        throw new Error('Authentication failed. Please login again.');
      }
      
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      // Return empty data to prevent UI breaking
      return {
        members: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      };
    }
  },

  create: async (memberData: MemberFormData): Promise<Member> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/members`, memberData, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error creating member:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to create member');
    }
  },

  update: async (id: string, memberData: Partial<MemberFormData>): Promise<Member> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/members/${id}`, memberData, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error updating member:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to update member');
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/members/${id}`, getAuthHeaders());
    } catch (error: any) {
      console.error('Error deleting member:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to delete member');
    }
  },
};