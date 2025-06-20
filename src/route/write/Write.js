import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Write.module.css";
import Nav from "../../components/nav";

function Write({ onDiarySaved }) {
  const [diaryType, setDiaryType] = useState("thanks");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleSave = () => {
    setShowPopup(true);
  };

  const handleConfirm = async () => {
    if (isPublic !== null) {
      const dateStr = new Date().toISOString().split("T")[0];

      const payload = {
        title: title,
        diary: content,
        open: isPublic,
        diary_date: dateStr,
        diary_type: diaryType,
        user_id: user_id,
        date: dateStr,
      };

      try {
        const response = await axios.post(
          "http://172.30.3.171:5000/write-diary",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          console.log("데이터 전송 성공");
          
          // 저장 성공 시 콜백 호출 (부모 컴포넌트에 알림)
          if (onDiarySaved) {
            onDiarySaved();
          }

          navigate("/post");
        } else {
          console.error("서버 오류:", response.status);
        }
      } catch (error) {
        console.error("네트워크 오류:", error);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${
              diaryType === "thanks" ? styles.active : styles.inactive
            }`}
            onClick={() => setDiaryType("thanks")}
          >
            감사일기
          </button>
          <button
            className={`${styles.button} ${
              diaryType === "regret" ? styles.active : styles.inactive
            }`}
            onClick={() => setDiaryType("regret")}
          >
            후회일기
          </button>
        </div>

        <input
          type="text"
          className={styles.titleInput}
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className={styles.contentInput}
          placeholder={`${
            diaryType === "thanks" ? "감사일기를" : "후회일기를"
          } 작성해주세요`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className={styles.saveButton} onClick={handleSave}>
          저장하기
        </button>

        {showPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <span
                className={styles.closeButton}
                onClick={() => setShowPopup(false)}
              >
                ×
              </span>
              <p className={styles.popupTitle}>게시판의 공개여부</p>
              <div className={styles.popupButtons}>
                <button
                  className={
                    isPublic === false
                      ? styles.popupSelected
                      : styles.popupUnselected
                  }
                  onClick={() => setIsPublic(false)}
                >
                  비공개
                </button>
                <button
                  className={
                    isPublic === true
                      ? styles.popupSelected
                      : styles.popupUnselected
                  }
                  onClick={() => setIsPublic(true)}
                >
                  공개
                </button>
              </div>
              <button className={styles.popupConfirm} onClick={handleConfirm}>
                확인
              </button>
            </div>
          </div>
        )}
      </div>
      <Nav />
    </>
  );
}

export default Write;
