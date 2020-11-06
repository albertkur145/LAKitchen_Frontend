import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
