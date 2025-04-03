import { useState } from "react";
import "../../reset.css";
import Input from "../../components/input/Input";
import style from "./Login.module.css"
import { Link } from "react-router-dom";
import Button from "../../components/button/button";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className={style.main}>
      <h2 className={style.title}>로그인</h2>

      <form>
        <Input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="아이디"
          id="username"
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="비밀번호"
          id="password"
        />
        <Button text="로그인" type="submit"/>
        
      </form>

      <section className={style.footer}>
        <div>계정이 없으신가요?</div>
        <Link to="/signup"  style={{ textDecoration: "none"}}>
          <div className={style.color}>가입하기</div>
        </Link>
      </section>
    </main>
  );
}

export default Login;
