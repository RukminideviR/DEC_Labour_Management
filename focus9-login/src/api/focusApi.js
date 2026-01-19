import api from './api';

// Get list of companies
export const getCompanies = async () => {
  try {
    const response = await api.get('/Company/GetList');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (username, password, companyId) => {
  try {
    const response = await api.post('/Login/Login', {
      username,
      Password: password, // Note: API expects capital P
      CompanyId: companyId
    });
    
    if (response.data.data && response.data.data.length > 0) {
      return response.data.data[0]; // Returns { Token, EmployeeId, fSessionId }
    }
    throw new Error('Invalid response from login endpoint');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const createDoc = async (payload, sessionId) => {
    console.log("Sending payload to Focus9 API", payload);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };
  