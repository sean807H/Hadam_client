import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./my.module.css";
import { Link } from "react-router-dom";
import Nav from "../../components/nav"
import dprofile from "./profile.png";

function My() {
  const [events, setEvents] = useState(new Map());
  const [today, setToday] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
    const name = localStorage.getItem("name");
  const user_id = localStorage.getItem("user_id");
  const profile = localStorage.getItem("profile");

  // 기본 3개월 전 날짜
  const threeMonthsAgo = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 3);
    d.setHours(0, 0, 0, 0);
    return d;
  })();

  // 가장 가까운 이후 일요일 반환
  function getNextSunday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (7 - day) % 7;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  // 날짜를 YYYY-MM-DD 형식으로 포맷
  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  // 날짜 배열 생성
  function generateDateArray(start, end) {
    const arr = [];
    let current = new Date(start);
    while (current <= end) {
      arr.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return arr;
  }

  // 가장 빠른 이벤트 날짜와 3개월 전 비교해서 시작일 결정
  function getStartDate(eventsMap) {
    if (eventsMap.size === 0) return getNextSunday(threeMonthsAgo);
    const dates = Array.from(eventsMap.keys()).map((d) => new Date(d));
    const earliestEvent = new Date(Math.min(...dates));
    const base = earliestEvent < threeMonthsAgo ? earliestEvent : threeMonthsAgo;
    return getNextSunday(base);
  }

  // 정사각형 스타일
  function squareStyle(count) {
  let backgroundColor = "#E0E0E0"; // 기본 색
  if (count === 1) {
    backgroundColor = "#FFD8D4";
  } else if (count === 2) {
    backgroundColor = "#FFB2A9";
  } else if (count >= 3) {
    backgroundColor = "#FF6B5B";
  }

  return {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor,
  };}

  // 데이터 fetch
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axios.post("http:// 172.30.3.171:5000/event");
        const map = new Map();
        res.data.events.forEach((ev) => {
          const key = formatDate(new Date(ev.date));
          map.set(key, ev.count);
        });
        setEvents(map);
      } catch (e) {
        console.error(e);
      }
    }

    fetchEvents();

    const fetchInterval = setInterval(fetchEvents, 5 * 60 * 1000);
    const dateInterval = setInterval(() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      setToday(d);
    }, 60 * 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(dateInterval);
    };
  }, []);

  // 렌더링에 필요한 날짜 배열 계산
  const startDate = getStartDate(events);
  const todayDate = new Date(today);
  todayDate.setHours(0, 0, 0, 0);

  const fullDates = generateDateArray(startDate, todayDate);

  // 요일 기준 세로 7칸 (일~토)
  const paddedDateArray = [...fullDates];

  // 미래 날짜 처리 (오늘 이후)
  const maxDateInEvents = Array.from(events.keys()).reduce((max, d) => {
    return new Date(d) > new Date(max) ? d : max;
  }, formatDate(today));

  const maxDateObj = new Date(maxDateInEvents);
  maxDateObj.setHours(0, 0, 0, 0);

  const futureDates =
    maxDateObj > todayDate
      ? generateDateArray(new Date(todayDate.getTime() + 86400000), maxDateObj)
      : [];

  return (
    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
      <div className={styles.header}>
        <div style={{ borderRadius: "50%", width: "80px", height: "80px", marginLeft: "30px" }}>
          <img
            style={{ width: "90%", height: "90%", objectFit: "cover" }}
            src={dprofile}
            alt="프로필 이미지"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ fontSize: "20px", color: "white" }}>{name}</span>
          <span style={{ fontSize: "14px", color: "black" }}>#{user_id}</span>
        </div>
      </div>

      <div>
        <div>
           
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <p style={{ marginTop: "80px", marginLeft: "12px", fontSize: "20px", marginBottom: "20px" }}>일기 작성 커밋</p>
                    <div style={{ marginTop: "80px", marginRight: "0px", marginBottom: "20px" }}>
                        총 개수: {Array.from(events.values()).reduce((a, b) => a + b, 0)}
                    </div>
                </div>

             <div className={styles.thanksBox}>
            <div
                style={{
                marginTop: "12px",
                marginLeft: "10px",
                display: "grid",
                gridTemplateRows: `repeat(7, 20px)`,
                gridAutoFlow: "column",
                gap: 4,
                userSelect: "none",
                }}
            >
                {paddedDateArray.map((date, idx) => {
                const key = formatDate(date);
                const count = events.get(key) || 0;
                return (
                    <div key={key} title={`${key} - ${count}개`} style={squareStyle(count)} />
                );
                })}
            </div>

            {futureDates.length > 0 && (
                <div
                style={{
                    marginTop: 20,
                    display: "grid",
                    gridTemplateRows: `repeat(7, 20px)`,
                    gridAutoFlow: "column",
                    gap: 4,
                }}
                >
                {futureDates.map((date, idx) => {
                    const key = formatDate(date);
                    const count = events.get(key) || 0;
                    return (
                    <div key={key} title={`${key} - ${count}개`} style={squareStyle(count)} />
                    );
                })}
                </div>
            )}
            </div>
           <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "20px", marginLeft: "10px" }}>
                <span>색상강도</span>
                <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: "#E0E0E0",
                }} />

                <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: "#FFD8D4",
                }} />

                <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: "#FFB2A9",
                }} />

                <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: "#FF6B5B",
                }} />
                </div>
        </div>
      </div>

        <Link
        to="/login"
        style={{textDecoration: "none"}}
        >
            <div style={{display: "flex", gap: "10px", alignItems: "center"}} className={styles.logout}>
                <span style={{fontSize: "16px", color: "#FF6B5B", marginLeft: "20px"}}>로그아웃</span>
                <img src="/images/material-symbols-light_logout.png"style={{width: "30px", height: "30px"}} />
            </div>
      </Link>
      <Nav />
    </div>
  );
}

export default My;
