// src/services/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://calander-server.onrender.com', // Replace with your API base URL
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
