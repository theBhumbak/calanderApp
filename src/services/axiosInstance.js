// src/services/axiosInstance.js

import axios from 'axios';
import {useServerUrl} from '../utils';

const axiosInstance = axios.create({
  baseURL: useServerUrl, // Replace with your API base URL
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
