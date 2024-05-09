import { requestLogin } from '@api/services/auth';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '@recoil/authAtom';

export default function useLogin({ userId, password }) {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(authState);

  const login = async () => {
    console.log(userId, password);
    const response = await requestLogin({ userId, password });
    console.log(response);

    const memberId = response.data.memberId;
    const jwt = response.data.jwtToken;
    const accessToken = jwt.accessToken.split(' ')[1];
    const refreshToken = jwt.refreshToken.split(' ')[1];

    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);

    setUserInfo({
      memberId: memberId,
      jwtToken: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });

    if (response.status === 200) navigate('/');
  };

  return { login };
}
