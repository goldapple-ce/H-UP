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

  const onButtonClick = async () => {
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
      setUserIdError('아이디를 입력해주세요.')
      return
    }

    if ('' === password) {
      setPasswordError('비밀번호를 입력해주세요.')
      return
    }
    const response = await login(userId, password);
    console.log(response.data);
    if (response === 'success') {
      navigate('/');
    }
  }

  const onButtonSignup = () => {
    navigate('/SignupPage')
  }

  return (
    <div className={styles.whole_container}>
      <div className={styles.login_container}>
        <form>
            <input
              type="userId"
              value={userId}
              placeholder="ID를 입력하세요."
              onChange={(ev) => setUserId(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{userIdError}</label>
            <input
              type="password"
              value={password}
              placeholder="비밀번호를 입력하세요."
              onChange={(ev) => setPassword(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{passwordError}</label>
            <input className={'inputButton'} type="button" onClick={onButtonClick} value={'로그인'} />
            <div className={styles.search_info}>
              <p id='search'>아이디 찾기</p>
              <p>&frasl;</p>
              <p>비밀번호 재설정</p>
            {/* {auth.error && <p>{auth.error}</p>} */}
        </div>
        </form>
      </div>
      <div className={styles.notMember_container}>
        <p>아직 회원이 아니신가요?</p>
        <h5 onClick={onButtonSignup}><strong>회원가입하러 가기</strong></h5>
      </div>
    </div>
  )
}

export default LoginPage