import { authState } from '@recoil/auth';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';

export default function useLogout() {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(authState);

  const logout = async () => {
    console.log('logout');
    localStorage.clear();
    setUserInfo({
      isLogin: false,
      memberId: 0,
    });
    navigate('/login');
  };

  return { logout };
}
