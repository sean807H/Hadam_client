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

        const deleted = (
          JSON.parse(localStorage.getItem("deletedDiaries")) || []
        ).map(String);
        const filtered = mappedData.filter(
          (entry) => !deleted.includes(String(entry.id))
        );

        // localStorage.removeItem("deletedDiaries");

        setDiaries(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const deletedList =
      JSON.parse(localStorage.getItem("deletedDiaries")) || [];
    const updatedList = [...deletedList, id];
    localStorage.setItem("deletedDiaries", JSON.stringify(updatedList));
    setDiaries((prev) => prev.filter((d) => d.id !== id));
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