import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginPage.module.scss'; // SCSS 스타일 시트 임포트


const LoginPage = (props) => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [userIdError, setUserIdError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    setUserIdError('')
    setPasswordError('')

    if ('' === userId) {
      setUserIdError('Please enter your userId')
      return
    }

    // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email)) {
    //   setEmailError('Please enter a valid Email')
    //   return
    // }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    // if (password.length < 7) {
    //   setPasswordError('The password must be 8 characters or longer')
    //   return
    // }

    // if (loggedIn) {
      // localStorage.removeItem('user')
      // props.setLoggedIn(false)
    // } else {
      navigate('/IssuePage')
    // }
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