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
      <h2>회원 가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='userId'>ID:</label>
          <input
            type='text'
            id='userId'
            value={userId}
            onChange={e => setuserId(e.target.value)}
            required
          />
          <button type='button' onClick={handleCheckUsername}>
            중복 확인
          </button>
        </div>
        <div>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='passwordConfirm'>비밀번호 확인</label>
          <input
            type='password'
            id='passwordConfirm'
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='name'>이름</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        {/* <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}
        <button type='submit'>가입하기</button>
      </form>
    </div>
  );
}

export default SignupPage;
