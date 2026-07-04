import axios from 'axios';

const SENSITIVE_FIELDS = ['password', 'repeatedPassword', 'confirmPassword', 'token', 'newPassword'];

function redact(data: unknown): unknown {
  if (!data || typeof data !== 'object') return data;
  const clone: Record<string, unknown> = { ...(data as Record<string, unknown>) };
  for (const key of Object.keys(clone)) {
    if (SENSITIVE_FIELDS.includes(key)) clone[key] = '***';
  }
  return clone;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log(`[API] → ${config.method?.toUpperCase()} ${config.url}`, redact(config.data));
    return config;
  },
  (error) => {
    console.error('[API] Request setup failed:', error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API] ← ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `[API] ← ${error.response.status} ${error.config?.url}`,
        error.response.data
      );
      if (error.response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    } else {
      console.error(`[API] Network error — ${error.config?.url}:`, error.message);
    }
    return Promise.reject(error);
  }
);