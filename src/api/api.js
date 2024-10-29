import axios from 'axios';
// Add at the top of your api.js file, after creating the api instance
// const API_URL = 'http://localhost:8080/api';
const API_URL = 'https://nailsalon1028-bqbjfzcredgdche9.canadacentral-01.azurewebsites.net/';
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log('Making API request:', {
            method: config.method,
            url: config.url,
            data: config.data,
            headers: config.headers
        });
        return config;
    },
    (error) => {
        console.error('API request error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('API response:', {
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('API response error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        return Promise.reject(error);
    }
);





export const setAuthToken = (token) => {
    if (!token) {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        console.log('Token cleared');
        return;
    }

    // Format token consistently
    const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    
    // Store token and update headers
    localStorage.setItem('token', formattedToken);
    api.defaults.headers.common['Authorization'] = formattedToken;
    console.log('Token set successfully:', formattedToken);
    return true;
};

// Enhanced login with proper token handling
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { accessToken, role } = response.data;
        if (accessToken) {
            document.cookie = "loggedIn=true";
            setAuthToken(accessToken);
            localStorage.setItem('userRole', role);
            // Verify token was set
            const currentToken = localStorage.getItem('token','userRole');
            console.log('Token after login:', currentToken, role); // Debug log
            return{
                token: accessToken,
                role: role
            }
            

        }
       
        throw new Error('Login failed');
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};

export const getRoleBasedPath = (role) => {
    console.log('role before navigate', role)
    switch(role) {
        case 'PROFESSIONAL':
            return '/professional';
        case 'ADMIN':
            return '/admin';
        case 'CUSTOMER':
        default:
            return '/customer';
    }
};

export const createBooking = async (bookingData) => {
    try {
       
        console.log('Before booking - role:', localStorage.getItem('userRole'));
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        // Ensure token is in headers
        api.defaults.headers.common['Authorization'] = token;
        
        console.log('Creating booking with data:', bookingData);

        // Verify the data structure
        if (!bookingData.professionalId || !bookingData.serviceIds || !bookingData.startTime) {
            throw new Error('Invalid booking data format');
        }

        // The data is already properly formatted from handleBookingCreation
        const response = await api.post('/bookings', bookingData);
        console.log('After booking - role:', localStorage.getItem('userRole'))
        console.log('Booking response:', response.data);
        return response.data;
      
    } catch (error) {
        console.error('Booking creation error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });


        throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
};

// Rest of your API functions...
export const checkEmail = async (email) => {
    try {
        const response = await api.post('/auth/check-email', { email });
        return response.data.exists;
    } catch (error) {
        throw error;
    }
};

export const register = async (email, password, name) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
};

export const googleLogin = async (idToken) => {
    try {
        const response = await api.post('/auth/google-login', { idToken });
        if (response.data.accessToken) {
            setAuthToken(response.data.accessToken);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Initialize token from localStorage on load
const token = localStorage.getItem('token');
if (token) {
    api.defaults.headers.common['Authorization'] = token;
    console.log('Initial token loaded:', token); // Debug log
}

export const getUserName = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        // Ensure token is in headers
        api.defaults.headers.common['Authorization'] = token;
        
        const response = await api.get('/auth/me');
        return response;
    } catch (error) {
        console.error('Error fetching name:', error);
        throw error;
    }
};

export const getAllAppointments = async () => {
    try {
      const response = await api.get('/bookings/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  };
  
  export const cancelAppointment = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      return true;
    } catch (error) {
      console.error('Error canceling appointment:', error);
      throw error;
    }
  };

  export const getAllProfessionals = async () => {
    try {
      const response = await api.get('/professionals');
      return response.data;
    } catch (error) {
      console.error('Error fetching professionals:', error);
      throw error;
    }
  };
  
  export const deleteProfessional = async (id) => {
    try {
      await api.delete(`/professionals/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting professional:', error);
      throw error;
    }
  };

  export const getMyAppointments = async () => {
    try {
      const response = await api.get('/bookings/my-bookings');
      return response.data;
    } catch (error) {
      console.error('Error fetching customer appointments:', error);
      throw error;
    }
  };

  export const getProfessionalId = async () => {
    try {
      const response = await api.get('/professionals/user');
      return response.data.id;
    } catch (error) {
      console.error('Error fetching professional ID:', error);
      throw error;
    }
  };
  
  export const getProfessionalAppointments = async (professionalId) => {
    try {
      const response = await api.get(`/bookings/professional/${professionalId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching professional appointments:', error);
      throw error;
    }
  };

  export const createProfessional = async (professionalData) => {
    try {
      const response = await api.post('/professionals', professionalData);
      return response.data;
    } catch (error) {
      console.error('Error creating professional:', error);
      throw error;
    }
  };

  export const getAppointmentDetails = async (appointmentId) => {
    try {
      const response = await api.get(`/bookings/${appointmentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      throw error;
    }
  };
  
  export const getServiceCategories = async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching service categories:', error);
      throw error;
    }
  };
  
  export const updateAppointment = async (appointmentId, updateData) => {
    try {
      const response = await api.put(`/bookings/${appointmentId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  };
  
  export const getProfessionalById = async (professionalId) => {
    try {
      const response = await api.get(`/professionals/${professionalId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching professional details:', error);
      throw error;
    }
  };
  
  export const updateProfessional = async (professionalId, professionalData) => {
    try {
      const response = await api.put(`/professionals/${professionalId}`, professionalData);
      return response.data;
    } catch (error) {
      console.error('Error updating professional:', error);
      throw error;
    }
  };

  export const getCategories = async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
export default api;