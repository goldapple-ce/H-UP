import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestLogin } from '../../api/service/auth';
import { loginFailure, loginSuccess } from './authSlice';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { dispatch }) => {
    try {
        const response = await requestLogin(credentials);

        if (response.status === 200) {
            dispatch(
                loginSuccess({ memberId: response.data.memberId, token: response.data.jwtToken })
            );
        } else {
            dispatch(loginFailure('Invalid credentials'));
        }
    } catch (error) {
        dispatch(loginFailure('Network error'));
    }
});
