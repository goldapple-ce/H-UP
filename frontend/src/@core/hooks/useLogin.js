import { requestLogin } from '@api/services/auth';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '@recoil/auth';

export default function useLogin({ userId, password }) {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(authState);

  const login = async () => {
    console.log(userId, password);
    const response = await requestLogin({ userId, password });
    console.log(response.data);

    sessionStorage.setItem('accessToken', response.data.jwtToken.accessToken);
    sessionStorage.setItem('refreshToken', response.data.jwtToken.refreshToken);

    setUserInfo({
      isLogin: true,
      memberId: response.data.memberId,
      jwtToken: {
        accessToken: response.data.jwtToken.accessToken,
        refreshToken: response.data.jwtToken.refreshToken,
      },
    });

    if (response.status === 200) navigate('/');
  };

  return { login };
}
