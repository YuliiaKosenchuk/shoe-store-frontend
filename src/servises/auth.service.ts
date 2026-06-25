import { apiClient } from '@/lib/apiClient';
import { RegistrationFormValues } from '@/shemas/registration.shema';

type RegisterPayload = Omit<RegistrationFormValues, 'confirmPassword'> & {
  repeatedPassword: string;
};

export const AuthService = {

  async register(data: RegistrationFormValues) {
    const payload: RegisterPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      repeatedPassword: data.confirmPassword,
    };

    console.log('[Auth] Register: step 1 — creating account for', data.email);
    await apiClient.post('/api/auth/register', payload);
    console.log('[Auth] Register: step 2 — account created, logging in');

    const loginResponse = await apiClient.post('/api/auth/login', {
      email: data.email,
      password: data.password,
    });

    if (typeof window !== 'undefined') {
      const token = loginResponse.data?.token ?? null;
      if (token) {
        localStorage.setItem('token', token);
        console.log('[Auth] Register: token saved, user is authenticated');
      } else {
        console.warn('[Auth] Register: login succeeded but no token in response');
      }
    }

    return loginResponse.data;
  },

  async login(credentials: { email: string; password: string }) {
    console.log('[Auth] Login:', credentials.email);

    const response = await apiClient.post('/api/auth/login', credentials);

    if (typeof window !== 'undefined') {
      const token = response.data?.token ?? response.data?.accessToken ?? null;
      if (token) {
        localStorage.setItem('token', token);
        console.log('[Auth] Login: token saved');
      } else {
        console.warn('[Auth] Login: no token in response');
      }
    }

    return response.data;
  },

  async forgotPassword(email: string) {
    console.log('[Auth] Forgot password for:', email);
    const response = await apiClient.post('/api/auth/forgot-password', { email });
    console.log('[Auth] Forgot password: reset email sent');
    return response.data;
  },

  async resetPassword(token: string, newPassword: string) {
    console.log('[Auth] Reset password: submitting new password');
    const response = await apiClient.post('/api/auth/reset-password', { token, newPassword });
    console.log('[Auth] Reset password: success');
    return response.data;
  },

  loginWithGoogle() {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const googleOAuthUrl = `${apiBase}/oauth2/authorization/google`;
    console.log('[Auth] Google OAuth: redirecting to', googleOAuthUrl);
    window.location.href = googleOAuthUrl;
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('[Auth] Logout: session cleared');
      window.location.href = '/login';
    }
  }
};