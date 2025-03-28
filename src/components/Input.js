import React from 'react';
import style from "./Input.module.css";

function Input({ type, placeholder, value, onChange }) {
    return (
        <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={style.inputstyle}/>
    );
}
export default Input;