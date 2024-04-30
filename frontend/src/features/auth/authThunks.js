import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure } from './authSlice';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch }) => {
    try {
      const response = await axios.post('api/member/login', credentials);
      console.log(response);
      const data = await response.json();
      if (data.success) {
        dispatch(loginSuccess(data.user));
      } else {
        dispatch(loginFailure('Invalid credentials'));
      }
    } catch (error) {
      dispatch(loginFailure('Network error'));
    }
  }
);
