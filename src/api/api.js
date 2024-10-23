import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});



// Initialize token from localStorage

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
        if (response.data.accessToken) {
            setAuthToken(response.data.accessToken);
            console.log('Token set:', api.defaults.headers.common['Authorization']);
        }
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
        if (response.data.accessToken) {
            setAuthToken(response.data.accessToken);
        }
        return response.data;
    } catch (error) {
        console.error('Error with Google login:', error);
        throw error;
    }
};

export const setAuthToken = (token) => {
  if (token) {
      const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      localStorage.setItem('token', formattedToken);
      api.defaults.headers.common['Authorization'] = formattedToken;
  } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
  }
};

const token = localStorage.getItem('token');
if (token) {
    api.defaults.headers.common['Authorization'] = token;
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
      config.headers.Authorization = token;
  }
  return config;
});

export const createBooking = async (bookingData) => {
    try {
        console.log('Current auth header:', api.defaults.headers.common['Authorization']);
        console.log('Token in localStorage:', localStorage.getItem('token'));
       
      const [hours, minutes] = bookingData.time.split(':');
        const datetime = new Date(bookingData.date);
        datetime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        const bookingRequest = {
            professional: {
                id: bookingData.professionalId
            },
            services: bookingData.services.map(serviceId => ({ 
                id: serviceId 
            })),
            startTime: datetime.toISOString()
        };

         // Get the token from localStorage
         const token = localStorage.getItem('token');
        
         // Add token to request headers
         const config = {
             headers: {
                 'Authorization': `Bearer ${token}`
             }
         };
 
         // Pass config as second parameter to include auth header
         const response = await api.post('/bookings', bookingRequest, config);
         return response.data;
    } catch (error) {
        console.log('Request headers:', error.config?.headers);
        if (error.response?.status === 401) {
            throw new Error('Please log in to continue');
        }
        throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
};

// export const fetchUnavailableDates = async (professionalId) => {
//     try {
//         const response = await api.get(`/professionals/${professionalId}/unavailable-dates`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching unavailable dates:', error);
//         throw error;
//     }
// };

export default api;