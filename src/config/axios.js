import axios from 'axios';
import api from './api';

const instance = axios.create({
  // baseURL: api.url,
  baseURL: api.url,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
