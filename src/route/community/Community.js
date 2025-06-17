import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../../components/nav";
import styles from "./Community.module.css";

import profile from "./iconpng/profile.png";
import vectorIcon from "./iconpng/Vector.png";
import shareIcon from "./iconpng/outline_share.png";
import smilePlus from "./iconpng/smile-plus.png";
import redHeart from "./iconpng/red-heart.png";
import goodTwo from "./iconpng/good-two.png";
import smilingFace from "./iconpng/smiling-face.png";
import relievedFace from "./iconpng/relieved-face.png";

const reactionIcons = [redHeart, goodTwo, smilingFace, relievedFace];

export default function Community() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const [nickname, setNickname] = useState(localStorage.getItem("name") || "");
  const [diaries, setDiaries] = useState([]);
  const [reactions, setReactions] = useState({});
  const [showReactionsFor, setShowReactionsFor] = useState(null);

  // 게시글 목록 및 반응 초기 로드 (deletedDiaries 필터 적용)
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/write-diary", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // 공개된 일기 필터
        let publicDiaries = res.data
          .filter((d) => d.open === 1 || d.open === true)
          .map((d) => ({
            ...d,
            formattedDate: new Date(d.diary_date).toLocaleDateString(),
          }));
        // 삭제된 일기 아이디 가져오기
        const deleted = JSON.parse(
          localStorage.getItem("deletedDiaries") || "[]"
        ).map(String);
        publicDiaries = publicDiaries.filter(
          (d) => !deleted.includes(String(d.id))
        );
        setDiaries(publicDiaries);

        // 각 일기별 반응 개수 불러오기
        publicDiaries.forEach((d) => {
          axios
            .get(`http://localhost:5000/reactions/${d.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((r) => {
              const counts = [0, 0, 0, 0];
              r.data.reactions.forEach((item) => counts[item.reaction_type]++);
              setReactions((prev) => ({ ...prev, [d.id]: counts }));
            })
            .catch(console.error);
        });
      })
      .catch(console.error);
  }, [token]);

  // 유저 프로필(name) 로드
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const me = res.data.find((u) => u.user_id === user_id);
        if (me) {
          setNickname(me.name);
          localStorage.setItem("name", me.name);
        }
      })
      .catch((err) => console.error("프로필 fetch 실패:", err));
  }, [token, user_id]);

  // + 버튼 클릭시 post 로 이동
  const handleGoToPost = () => navigate("/post");

  const handleShareClick = (text) => {
    const subject = encodeURIComponent("내가 쓴 일기 공유");
    const body = encodeURIComponent(text);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // 이모티콘 클릭: 서버 저장
  const handleReactionClick = async (diaryId, idx) => {
    if (diaryId == null || idx == null || user_id == null) return;
    try {
      await axios.post(
        "http://localhost:5000/reactions",
        { diary_id: diaryId, reaction_type: idx.toString(), user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const refresh = await axios.get(
        `http://localhost:5000/reactions/${diaryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const counts = [0, 0, 0, 0];
      refresh.data.reactions.forEach((item) => counts[item.reaction_type]++);
      setReactions((prev) => ({ ...prev, [diaryId]: counts }));
    } catch (err) {
      console.error("반응 등록 실패:", err.response?.data || err.message);
      alert("반응 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profileSection}>
          <img src={profile} alt="프로필" className={styles.profileImage} />
          <div>
            <div className={styles.nickname}>{nickname || "NickName"}</div>
            <div className={styles.userid}>#{user_id || "userID"}</div>
          </div>
          <button className={styles.addButton} onClick={handleGoToPost}>
            <img
              src={vectorIcon}
              alt="내 일기 보기"
              className={styles.vectorIconSmall}
            />
          </button>
        </div>

        <div className={styles.postTitle}>커뮤니티</div>

        {diaries.map((d) => {
          const counts = reactions[d.id] || [0, 0, 0, 0];
          const isBoxOpen = showReactionsFor === d.id;
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
                  <div className={styles.nicknameOther}>
                    {d.user_name || nickname || "NickName"}
                  </div>
                  <div className={`${styles.date} ${dateClass}`}>
                    {d.formattedDate}
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