import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Write.module.css';

function Write() {
  const [diaryType, setDiaryType] = useState("감사일기");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isPublic, setIsPublic] = useState(null);

  const api = useEffect(() => {
    const fetchData = async() => {
      try {
          const response = await fetch("http://localhost:5000");
          const jsonData = await response.json();
      } catch(error) {
        console.error("Error fetching data : " + error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleSave = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    if (isPublic !== null) {
      const newPost = {
        id: Date.now(),
        diaryType,
        title,
        content,
        isPublic,
        date: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      };

      const existing = JSON.parse(localStorage.getItem("diaryList")) || [];
      const updated = [...existing, newPost];
      localStorage.setItem("diaryList", JSON.stringify(updated));

      navigate('/post');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${diaryType === "감사일기" ? styles.active : styles.inactive}`}
          onClick={() => setDiaryType("감사일기")}
        >
          감사일기
        </button>
        <button
          className={`${styles.button} ${diaryType === "후회일기" ? styles.active : styles.inactive}`}
          onClick={() => setDiaryType("후회일기")}
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
        placeholder={`${diaryType}를 작성해주세요`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className={styles.saveButton} onClick={handleSave}>
        저장하기
      </button>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <span className={styles.closeButton} onClick={() => setShowPopup(false)}>×</span>
            <p className={styles.popupTitle}>게시판의 공개여부</p>
            <div className={styles.popupButtons}>
              <button
                className={isPublic === false ? styles.popupSelected : styles.popupUnselected}
                onClick={() => setIsPublic(false)}
              >
                비공개
              </button>
              <button
                className={isPublic === true ? styles.popupSelected : styles.popupUnselected}
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
  );
}

export default Write;