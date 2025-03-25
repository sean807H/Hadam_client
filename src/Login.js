import { useState } from 'react';
import './Login.css'
import './reset.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className='main-section'>
      <h2 className='title'>로그인 하세요</h2>
      
      <form>
        <div className='input-detail'>
          <p>아이디</p>
          <input
            type="text"
            value={username}
            placeholder="Enter username"
            className='input-style'
            onChange={(e) => setUsername(e.target.value)
            }
          />
        </div>
        <div className='input-detail'>
          <p>비밀번호</p>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            className='input-style'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
      
      <section className="login-footer">
        <div>계정이 없으신가요?</div>
        <div className="main-color">가입하기</div>
      </section>
    </main>
  );
}

export default Login;
