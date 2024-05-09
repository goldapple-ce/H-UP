// App.js
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
import PrivateRouteLogin from './features/auth/PrivateRouteLogin';

function App() {
  return (
    <Router>
      <NavBar/>
      <MenuSidebar/>
      <MessengerSidebar/>
      <main>
        <Routes>
          <Route element={<PrivateRouteLogin/>}>
            <Route path='/LoginPage' element={<LoginPage/>} />
            <Route path='SignupPage' element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoute/>}>
            <Route path='/' element={<Layout />}>
              <Route index element={<ProjectPage />} />
              <Route path='Issue/:id' element={<IssueEditorPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
