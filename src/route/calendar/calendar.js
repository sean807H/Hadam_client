import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import styles from "./calendar.module.css";
import axios from "axios";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Nav from "../../components/nav";

dayjs.extend(utc);
dayjs.extend(timezone);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectDate, setSelectDate] = useState(null);
  const token = localStorage.getItem("token");
  const [diaryData, setDiaryData] = useState([]);

  // 월별 일기 데이터를 미리 불러오기 (예: currentDate 기준 월)
  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const startOfMonth = currentDate.startOf("month").format("YYYY-MM-DD");
        const endOfMonth = currentDate.endOf("month").format("YYYY-MM-DD");

        const response = await axios.get(`http://172.30.3.171:5000/write-diary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            startDate: startOfMonth,
            endDate: endOfMonth,
          },
        });

        setDiaryData(response.data || []);
      } catch (err) {
        console.error("월별 일기 데이터 로드 오류:", err);
        setDiaryData([]);
      }
    };
    fetchDiary();
  }, [currentDate, token]);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const handleDayClick = async (day) => {
    try {
      const response = await axios.get(`http://172.30.3.171:5000/write-diary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date: day.format("YYYY-MM-DD"),
        },
      });

      setSelectDate(day);
      // 선택 날짜 일기 데이터만 따로 관리하거나 팝업에서 필터링 가능
      setDiaryData(response.data || []);
    } catch (err) {
      console.error("API 응답 오류:", err);
      setDiaryData([]);
      setSelectDate(day);
    }
  };

  const closePopup = () => {
    setSelectDate(null);
  };

  // 특정 날짜에 해당하는 diary_type 체크해서 thanks, regret 여부 판단
  const getDiaryTypeForDate = (date) => {
    if (!Array.isArray(diaryData)) return null;

    const diaries = diaryData.filter((item) =>
      dayjs.utc(item.diary_date).tz("Asia/Seoul").isSame(date, "day")
    );

    const hasThanks = diaries.some((d) => d.diary_type === "thanks");
    const hasRegret = diaries.some((d) => d.diary_type === "regret");

    if (hasThanks && hasRegret) return "both";
    if (hasThanks) return "thanks";
    if (hasRegret) return "regret";
    return null;
  };

  // 그라데이션 배경 스타일
  const getBackgroundStyle = (diaryType) => {
    switch (diaryType) {
      case "thanks":
        return { backgroundColor: "#FF6B5B" };
      case "regret":
        return { backgroundColor: "#D9D9D9" };
      case "both":
        return {
          background:
            "linear-gradient(180deg, #FF6B5B 0%, #FC7364 10%, #FA796B 20%, #F68376 30%, #F09287 40%, #EBA198 50%,#E6ADA7 60%, #E1BAB5 70%,#DCC8C5 80%, #D8D2D1 90%, #D6D6D6 100%)",

        };
      default:
        return {};
    }
  };

  // 달력 주 단위 배열 생성
  const weeks = [];
  let date = startDate;
  while (date.isBefore(endDate, "day")) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(date);
      date = date.add(1, "day");
    }
    weeks.push(week);
  }

  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const goToNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={goToPrevMonth} className={styles.button}>
            <img
              src="/images/ChevronLeft.png"
              style={{ width: "19px", height: "24px" }}
            />
          </button>
          <p className={styles.title}>{currentDate.format("YYYY년 MM월")}</p>
          <button onClick={goToNextMonth} className={styles.button}>
            <img
              src="/images/ChevronRight.png"
              style={{ width: "19px", height: "24px" }}
            />
          </button>
        </div>

        <div className={styles.weekdays}>
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div
              key={day}
              style={{ fontSize: "18px", color: "#FF6B5B" }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className={styles.days}>
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              const diaryType = getDiaryTypeForDate(day);
              const bgStyle = getBackgroundStyle(diaryType);

              return (
                <div
                  key={`${wi}-${di}`}
                  className={`${styles.day} ${
                    day.month() !== currentDate.month() ? styles.notCurrentMonth : ""
                  }`}
                  onClick={() => handleDayClick(day)}
                  style={{
                    position: "relative",
                    color:
                      diaryType === "thanks" || diaryType === "both"
                        ? "#fff"
                        : "#000",
                    fontWeight: "normal", // 볼드 제거
                    cursor: "pointer",
                  }}
                >
                  {diaryType && (
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        zIndex: 0,
                        ...bgStyle,
                      }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {day.month() === currentDate.month() ? day.date() : ""}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 팝업 */}
     {selectDate && (
  <div className={styles.popup} style={{ display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", alignItems: "center"}}>
      <p className={styles.popup_title}>
        {selectDate.format("YYYY년 MM월 DD일")}
      </p>
      <button onClick={closePopup} className={styles.popup_button}>
        닫기
      </button>
    </div>

    {Array.isArray(diaryData) ? (() => {
      const filteredDiary = diaryData.filter((item) =>
        dayjs.utc(item.diary_date).tz("Asia/Seoul").isSame(selectDate, "day")
      );

      if (filteredDiary.length === 0) {
        return (
          <div style={{ paddingLeft: "40px", paddingTop: "10px" }}>
            일기 데이터가 존재하지 않습니다.
          </div>
        );
      }

      return (
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "16px",
            padding: "20px 40px",
          }}
        >
          {filteredDiary.map((diary, index) => (
            <div
              key={index}
              style={{
                minWidth: "250px",
                flex: "0 0 auto",
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "8px" }}>{diary.title}</p>
              <p style={{ whiteSpace: "pre-wrap" }}>{diary.diary}</p>
            </div>
          ))}
        </div>
      );
    })() : (
      <div style={{ paddingLeft: "40px", paddingTop: "20px" }}>
        일기 데이터가 존재하지 않습니다.
      </div>
    )}
  </div>
)}


      <Nav />
    </div>
  );
};

export default Calendar;
