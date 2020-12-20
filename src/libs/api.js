import axios from 'axios';

const api = axios.create({
  baseURL: process.env.URL_PROD,
});

export default api;
