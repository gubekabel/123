import styles from "../../styles/profileintro/style.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoaderPage from "./../../ui/LoadingPage";
import { getSubLines } from "./../../lib/subs/GetSubLines";
import { getUserData } from "../../lib/userData/firebase";

export default function IntroPage(props) {
  let router = useRouter();
  let [todaySubjects, setTodaySubjects] = useState();
  let todayPageData = getSubLines(props.todayPageData);
  let [userClass, setUserClass] = useState();
  let [isLoading, setIsLoading] = useState(true);
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
    fetchTodaySubjects(daysForFetching[day])
      .then((data) => {
        setTodaySubjects(data);
      })
      .then(() => {
        getUserData(router.query.userId).then((data) => {
          setUserClass(data.userClass);
          setIsLoading(false);
        });
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

  if (todaySubjects === undefined || isLoading) {
    return <LoaderPage></LoaderPage>;
  }

  if (todaySubjects.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.intro}>
          <h1>{`${days[day]}i órák:`}</h1>
          <div className={styles.classesContainer}>
            <h3>Ma nincsenek óráid</h3>
          </div>
        </div>
      </div>
    );
  }

  let userClassNumber = userClass.split(".")[0];
  let userClassLetter = userClass.split(".")[1];
  todayPageData.map((line, i) => {
    if (
      line.class.split(".")[0] != userClassNumber ||
      !line.class
        .trim()
        .toLowerCase()
        .split(".")[1]
        .includes(userClassLetter.trim().toLowerCase()) ||
      (userClassLetter === "B" &&
        line.class.trim().toUpperCase().split(".")[1] === "IB")
    ) {
      delete todayPageData[i];
    }
  });

  console.log(todayPageData);

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1>{`${days[day]}i órák:`}</h1>
        <div className={styles.classesContainer}>
          {todaySubjects.map((subject, i) => {
            let isSubjectSubbed = false;
            todayPageData.map((sub) => {
              if (
                sub.classNumber === subject.id.split("_")[0] &&
                subject.name.toLowerCase() === sub.subject.toLowerCase()
              ) {
                isSubjectSubbed = true;
                subject.name = sub.subject;
                subject.room = sub.roomNumber;
                subject.teacher = sub.substituteTeacher;
                subject.note = sub.note;
              }
            });

            return (
              <>
                {isSubjectSubbed ? (
                  <>
                    <div className={`${styles.class} ${styles.sub}`} key={i}>
                      <h5>{subject.name}</h5>
                      <p>{subject.room}</p>
                      <p>{subject.teacher}</p>
                      <p>{`${subject.timeStart} - ${subject.timeEnd}`}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.class} key={i}>
                      <h5>{subject.name}</h5>
                      <p>{subject.room}</p>
                      <p>{subject.teacher}</p>
                      <p>{`${subject.timeStart} - ${subject.timeEnd}`}</p>
                    </div>
                  </>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
