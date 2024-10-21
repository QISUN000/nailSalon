import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkEmail = async (email) => {
  try {
    const response = await api.post('/auth/check-email', { email });
    return response.data.exists;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (email, password, name) => {
  try {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const googleLogin = async (idToken) => {
  try {
    const response = await api.post('/auth/google-login', { idToken });
    return response.data;
  } catch (error) {
    console.error('Error with Google login:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/bookings', bookingData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const fetchUnavailableDates = async (professionalId) => {
  try {
    const response = await api.get(`/professionals/${professionalId}/unavailable-dates`);
    return response.data;
  } catch (error) {
    console.error('Error fetching unavailable dates:', error);
    throw error;
  }
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;