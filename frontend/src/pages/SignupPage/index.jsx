import React, { useState } from 'react';
import styles from './SignupPage.module.scss'; // SCSS 스타일 시트 임포트
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    name: ''
  });
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameValid) {
      alert('Please use a different username.');
      return;
    }

    if (formData.password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('api/member/signup', formData);
      console.log('Server Response:', response.data);

      alert('회원가입 성공')

      navigate('/ProjectPage');
      
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error);
    }
  };

  const handleCheckUsername = async () => {
    if (!formData.userId) {
      alert('Please enter a username.');
      return;
    }
    try {
      const response = await axios.get(`api/member/check?userId=${formData.id}`);
      if (response.data.available) {
        alert('ID is available.');
        setUsernameValid(true);
      } else {
        alert('ID is already taken.');
        setUsernameValid(false);
      }
    } catch (error) {
      console.error('Error checking username:', error.response ? error.response.data : error);
      setUsernameValid(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.userId]: e.target.value
    });
  };

  return (
    <div className={styles.signup_container}>
      <h2>회원 가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={formData.userId}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={handleCheckUsername}>중복 확인</button>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
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
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default SignupPage;
