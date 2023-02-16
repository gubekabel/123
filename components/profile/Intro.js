import styles from "../../styles/profileintro/style.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoaderPage from "./../../ui/Loader";

export default function IntroPage() {
  let router = useRouter();
  let [todaySubjects, setTodaySubjects] = useState();
  let days = [
    "Vasárnap",
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat"
  ];
  let daysForFetching = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  let date = new Date();
  let day = date.getDay();

  useEffect(() => {
    fetchTodaySubjects(daysForFetching[day]).then((data) => {
      setTodaySubjects(data);
    });
  }, []);

  async function fetchTodaySubjects(day) {
    let response = await fetch("/api/subject/fetchASubject", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        day: day,
        userId: router.query.userId
      })
    });

    response = await response.json();

    return response.message;
  }

  if (todaySubjects === undefined) {
    return <LoaderPage></LoaderPage>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1>{`${days[day]}i órák:`}</h1>
        <div className={styles.classesContainer}>
          {todaySubjects.length === 0 ? (
            <>
              <h3>Ma nincsenek óráid.</h3>
            </>
          ) : (
            <>
              {todaySubjects.map((subject, i) => {
                return (
                  <div className={styles.class} key={i}>
                    <h5>{subject.name}</h5>
                    <p>{subject.room}</p>
                    <p>{subject.teacher}</p>
                    <p>{`${subject.timeStart} - ${subject.timeEnd}`}</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
