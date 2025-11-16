import axios from 'axios';
import { LetterTemplate, GeneratedLetter, LetterFormData } from '@types';

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

export const lettersAPI = {
  // Template management
  getTemplates: async (): Promise<LetterTemplate[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/letter-templates`, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error fetching templates:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to fetch templates');
    }
  },

  createTemplate: async (templateData: Omit<LetterTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<LetterTemplate> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/letter-templates`, templateData, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error creating template:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to create template');
    }
  },

  // Letter generation
  generateLetters: async (letterData: LetterFormData): Promise<GeneratedLetter[]> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/letters/generate`, letterData, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error generating letters:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to generate letters');
    }
  },

  getGeneratedLetters: async (): Promise<GeneratedLetter[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/letters/generated`, getAuthHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Error fetching generated letters:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to fetch generated letters');
    }
  },

  // Export to PDF
  exportToPDF: async (letterId: string): Promise<Blob> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/letters/${letterId}/pdf`, {
        ...getAuthHeaders(),
        responseType: 'blob'
      });
      return response.data;
    } catch (error: any) {
      console.error('Error exporting to PDF:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to export to PDF');
    }
  }
};