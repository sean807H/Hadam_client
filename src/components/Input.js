import React from "react";
import style from "./Input.module.css";

function Input({ type = "text", placeholder = "", value, onChange, label, id }) {
  return (
    <div>
      <label htmlFor={id} className={style.inputlable}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={style.inputstyle}
      />
    </div>
  );
}
export default Input;
