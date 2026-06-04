// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Automatically inject JWT tracking tokens into every outgoing request header
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const authAPI = {
//   signup: (userData) => api.post('/api/auth/signup', userData),
//   login: (credentials) => api.post('/api/auth/login', credentials),
// };

// export const urlAPI = {
//   create: (originalUrl) => api.post('/api/urls', { originalUrl }),
//   getAll: () => api.get('/api/urls'),
//   getAnalytics: (shortCode) => api.get(`/api/urls/${shortCode}/analytics`),
//   delete: (id) => api.delete(`/api/urls/${id}`),
//   update: (id, originalUrl) => api.put(`/api/urls/${id}`, { originalUrl }),
//   bulk: (csvData) => api.post('/api/urls/bulk', { csvData }),
// };

// export default api;
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT tracking tokens into every outgoing request header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (userData) => api.post('/api/auth/signup', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
};

export const urlAPI = {
  // Upgraded parameters payload configuration
  create: (urlData) => api.post('/api/urls', urlData), // Pass an object: { originalUrl, expiresAt, password }
  getAll: () => api.get('/api/urls'),
  getAnalytics: (shortCode) => api.get(`/api/urls/${shortCode}/analytics`),
  delete: (id) => api.delete(`/api/urls/${id}`),
  update: (id, urlData) => api.put(`/api/urls/${id}`, urlData), // Pass an object: { originalUrl, expiresAt, password }
  bulk: (csvData) => api.post('/api/urls/bulk', { csvData }),
};

export default api;
