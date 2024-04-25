import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProjectPage from './pages/ProjectPage';
import Layout from './components/layout/Layout';
import IssueEditorPage from './pages/IssueEditorPage';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
    <div>
      <NavBar/>
    <Routes>
        <Route path='/' element={<Layout />}>

          <Route index element={<LoginPage />} />
          <Route path='SignupPage' element={<SignupPage />} />
          <Route path='ProjectPage' element={<ProjectPage />} />
          <Route path='Issue/:id' element={<IssueEditorPage />} />
        </Route>
      </Routes>
      <Footer/>
    </div>
      
    </BrowserRouter>
  );
}

export default App;
