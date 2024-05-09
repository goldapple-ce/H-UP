import { queryClient } from '@data/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import './global.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>,
  // </React.StrictMode>,
);
