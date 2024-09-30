import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Adjust the base URL based on your Django API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
