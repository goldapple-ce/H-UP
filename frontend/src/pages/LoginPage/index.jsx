import useInput from '@hook/useInput';
import useLogin from '@hook/useLogin';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';

const LoginPage = props => {
  const { state: userId, onChange: onUserIdChange } = useInput();
  const { state: password, onChange: onPasswordChange } = useInput();

  const navigate = useNavigate();

  const { login } = useLogin({ userId, password });

  const onButtonSignup = () => {
    navigate('/signUp');
  };

  return (
    <div className={styles.whole_container}>
      <div className={styles.login_container}>
        <form>
          <input
            className={'inputBox'}
            type='userId'
            placeholder='ID를 입력하세요.'
            onChange={onUserIdChange}
          />
          <input
            className={'inputBox'}
            type='password'
            placeholder='비밀번호를 입력하세요.'
            onChange={onPasswordChange}
          />
          <input
            className={'inputButton'}
            type='button'
            value={'로그인'}
            onClick={login}
          />
          <div className={styles.search_info}>
            <p>비밀번호 재설정</p>
          </div>
        </form>
      </div>
      <div className={styles.notMember_container}>
        <p>아직 회원이 아니신가요?</p>
        <h5 onClick={onButtonSignup}>
          <strong>회원가입하러 가기</strong>
        </h5>
      </div>
    </div>
  );
};

export default LoginPage;
