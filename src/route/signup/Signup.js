import React, { useState } from "react";
import Input from "../../components/input/Input";
import "../../reset.css";
import Button from "../../components/button/button";
import style from "./Signup.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user_id: "",
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 체크
    if (form.password !== form.confirmpassword)  {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("http://172.30.3.171:5000/users", {
        user_id: form.user_id,
        email: form.email,
        password: form.password,
        name: form.name,
      });
      alert("회원가입 성공!");
      localStorage.setItem("user_id", form.user_id);
      localStorage.setItem("email", form.email);
      localStorage.setItem("name", form.name);
      
      const res = await axios.get(`http://172.30.3.171:5000/users/${form.user_id}`);
      const { profile } = res.data;
      localStorage.setItem("profile", profile)
      navigate('/login');
      
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 실패");
    }
  };

  return (
    <div className={style.main}>
      <h2 className={style.title}>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={form.user_id}
          onChange={handleChange}
          label="아이디"
          id="user_id"
        />
        <Input
          type="email"
          value={form.email}
          onChange={handleChange}
          label="이메일"
          id="email"
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
          value={form.name}
          onChange={handleChange}
          label="이름"
          id="name"
        />
        <Button text="회원가입" type="submit" />
      </form>
    </div>
  );
}

export default Signup;
