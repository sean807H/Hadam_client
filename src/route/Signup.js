import React from "react";
import { useState } from "react";
import Input from "../components/Input";
import "../reset.css";
import "../Login.css";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmpassword:"",
    nickname:""
  })

  const handleChange = (e) => {
    const {id, value} = e.target;
    setForm((item) => ({
      ...item,
      [id]: value,
    }))
  }

  return (
    <div className="main-section">
      <h2 className="title">회원가입</h2>
      <form>
        <Input
          type="text"
          value={form.username}
          onChange={handleChange}
          label="아이디"
          id="username"
        />
        <Input
          type="password"
          value={form.password}
          onChange={handleChange}
          label="비밀번호"
          id="password"
        />
        <Input
          type="password"
          value={form.confirmpassword}
          onChange={handleChange}
          label="비밀번호 확인"
          id="confirmpassword"
        />
        <Input
          type="text"
          value={form.nickname}
          onChange={handleChange}
          label="닉네임"
          id="nickname"
        />
        <button type="submit" className="login-button">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
