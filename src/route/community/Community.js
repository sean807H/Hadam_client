import React, { useState, useRef } from 'react';
import styles from './Community.module.css';
import redHeart from './iconpng/red-heart.png';
import goodTwo from './iconpng/good-two.png';
import smilingFace from './iconpng/smiling-face.png';
import relievedFace from './iconpng/relieved-face.png';
import vectorIcon from './iconpng/Vector.png';
import shareIcon from './iconpng/outline_share.png';
import smilePlus from './iconpng/smile-plus.png';

const initialReactions = [  
  { src: redHeart, count: 0 },
  { src: goodTwo, count: 0 },
  { src: smilingFace, count: 0 },
  { src: relievedFace, count: 0 },
];

export default function Community() {
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState(initialReactions);

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleReactionClick = (index) => {
    const newReactions = reactions.map((reaction, i) => {
      if (i === index) {
        return { ...reaction, count: reaction.count + 1 };
      }
      return reaction;
    });
    setReactions(newReactions);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profileImageWrapper} onClick={handleProfileClick}>
          {profileImage ? (
            <img src={profileImage} alt="프로필" className={styles.profileImage} />
          ) : (
            <div className={styles.profileImage} />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <div>
          <div className={styles.nickname}>NickName</div>
          <div className={styles.userid}>#user ID</div>
        </div>
        <button className={styles.addButton}>
          <img src={vectorIcon} alt="추가 버튼" className={styles.vectorIconSmall} />
        </button>
      </div>

      <div className={styles.postTitle}>게시글</div>
      <div className={styles.postSection}>
        <div className={styles.postHeader}>
          <div className={styles.postProfile}></div>
          <div>
            <div className={styles.nicknameOther}>NickName</div>
            <div className={styles.date}>2025.06.11</div>
          </div>
          <div className={styles.expandIcon}>
            <img src={shareIcon} alt="공유" className={styles.shareIconSmall} />
          </div>
        </div>

        <div className={styles.postBody}>
          dhsmfdms skfdjasdjfienlakdjfjskdlnxzklfj<br />
          dhsmfdms skfdjasdjfienlakdjfjskdlnxzklfj<br />
          dhsmfdms skfdjasdjfienlakdjfjskdlnxzklfj<br />
          dhsmfdms skfdjasdjfienlakdjfjskdlnxzklfj
        </div>

        <div className={styles.reactionArea}>
          <button
            className={styles.plusButton}
            onClick={() => setShowReactions(!showReactions)}
          >
            <img src={smilePlus} alt="반응 추가" className={styles.smilePlusIconSmall}/>
          </button>
          {showReactions && (
            <div className={styles.reactionBox}>
              {reactions.map((reaction, index) => (
                <div
                  key={index}
                  className={styles.reactionItem}
                  onClick={() => handleReactionClick(index)}
                >
                  <img src={reaction.src} alt={`이모지-${index}`} className={styles.emoji} />
                  <span>{reaction.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.postSection}>
        <div className={styles.postHeader}>
          <div className={styles.postProfile}></div>
          <div>
            <div className={styles.nicknameOther}>NickName</div>
            <div className={styles.date}>2025.06.11</div>
          </div>
          <div className={styles.expandIcon}>
            <img src={shareIcon} alt="공유" className={styles.shareIconSmall} />
          </div>
        </div>

        <div className={styles.postBody}>
          dhsmfdms skfdjasdjfienlakdjfjskdlnxzklfj
        </div>
      </div>
    </div>
  );
}
