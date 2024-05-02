import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { QueryClientProvider, QueryClient } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
