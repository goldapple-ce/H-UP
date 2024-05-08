import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // 모든 리듀서를 결합한 루트 리듀서
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // you can choose to persist only specific reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);
export default store;
