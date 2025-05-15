import React, { useState } from "react";
import dayjs from "dayjs";
import styles from "./calendar.module.css"; 

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

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
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={goToPrevMonth} className={styles.button}>←</button>
        <h2 className={styles.title}>{currentDate.format("YYYY년 MM월")}</h2>
        <button onClick={goToNextMonth} className={styles.button}>→</button>
      </div>

      <div className={styles.weekdays}>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className={styles.days}>
        {weeks.map((week, wi) =>
          week.map((day, di) => (
            <div
              key={`${wi}-${di}`}
              className={`${styles.day}`}>
              {day.date()}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;