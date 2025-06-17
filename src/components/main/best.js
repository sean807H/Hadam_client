import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import style from "./best.module.css"
import { Link } from "react-router-dom";


export default function Best() {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id")
    const[write, setWrite] = useState([]);
      const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                    const response = await axios.get("http://localhost:5000/write-diary", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }) 
                    setWrite(response.data.slice(0,3));
                
            } catch(err){
                console.error("API 응답 오류 : ", err);
            }
        }
        fetchData()
    }, [token])

    if(write.length === 0) {
        return (
            <div>
                <div style={{marginTop: "30%", display: "flex", justifyContent: "center", alignItems : "center"}}>아직 적은 일기 데이터가 없습니다</div>
                <Link to="/write" style={{ textDecoration: "none"}}>
                    <button className={style.button}>일기작성하러가기</button>
                </Link>
            </div>
        )
    }

    return(
        <div>
            <div className={style.slide_section}>
            <div className={style.slide}>
                <div className={style.header}>
                    <div 
                    className={style.tag}
                    style={write[currentIndex].diary_type === "thanks" ? {backgroundColor: "#FF6B5B", color: "white"} : {backgroundColor: "#D9D9D9", color: "black"}}>{write[currentIndex].diary_type === "thanks" ? "감사일기" : "후회일기"}</div>
                    <h3>{write[currentIndex].title}</h3>
                </div>
                <div className={style.content}>
                    <p>{write[currentIndex].diary}</p>
                </div>
            </div>

            {/* 아래 점 3개 */}
            <div className={style.dots}>
                {write.map((_, index) => (
                <span
                    key={index}
                    className={currentIndex === index ? style.activeDot : style.dot}
                    onClick={() => setCurrentIndex(index)}
                ></span>
                ))}
            </div>
            </div>
            <Link to="/write" style={{ textDecoration: "none"}}>
                <button className={style.button}>일기작성하러가기</button>
            </Link>
        </div>
    )
}