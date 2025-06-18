import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Post.module.css";
import Nav from "../../components/nav";

function Post() {
  const [diaries, setDiaries] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/write-diary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const jsonData = response.data;
        console.log("받은 데이터:", jsonData);

        const mappedData = jsonData.map((entry) => ({
          id: entry.id,
          title: entry.title,
          content: entry.diary,
          isPublic: entry.open === 1 || entry.open === true,
          date: new Date(entry.diary_date).toLocaleDateString(),
          diaryType: entry.diary_type,
        }));

        // 삭제 로직 제거: 서버에서 받은 데이터 그대로 사용
        setDiaries(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      // 서버에 삭제 요청
      await axios.delete(`http://localhost:5000/write-diary/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // state에서도 제거
      setDiaries((prev) => prev.filter((d) => d.id !== id));
      console.log(`삭제 성공: 일기 ID ${id}`);
    } catch (err) {
      console.error("삭제 오류:", err.response?.data || err.message);
      alert(
        "삭제 중 오류가 발생했습니다:\n" +
          (err.response?.data?.error || err.message)
      );
    }
  };

  if (diaries.length === 0) {
    return (
      <>
        <p className={styles.anymore}>일기 데이터가 없습니다.</p>
        <Nav />
      </>
    );
  }

  return (
    <>
      <div className={styles.scrollContainer}>
        {diaries.map((diary) => {
          const isGratitude = diary.diaryType === "thanks";
          const isVisible = diary.isPublic === true;
          const isExpanded = expandedId === diary.id;

          const containerClass = `${styles.postContainer} ${
            isExpanded ? styles.expanded : ""
          }`;
          const badgeClass = `${styles.badge} ${
            isVisible ? styles.public : styles.private
          }`;
          const dateClass = `${
            isGratitude ? styles.dateGratitude : styles.dateRegret
          }`;

          return (
            <div
              key={diary.id}
              className={containerClass}
              onClick={() => setExpandedId(isExpanded ? null : diary.id)}
            >
              <div className={styles.header}>
                <span className={dateClass}>{diary.date}</span>
                <span className={badgeClass}>
                  {isVisible ? "공개" : "비공개"}
                </span>
              </div>
              <p className={styles.content}>{diary.content}</p>
              {isExpanded && (
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => handleDelete(e, diary.id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Nav />
    </>
  );
}

export default Post;
