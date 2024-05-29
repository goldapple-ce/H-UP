import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from '@component/Footer/Footer';
import MenuSidebar from '@component/MenuSidebar/MenuSidebar';
import MessengerSidebar from '@component/MessengerSidebar/MessengerSidebar';
import NavBar from '@component/Navbar/Navbar';
import IssueEditorPage from '@page/IssueEditorPage';
import LoginPage from '@page/LoginPage';
import ProjectPage from '@page/ProjectPage';
import SignupPage from '@page/SignupPage';
import { useRecoilState } from 'recoil';
import { authState } from '@recoil/auth';
import LandingPage from '@page/LandingPage_temp';
import PrivateRoute from '@component/Route/PrivateRoute';

function App() {
  const [userInfo] = useRecoilState(authState);

  return (
    <>
      <Router>
        <NavBar />
        {userInfo.isLogin ? <MenuSidebar /> : null}
        <main>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signUp' element={<SignupPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='project/:id' element={<ProjectPage />} />
              <Route path='issue/:id' element={<IssueEditorPage />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </Router>
    </>
  );
}

export default App;
