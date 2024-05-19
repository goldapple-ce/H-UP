import { authState } from '@recoil/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const PrivateRoute = () => {
  const [userInfo] = useRecoilState(authState);
  return userInfo.isLogin ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
