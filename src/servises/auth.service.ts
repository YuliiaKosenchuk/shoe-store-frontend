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

    console.log('[AuthService.register] Sending payload:', payload);

    const response = await apiClient.post('/api/auth/register', payload);

    console.log('[AuthService.register] Response status:', response.status);
    console.log('[AuthService.register] Response data:', response.data);

    if (typeof window !== 'undefined') {
      const token = response.data?.token ?? response.data?.accessToken ?? null;
      if (token) {
        localStorage.setItem('token', token);
        console.log('[AuthService.register] Token saved to localStorage');
      } else {
        console.warn('[AuthService.register] No token in response — skipping localStorage write');
      }

      const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
      };
      localStorage.setItem('user', JSON.stringify(user));
      console.log('[AuthService.register] User saved to localStorage:', user);
    }

    return response.data;
  },


  async login(credentials: { email: string; password: string }) {
    console.log('[AuthService.login] Sending credentials for:', credentials.email);

    const response = await apiClient.post('/api/auth/login', credentials);

    console.log('[AuthService.login] Response status:', response.status);
    console.log('[AuthService.login] Response data:', response.data);

    if (typeof window !== 'undefined') {
      const token = response.data?.token ?? response.data?.accessToken ?? null;
      if (token) {
        localStorage.setItem('token', token);
        console.log('[AuthService.login] Token saved to localStorage');
      } else {
        console.warn('[AuthService.login] No token in response');
      }
    }

    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await apiClient.post('/api/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token: string, newPassword: string) {
    const response = await apiClient.post('/api/auth/reset-password', { token, newPassword });
    return response.data;
  },

  loginWithGoogle() {
    const googleOAuthUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;
    console.log('[AuthService.loginWithGoogle] Redirecting to Google OAuth:', googleOAuthUrl);
    window.location.href = googleOAuthUrl;
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('[AuthService.logout] Cleared session, redirecting to /login');
      window.location.href = '/login';
    }
  }
};