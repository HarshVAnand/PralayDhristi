import axios from 'axios';

/**
 * Configurable Base URLs for FastAPI (AI Model) and Node.js (Hardware Ingestion)
 */
export const API_ENDPOINTS = {
  FASTAPI_AI_URL: import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000/api/v1',
  NODE_HARDWARE_URL: import.meta.env.VITE_NODE_BACKEND_URL || 'http://localhost:5000/api',
  WS_TELEMETRY_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:5000',
  USE_MOCK_FALLBACK: true // Set to false when your backends are running
};

/**
 * Axios instance for FastAPI Python AI backend
 */
export const fastapiClient = axios.create({
  baseURL: API_ENDPOINTS.FASTAPI_AI_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Axios instance for Node.js Hardware Telemetry & Alert backend
 */
export const nodeBackendClient = axios.create({
  baseURL: API_ENDPOINTS.NODE_HARDWARE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor for logging & token handling
fastapiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('pd_auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

nodeBackendClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('pd_auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));
