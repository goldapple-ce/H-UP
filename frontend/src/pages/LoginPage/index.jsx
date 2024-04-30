import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginPage.module.scss'; 
//import { loginAPI } from "../../api/service/user";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authThunks'

const LoginPage = (props) => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [userIdError, setUserIdError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const onButtonClick = () => {
    setUserIdError('')
    setPasswordError('')
    const login = async (userId, password) => {
        
      try {
          dispatch(loginUser({userId:userId, password:password}));

          return 'success';

          // if (response.status === 200) {
          //     const user = response.data.memberId;
          //     console.log('Login successful:', user);
          //     return user;
          // } else {
          //     const error = response.data;
          //     console.error('Login failed:', error.message);
          //     return error;
          // }

          } catch (error) {
          console.error('Login error:', error);
          return error;
      }
  }
    if ('' === userId) {
      setUserIdError('Please enter your userId')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
        const response = login(userId, password);
        
        if (response === 'success') {
          navigate('/ProjectPage');
        }
  }

  const onButtonSignup = () => {
    navigate('/SignupPage')
  }

  return (
    <div>
      <div className={styles.login_container}>
        <form>
          <h2>로그인</h2>
            <p>아이디 : </p>
            <input
              type="userId"
              value={userId}
              placeholder="아이디를 입력하세요."
              onChange={(ev) => setUserId(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{userIdError}</label>
            <p>비밀번호 : </p>
            <input
              type="password"
              value={password}
              placeholder="비밀번호를 입력하세요."
              onChange={(ev) => setPassword(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{passwordError}</label>
            <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
            
            <p>아이디 찾기 / 비밀번호 재설정</p>
            {auth.error && <p>{auth.error}</p>}
        </form>
        <p>
          아직 회원이 아니신가요?
        </p> 
        <h5 onClick={onButtonSignup}>회원가입</h5>
      </div>
    </div>
  )
}

export default LoginPage