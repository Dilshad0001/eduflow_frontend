import axios from 'axios';

const instance = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL:VITE_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
