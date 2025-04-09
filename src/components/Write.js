import React, { useState } from 'react';
import './Write.css';

function Write() {
  const [diaryType, setDiaryType] = useState("감사일기");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isPublic, setIsPublic] = useState(null);

  const handleSave = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    if (isPublic !== null) {
      console.log({
        diaryType,
        title,
        content,
        공개여부: isPublic ? "공개" : "비공개"
      });
      setShowPopup(false);
      setTitle("");
      setContent("");
      setIsPublic(null);
    }
  };

  return (
    <div className="container">
      <div className="button-group">
        <button
          className={diaryType === "감사일기" ? "active" : "inactive"}
          onClick={() => setDiaryType("감사일기")}
        >
          감사일기
        </button>
        <button
          className={diaryType === "후회일기" ? "active" : "inactive"}
          onClick={() => setDiaryType("후회일기")}
        >
          후회일기
        </button>
      </div>

      <input
        type="text"
        className="title-input"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="content-input"
        placeholder={`${diaryType}를 작성해주세요`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="save-button" onClick={handleSave}>
        저장하기
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <span className="close-button" onClick={() => setShowPopup(false)}>×</span>
            <p className="popup-title">게시판의 공개여부</p>
            <div className="popup-buttons">
              <button
                className={isPublic === false ? "popup-selected" : "popup-unselected"}
                onClick={() => setIsPublic(false)}
              >
                비공개
              </button>
              <button
                className={isPublic === true ? "popup-selected" : "popup-unselected"}
                onClick={() => setIsPublic(true)}
              >
                공개
              </button>
            </div>
            <button className="popup-confirm" onClick={handleConfirm}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Write;