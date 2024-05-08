import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure } from './authSlice';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch }) => {
    try {
      const response = await axios.post('api/member/login', credentials);

      if (response.status === 200) {
        dispatch(loginSuccess(response.data.memberId));
      } else {
        dispatch(loginFailure('Invalid credentials'));
      }
    } catch (error) {
      dispatch(loginFailure('Network error'));
    }
  }
);