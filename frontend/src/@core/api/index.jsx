import axios from 'axios';
import interceptor from './interceptor/interceptor';

export const baseAxios = axios.create({
  baseURL: `${import.meta.env.REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAxios = axios.create({
  baseURL: `${import.meta.env.REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
interceptor(authAxios);
