import React, { useEffect, useState } from 'react';
import styles from './Post.module.css';

function Post() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("diaryList")) || [];
    const deleted = JSON.parse(localStorage.getItem("deletedDiaries")) || [];
    const filtered = stored.filter((entry) => !deleted.includes(entry.id));
    setDiaries(filtered);
  }, []);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const deletedList = JSON.parse(localStorage.getItem("deletedDiaries")) || [];
    const updatedList = [...deletedList, id];
    localStorage.setItem("deletedDiaries", JSON.stringify(updatedList));
    setDiaries((prev) => prev.filter((d) => d.id !== id));
  };

  const [expandedId, setExpandedId] = useState(null);

  if (diaries.length === 0) {
    return <p className={styles.anymore}>일기 데이터가 없습니다.</p>;
  }

  return (
    <div>
      {diaries.map((diary) => {
        const isGratitude = diary.diaryType === "감사일기";
        const isVisible = diary.isPublic === true;
        const isExpanded = expandedId === diary.id;

        const containerClass = `${styles.postContainer} ${isExpanded ? styles.expanded : ''}`;
        const badgeClass = `${styles.badge} ${isVisible ? styles.public : styles.private}`;
        const dateClass = `${isGratitude ? styles.dateGratitude : styles.dateRegret}`;

        return (
          <div
            key={diary.id}
            className={containerClass}
            onClick={() => setExpandedId(isExpanded ? null : diary.id)}
          >
            <div className={styles.header}>
              <span className={dateClass}>{diary.date}</span>
              <span className={badgeClass}>{isVisible ? "공개" : "비공개"}</span>
            </div>
            <p className={styles.content}>{diary.content}</p>
            {isExpanded && (
              <div className={styles.buttonGroup}>
                <button className={styles.deleteButton} onClick={(e) => handleDelete(e, diary.id)}>삭제</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Post;