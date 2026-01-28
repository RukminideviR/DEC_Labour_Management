import api from './api';
import axios from 'axios';

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
      Password: password,
      CompanyId: companyId
    });
    
    if (response.data.data && response.data.data.length > 0) {
      return response.data.data[0];
    }
    throw new Error('Invalid response from login endpoint');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// POST Labour Document to Focus9 (NEW - For Labour Timesheet Entry)
export const postLabourDocument = async (payload, sessionId) => {
  try {
    const SCREEN_NAME = "Labour Weekly-Monthly TimeSheet";
    const FIXED_TOKEN =
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMTIzYTU5MC0xMDQyLTRjMzctODY2Mi00ODBjMGNlYTMwM2IiLCJ2YWxpZCI6IjEiLCJGb2N1cyBDZElkIjoiOTk4OTEzMzUyNSIsIkNvbXBhbnkgTmFtZSI6IkRFQyBJbmZyYSIsIkV4cGlyeSI6IjIzLTAzLTIwMjYiLCJleHAiOjE3NzQyMzYzNjAsImlzcyI6Imh0dHBzOi8vcmVqb3ljZWdyb3VwLmNvbSIsImF1ZCI6IlJlam95Y2UgVGVjaG5vbG9naWVzIn0.mkblrNhpBYkXRxh1ualbM-q09HexxRNbTHAaS7r1dsg";
    
    // Use proxy path with correct baseURL path
    const endpoint = `/api/Focus9Api/v1/Screens/PostDoc?ScreenName=${encodeURIComponent(SCREEN_NAME)}&sessionId=${sessionId}`;
    
    console.log("Posting Labour Document...", payload);
    
    // Create a direct axios instance to bypass the v2 baseURL conflict
    const response = await axios.post(endpoint, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: FIXED_TOKEN,
      },
    });
    
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting labour document:", error.response?.data || error.message);
    throw error;
  }
};

// Get next continuous Document No for Labour Entry
export const getNextDocNo = async (sessionId) => {
  try {
    const SCREEN_NAME = "Labour Weekly-Monthly TimeSheet";
    const endpoint = `/api/Focus9Api/v1/Screens/GetNextNumber?ScreenName=${encodeURIComponent(SCREEN_NAME)}&sessionId=${sessionId}`;
    
    const response = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    
    console.log("Next DocNo Response:", response.data);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching next document number:", error.response?.data || error.message);
    throw error;
  }
};

// Load existing Labour Document by Document No
export const loadLabourDoc = async (docNo, sessionId) => {
  try {
    const SCREEN_NAME = "Labour Weekly-Monthly TimeSheet";
    const endpoint = `/api/Focus9Api/v1/Screens/LoadDoc?ScreenName=${encodeURIComponent(SCREEN_NAME)}&DocumentNo=${encodeURIComponent(docNo)}&sessionId=${sessionId}`;
    
    const response = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    
    console.log("LoadDoc Response:", response.data);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error loading labour document:", error.response?.data || error.message);
    throw error;
  }
};

// Placeholder for future implementations
export const createDoc = async (payload, sessionId) => {
  console.log("Sending payload to Focus9 API", payload);
  return postLabourDocument(payload, sessionId);
};