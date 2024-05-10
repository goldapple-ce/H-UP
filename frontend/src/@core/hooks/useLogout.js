import { authState } from '@recoil/auth';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';

export default function useLogout() {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(authState);

  const logout = async () => {
    console.log('logout');
    setUserInfo({
      isLogin: false,
      memberId: '',
    });
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return { logout };
}
