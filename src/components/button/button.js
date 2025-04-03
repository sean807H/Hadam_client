import React from 'react'
import style from "./button.module.css";

function Button({ type, text }) {
    return (
        <button type={type} className={style.button}>
          {text}
        </button>
    )
    
}

export default Button;