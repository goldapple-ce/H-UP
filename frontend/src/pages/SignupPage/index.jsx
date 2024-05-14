import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestIdCheck, requestSignup } from '@api/services/auth';
import styles from './SignupPage.module.scss'; // SCSS 스타일 시트 임포트

function SignupPage() {
  const [usernameValid, setUsernameValid] = useState(true);
  const [userId, setuserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!usernameValid) {
      alert('Please use a different username.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const formData = {
      userId: userId,
      password: password,
      name: name,
    };

    try {
      const response = await requestSignup(formData);
      console.log('Server Response:', response.data);

      alert('회원가입 성공');

      navigate('/');
    } catch (error) {
      console.error(
        'Signup error:',
        error.response ? error.response.data : error,
      );
    }
  };

  const handleCheckUsername = async () => {
    if (!userId) {
      alert('Please enter a username.');
      return;
    }
    try {
      const response = await requestIdCheck(userId);
      console.log(response.data);
      if (response.data.available) {
        alert('ID is available.');
        setUsernameValid(true);
      } else {
        alert('ID is already taken.');
        setUsernameValid(false);
      }
    } catch (error) {
      console.error(
        'Error checking username:',
        error.response ? error.response.data : error,
      );
      setUsernameValid(false);
    }
  };

  return (
    <div className={styles.signup_container}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.id_container}>
          <input
            className={styles.inputId}
            type='text'
            value={userId}
            placeholder='ID를 입력하세요.'
            onChange={e => setuserId(e.target.value)}
            required
          />
          <button className={styles.checkId} type='button' onClick={handleCheckUsername}>
            중복 확인
          </button>
        </div>
        <div>
          <input
            type='password'
            id='password'
            value={password}
            placeholder='비밀번호를 입력하세요.'
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type='password'
            id='passwordConfirm'
            value={passwordConfirm}
            placeholder='비밀번호를 재입력하세요.'
            onChange={e => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type='text'
            id='name'
            value={name}
            placeholder='이름을 입력하세요.'
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <button className={styles.signup} type='submit'>가입하기</button>
      </form>
    </div>
  );
}

export default SignupPage;
