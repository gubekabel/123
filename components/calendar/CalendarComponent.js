import { useRouter } from "next/router";
import CalendarPage from "./Calendar";
import styles from "../../styles/style.module.css";
import { getSubs } from "../../lib/calendar/firebase";
import { useEffect, useState } from "react";

export default function CalendarComponent(props) {
  let router = useRouter();
  let [subs, setSubs] = useState([]);
  let [tomorrowSubs, setTomorrowSubs] = useState([]);

  useEffect(() => {
    getSubsForCalendar().then((data) => {
      setSubs(data);
    });
    getTomorrowSubsForCalendar().then((data) => {
      setTomorrowSubs(data);
    });
  }, []);

  async function getSubsForCalendar() {
    let response = await getSubs(true, router.query.userId);
    return response;
  }

  async function getTomorrowSubsForCalendar() {
    let response = await getSubs(false, router.query.userId);
    return response;
  }
  return (
    <div className={styles.container}>
      <CalendarPage subs={subs} tomorrowSubs={tomorrowSubs}></CalendarPage>
    </div>
  );
}
