import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// 다른 슬라이스 리듀서들을 여기에 추가

const rootReducer = combineReducers({
  auth: authReducer,
  // 추가적인 리듀서들을 여기에 포함
});

export default rootReducer;
