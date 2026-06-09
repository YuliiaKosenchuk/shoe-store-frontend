import { apiClient } from '@/lib/apiClient';
import { RegistrationFormValues } from '@/shemas/registration.shema';

export const AuthService = {

  async register(data: RegistrationFormValues) {
    const response = await apiClient.post('/api/auth/register', data);
    return response.data;
  },


  async login(credentials: { email: string; password: string }) {
    const response = await apiClient.post('/api/auth/login', credentials);
    
    if (response.data.token && typeof window !== 'undefined') {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
};