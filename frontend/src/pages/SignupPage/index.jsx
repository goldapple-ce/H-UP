import React, { useState } from 'react';
import styles from './SignupPage.module.scss'; // SCSS 스타일 시트 임포트

function SignupPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 입력 데이터 유효성 검사 및 회원가입 처리 로직
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('ID:', id);
    console.log('Password:', password);
    console.log('Name:', name);
    console.log('Email:', email);
    // 회원가입 로직을 여기에 추가하세요.
  };

  const checkIdAvailability = () => {
    console.log('ID 중복 확인:', id);
    // ID 중복 검사 로직 구현
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
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <button type="button" onClick={checkIdAvailability}>중복 확인</button>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
