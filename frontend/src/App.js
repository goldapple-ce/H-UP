import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import IssuePage from './pages/IssuePage';
import Layout from './components/layout/Layout';
import IssueEditorPage from './pages/IssueEditorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route index element={<LoginPage />} />
          <Route path='SignupPage' element={<SignupPage />} />
          <Route path='IssuePage' element={<IssuePage />} />
          <Route path='Issue' element={<IssueEditorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
