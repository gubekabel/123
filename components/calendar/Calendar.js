import styles from "../../styles/calendarcalendar/style.module.css";
import { useEffect, useState } from "react";
import LoaderPage from "./../../ui/Loader";
import { useRouter } from "next/router";
import { getUserData } from "../../lib/userData/firebase";

export default function CalendarPage(props) {
  let router = useRouter();
  let [days, setDays] = useState([]);
  let { subs, tomorrowSubs } = props;
  let [isLoading, setIsLoading] = useState(true);
  let [idToDetermineSubject, setIdToDetermineSubject] = useState("");
  let isClassSubbed = false;
  let [monday, setMonday] = useState(false);
  let [tuesday, setTuesday] = useState(false);
  let [wednesday, setWednesday] = useState(false);
  let [thursday, setThursday] = useState(false);
  let [friday, setFriday] = useState(false);
  let [userClass, setUserClass] = useState("");
  let hours = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00"
  ];

  async function getCalendarData() {
    try {
      let response = await fetch("/api/user/handleUserSubjects", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: router.query.userId
        })
      });
      response = await response.json();
      return response.message;
    } catch (error) {
      return error.message;
    }
  }

  useEffect(() => {
    getCalendarData()
      .then((data) => {
        setDays(data);
      })
      .then(() => {
        getUserData(router.query.userId)
          .then((data) => {
            setUserClass(data.userClass);
          })
          .then(() => {
            setIsLoading(false);
          });
      });
  }, []);

  function changeOpenDay(day) {
    if (day === "monday") {
      setMonday((prev) => !prev);
    } else if (day === "tuesday") {
      setTuesday((prev) => !prev);
    } else if (day === "wednesday") {
      setWednesday((prev) => !prev);
    } else if (day === "thursday") {
      setThursday((prev) => !prev);
    } else if (day === "friday") {
      setFriday((prev) => !prev);
    }
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoaderPage></LoaderPage>
      </div>
    );
  }

  console.log(days);
  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={styles.monday}>
          <button
            onClick={() => {
              changeOpenDay("monday");
            }}
          >
            Hétfő
          </button>
          {monday ? (
            <div className={styles.days} id="0">
              {days[0].map((subject, i) => {
                return (
                  <button className={styles.day} id={`0_${i}`} key={i}>
                    {subject.name ? (
                      <>
                        <h5>{subject.name}</h5>
                      </>
                    ) : (
                      <></>
                    )}
                  </button>
                );
              })}
              <button>Új óra hozzáadása</button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.tuesday}>
          <button
            onClick={() => {
              changeOpenDay("tuesday");
            }}
          >
            Kedd
          </button>{" "}
          {tuesday ? (
            <div className={styles.days}>
              {days[1].map((subject, i) => {
                return (
                  <div className={styles.day} id={`1_${i}`} key={i}>
                    {subject.name ? (
                      <>
                        <h5>{subject.name}</h5>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
              <button>Új óra hozzáadása</button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.wednesday}>
          <button
            onClick={() => {
              changeOpenDay("wednesday");
            }}
          >
            Szerda
          </button>{" "}
          {wednesday ? (
            <div className={styles.days}>
              {days[2].map((subject, i) => {
                return (
                  <div className={styles.day} id={`2_${i}`} key={i}>
                    {subject.name ? (
                      <>
                        <h5>{subject.name}</h5>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
              <button>Új óra hozzáadása</button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.thursday}>
          <button
            onClick={() => {
              changeOpenDay("thursday");
            }}
          >
            Csütörtök
          </button>{" "}
          {thursday ? (
            <div className={styles.days}>
              {days[3].map((subject, i) => {
                return (
                  <div className={styles.day} id={`3_${i}`} key={i}>
                    {subject.name ? (
                      <>
                        <h5>{subject.name}</h5>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
              <button>Új óra hozzáadása</button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.friday}>
          <button
            onClick={() => {
              changeOpenDay("friday");
            }}
          >
            Péntek
          </button>{" "}
          {friday ? (
            <div className={styles.days}>
              {days[4].map((subject, i) => {
                return (
                  <div className={styles.day} id={`4_${i}`} key={i}>
                    {subject.name ? (
                      <>
                        <h5>{subject.name}</h5>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
              <button>Új óra hozzáadása</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
