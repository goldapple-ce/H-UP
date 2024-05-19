import { requestLogin } from '@api/services/auth';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '@recoil/auth';

import Swal from 'sweetalert2';

function loginFailAlert() {
  Swal.fire({
    title: '로그인 실패',
    text: '입력하신 정보를 확인해주세요.',
    icon: 'info',
    confirmButtonText: '확인'
  });
}

export default function useLogin({ userId, password }) {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(authState);

  const login = async () => {
    console.log(userId, password);
    try {
      const response = await requestLogin({ userId, password });
      console.log(response.data);
      const { jwtToken, memberId } = response.data;

      localStorage.setItem('accessToken', jwtToken.accessToken);
      localStorage.setItem('refreshToken', jwtToken.refreshToken);

      setUserInfo({
        isLogin: true,
        memberId: memberId,
      });

      if (response.status === 200) navigate('/');
    } catch (error) {
      loginFailAlert();
    }
  };

  return { login };
}
