import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // 모든 리듀서를 결합한 루트 리듀서

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // 개발 환경에서만 DevTools 활성화
});
