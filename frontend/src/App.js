import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import PrivateRoute from './features/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <NavBar/>
      <MenuSidebar/>
      <MessengerSidebar/>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route element={<PrivateRoute/>}>
            <Route path='SignupPage' element={<SignupPage />} />
            <Route path='ProjectPage' element={<ProjectPage />} />
            <Route path='Issue/:id' element={<IssueEditorPage />} />
          </Route>
          
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
