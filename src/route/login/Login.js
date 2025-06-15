import { useState } from "react";
import "../../reset.css";
import Input from "../../components/input/Input";
import style from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import axios from "axios";


function Login() {
  const navigate = useNavigate();
  const [userId, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        user_id : userId,
        password
      });

      
      const { token, email, user_id } = response.data;
      alert("로그인 성공!");
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("user_id", user_id);
       navigate('/');
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <main className={style.main}>
      <h2 className={style.title}>로그인</h2>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter userId"
          value={userId}
          onChange={(e) => setUserID(e.target.value)}
          label="아이디"
          id="user_id"
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
