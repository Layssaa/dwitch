import axios from 'axios';

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH_URL ?? 'http://localhost:5000',
});

export const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_USER_URL ?? 'http://localhost:5001',
});

export const channelsApi = axios.create({
  baseURL: import.meta.env.VITE_API_CHANNEL_URL ?? 'http://localhost:5002',
});

export const broadcastsApi = axios.create({
  baseURL: import.meta.env.VITE_API_BROADCAST_URL ?? 'http://localhost:5003',
});
