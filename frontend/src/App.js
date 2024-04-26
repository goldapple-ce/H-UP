import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProjectPage from './pages/ProjectPage';
import Layout from './components/layout/Layout';
import IssueEditorPage from './pages/IssueEditorPage';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MenuSidebar from './components/MenuSidebar/MenuSidebar';
import MessengerSidebar from './components/MessengerSidebar/MessengerSidebar';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <MenuSidebar/>
      <MessengerSidebar/>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route index element={<LoginPage />} />
          <Route path='SignupPage' element={<SignupPage />} />
          <Route path='ProjectPage' element={<ProjectPage />} />
          <Route path='Issue/:id' element={<IssueEditorPage />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
