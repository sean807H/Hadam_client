import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Write.module.css';

function Write() {
  const [diaryType, setDiaryType] = useState("감사일기");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isPublic, setIsPublic] = useState(null);



  const navigate = useNavigate();

  const handleSave = () => {
    setShowPopup(true);
  };

  const handleConfirm = async() => {
    //팝업 제출 시 POST 요청 보내기 위해 NUll 인지 확인
    if (isPublic !== null) {
      //DB DATE 날짜가 2025-05-26T15:00:00.000Z 이런 식으로 나오기 때문에 YYYY-MM-DD 형식으로 나오게 자름
      const dateStr = new Date().toISOString().split('T')[0];

      //이런 형태의 JSON 데이터로 넘겨줘야 하기 때문에 정의해줌
      const payload = {
        title_t: diaryType,
        diary_t: content,
        open_t: isPublic,
        date_t: dateStr,
      };

      //본격적인 API 연결
      try {
        //response(응답)을 fetch 로 API 라우터를 받음
        const response = await fetch("http://localhost:5000/write-thanks", {
          //POST 형식으로 보내겠다를 정의
          method: "POST",
          //JSON 형태로 값을 보내겠다 headers에 명시해줌
          headers: {
            "Content-Type": "application/json"
          },
          //stringigy 로 객체를 문자열로 다시 바꿈 
          body: JSON.stringify(payload)
        });
  
        //상태 코드가 OK라면
        if (response.ok) {
          //clg 로 전송 성공으로 띄우고 난 후
          console.log("데이터 전송 성공");
          //성공 후 /post 라우터로 넘김
          navigate('/post');
        } else {
          //이 외에 상태코드 일 시 서버 오류 발생하고 status (그 전 log 같은거(?)) 받아와서 뭐가 문제인지 확인할 수 있게 함
          console.error("서버 오류:", response.status);
        }
        //catch 로 에러가 나면 에러 잡음
      } catch (error) {
        console.error("네트워크 오류:", error);
      }
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