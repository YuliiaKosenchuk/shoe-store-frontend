import { apiClient } from '@/lib/apiClient';

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  role?: string;
}

export const UsersService = {
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get('/api/users/me');
    return response.data;
  },

  async updateProfile(data: Partial<UserProfile>) {
    const response = await apiClient.patch('/api/users/me', data);
    return response.data;
  }
};