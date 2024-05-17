import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from '@component/Footer/Footer';
import MenuSidebar from '@component/MenuSidebar/MenuSidebar';
import MessengerSidebar from '@component/MessengerSidebar/MessengerSidebar';
import NavBar from '@component/Navbar/Navbar';
import Layout from '@component/layout/Layout';
import IssueEditorPage from '@page/IssueEditorPage';
import LoginPage from '@page/LoginPage';
import ProjectPage from '@page/ProjectPage';
import SignupPage from '@page/SignupPage';
import { useRecoilState } from 'recoil';
import { authState } from '@recoil/auth';
import LandingPage from '@page/LandingPage_temp';

function App() {
  const [userInfo] = useRecoilState(authState);

  return (
    <>
      <Router>
        <NavBar />
        {userInfo.isLogin ? (
          <>
            <MenuSidebar />
            <MessengerSidebar />
          </>
        ) : null}
        <main>
          <Routes>
            {!userInfo.isLogin ? (
              <Route path='/'>
                <Route path='login' element={<LoginPage />} />
                <Route path='signUp' element={<SignupPage />} />
              </Route>
            ) : null}
            <Route path='/' element={<Layout />}>
              <Route index element={<LandingPage />} />
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
