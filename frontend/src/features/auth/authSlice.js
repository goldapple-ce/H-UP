import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    memberId: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.memberId = action.payload;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.memberId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
