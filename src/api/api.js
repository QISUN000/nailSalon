import axios from 'axios';
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  // Ensure token has Bearer prefix
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
};

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
    // Log the request data
    const registerData = { email, password, name };
    console.log('Registration request:', registerData);

    const response = await api.post('/auth/register', registerData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    // Log the actual error response from the server
    if (error.response?.data) {
      console.error('Server error details:', error.response.data);
    }
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

api.interceptors.request.use(
  (config) => {
      const token = getAuthToken();
      if (token) {
          config.headers.Authorization = token;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// Update createBooking function
export const createBooking = async (bookingData) => {
  try {
      const token = getAuthToken();
      if (!token) {
          throw new Error('Please log in to create a booking');
      }

      // Format the date and time
      const [hours, minutes] = bookingData.time.split(':');
      const datetime = new Date(bookingData.date);
      datetime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Match the BookingRequest structure expected by the backend
      const bookingRequest = {
        professional: {
            id: bookingData.professionalId
        },
        services: bookingData.services.map(serviceId => ({ 
            id: serviceId 
        })),
        startTime: datetime.toISOString()
    };
    console.log('Complete request:', {
        body: bookingRequest,
        headers: {
            Authorization: token
        }
    });

      console.log('Token:', token);  // Debug log
      console.log('Sending booking request:', bookingRequest);

      const response = await api.post('/bookings', bookingRequest, {
          headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
          }
      });

      return response.data;
  } catch (error) {
      console.error('API Error:', error.response?.data);
      if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token'); // Clear invalid token
          throw new Error('Please log in again');
      }
      const errorMessage = error.response?.data?.message || 'Failed to create booking';
      throw new Error(errorMessage);
  }
};

// Updated formatDateTime function to handle separate date and time
const formatDateTime = (date, time) => {
  try {
      const [hours, minutes] = time.split(':');
      const datetime = new Date(date);
      datetime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return datetime.toISOString();
  } catch (error) {
      console.error('Error formatting date time:', error);
      throw new Error('Invalid date or time format');
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