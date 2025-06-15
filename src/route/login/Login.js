import { useState } from "react";
import "../../reset.css";
import Input from "../../components/input/Input";
import style from "./Login.module.css"
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // 토큰 받아서 로컬스토리지 등에 저장 (필요시)
      const { token } = response.data;
      console.log("로그인 성공, 토큰:", token);
      alert("로그인 성공!");

      // 예: 로컬스토리지 저장
      localStorage.setItem("token", token);

      // 로그인 성공 후 페이지 이동 등 원하는 작업
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <main className={style.main}>
      <h2 className={style.title}>로그인</h2>

      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="이메일"
          id="email"
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
        <Link to="/signup" style={{ textDecoration: "none"}}>
          <div className={style.color}>가입하기</div>
        </Link>
      </section>
    </main>
  );
}

export default Login;
