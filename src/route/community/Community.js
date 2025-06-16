import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../../components/nav";
import styles from "./Community.module.css";

import profile from "./iconpng/profile.png";
import redHeart from "./iconpng/red-heart.png";
import goodTwo from "./iconpng/good-two.png";
import smilingFace from "./iconpng/smiling-face.png";
import relievedFace from "./iconpng/relieved-face.png";
import vectorIcon from "./iconpng/Vector.png";
import shareIcon from "./iconpng/outline_share.png";
import smilePlus from "./iconpng/smile-plus.png";

const reactionIcons = [redHeart, goodTwo, smilingFace, relievedFace];

export default function Community() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [diaries, setDiaries] = useState([]);
  const [reactions, setReactions] = useState({});
  const [showReactionsFor, setShowReactionsFor] = useState(null);

  // 공개된 일기만 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:5000/write-diary", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const publicDiaries = res.data.filter(
          // open === 1 인것만
          (d) => d.open === 1 || d.open === true
        );
        setDiaries(publicDiaries);
      })
      .catch(console.error);
  }, [token]);

  // 일기 쓰기 페이지로 이동
  const handleAddClick = () => navigate("/write");

  // 메일로 공유
  const handleShareClick = (text) => {
    const subject = encodeURIComponent("내가 쓴 일기 공유");
    const body = encodeURIComponent(text);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // 리액션 클릭
  const handleReactionClick = (diaryId, idx) => {
    setReactions((prev) => {
      const prevCounts = prev[diaryId] || [0, 0, 0, 0];
      const next = [...prevCounts];
      next[idx]++;
      return { ...prev, [diaryId]: next };
    });
  };

  return (
    <>
      <div className={styles.container}>
        {/* 프로필 & 추가 버튼 */}
        <div className={styles.profileSection}>
          <img src={profile} alt="프로필" className={styles.profileImage} />
          <div>
            <div className={styles.nickname}>NickName</div>
            <div className={styles.userid}>#user ID</div>
          </div>
          <button className={styles.addButton} onClick={handleAddClick}>
            <img
              src={vectorIcon}
              alt="추가"
              className={styles.vectorIconSmall}
            />
          </button>
        </div>

        <div className={styles.postTitle}>커뮤니티</div>

        {/* 공개 일기 리스트 */}
        {diaries.map((d) => {
          const counts = reactions[d.id] || [0, 0, 0, 0];
          const isBoxOpen = showReactionsFor === d.id;

          // 날짜 색깔 구분
          const dateClass =
            d.diary_type === "thanks"
              ? styles.dateGratitude
              : styles.dateRegret;

          return (
            <div key={d.id} className={styles.postSection}>
              <div className={styles.postHeader}>
                <img
                  src={profile}
                  alt="프로필"
                  className={styles.postProfileImage}
                />
                <div>
                  {/* 임시 NickName */}
                  <div className={styles.nicknameOther}>NickName</div>
                  <div className={`${styles.date} ${dateClass}`}>
                    {new Date(d.date).toLocaleDateString()}
                  </div>
                </div>
                <div
                  className={styles.expandIcon}
                  onClick={() => handleShareClick(d.diary)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={shareIcon}
                    alt="공유"
                    className={styles.shareIconSmall}
                  />
                </div>
              </div>

              <div className={styles.postBody}>{d.diary}</div>

              <div className={styles.reactionArea}>
                <button
                  className={styles.plusButton}
                  onClick={() => setShowReactionsFor(isBoxOpen ? null : d.id)}
                >
                  <img
                    src={smilePlus}
                    alt="반응 추가"
                    className={styles.smilePlusIconSmall}
                  />
                </button>
                {isBoxOpen && (
                  <div className={styles.reactionBox}>
                    {reactionIcons.map((icon, i) => (
                      <div
                        key={i}
                        className={styles.reactionItem}
                        onClick={() => handleReactionClick(d.id, i)}
                      >
                        <img
                          src={icon}
                          alt={`reaction-${i}`}
                          className={styles.emoji}
                        />
                        <span>{counts[i]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Nav />
    </>
  );
}
