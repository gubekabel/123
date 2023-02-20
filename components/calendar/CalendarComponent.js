import { useRouter } from "next/router";
import CalendarPage from "./Calendar";
import styles from "../../styles/style.module.css";
import { getSubs } from "../../lib/calendar/firebase";
import { useEffect, useState } from "react";

export default function CalendarComponent(props) {
  let router = useRouter();

  let { todayPageData, tomorrowPageData } = props;

  return (
    <div className={styles.container}>
      <CalendarPage
        todayPageData={todayPageData}
        tomorrowPageData={tomorrowPageData}
      ></CalendarPage>
    </div>
  );
}
