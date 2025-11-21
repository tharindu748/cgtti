import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://cgtti-member.onrender.com';

export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  register: async (userData: any) => {
    const response = await axios.post(`${API_BASE}/auth/register`, userData);
    return response.data;
  },

  getProfile: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};