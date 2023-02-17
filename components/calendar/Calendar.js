import styles from "../../styles/calendarcalendar/style.module.css";
import { useEffect, useState } from "react";
import LoaderPage from "./../../ui/Loader";
import { useRouter } from "next/router";
import { getUserData } from "../../lib/userData/firebase";
import SubjectAdderForm from "./AddSubjectForm";

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
  let [isSubjectDisplay, setIsSubjectDisplay] = useState(false);
  let [subjectToDisplay, setSubjectToDisplay] = useState({});
  let [userClass, setUserClass] = useState("");
  let [subjectAdder, setSubjectAdder] = useState(false);
  let [newSubjectId, setNewSubjectId] = useState("");
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
  }, [subjectAdder]);

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

  function displaySubject(id) {
    let dayId = parseInt(id.split("_")[1]);
    let subject = days[dayId].filter((day) => day.id === id);
    setIsSubjectDisplay((prev) => !prev);
    setSubjectToDisplay(subject[0]);
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoaderPage></LoaderPage>
      </div>
    );
  }

  if (subjectAdder) {
    return <SubjectAdderForm id={newSubjectId}></SubjectAdderForm>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        {isSubjectDisplay ? (
          <>
            <div className={styles.subjectDisplay}>
              <h3>{subjectToDisplay.name}</h3>
              <h3>{`${subjectToDisplay.timeStart} - ${subjectToDisplay.timeEnd}`}</h3>
              <h3>{subjectToDisplay.room}</h3>
              <h3>{subjectToDisplay.teacher}</h3>
              <button
                onClick={() => {
                  setIsSubjectDisplay(false);
                }}
              >
                Vissza
              </button>
            </div>
          </>
        ) : (
          <>
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
                      <button
                        className={styles.day}
                        id={`${i}_0`}
                        key={i}
                        onClick={(e) => {
                          displaySubject(e.target.id);
                        }}
                      >
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
                  <button
                    onClick={(e) => {
                      setSubjectAdder(true);
                      setNewSubjectId(e.target.id);
                    }}
                    id={`${days[0].length}_0`}
                  >
                    Új óra hozzáadása
                  </button>
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
                      <button
                        onClick={(e) => {
                          displaySubject(e.target.id);
                        }}
                        className={styles.day}
                        id={`${i}_1`}
                        key={i}
                      >
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
                  <button
                    onClick={(e) => {
                      setSubjectAdder(true);
                      setNewSubjectId(e.target.id);
                    }}
                    id={`${days[1].length}_1`}
                  >
                    Új óra hozzáadása
                  </button>
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
                      <button
                        onClick={(e) => {
                          displaySubject(e.target.id);
                        }}
                        className={styles.day}
                        id={`${i}_2`}
                        key={i}
                      >
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
                  <button
                    onClick={(e) => {
                      setSubjectAdder(true);
                      setNewSubjectId(e.target.id);
                    }}
                    id={`${days[2].length}_2`}
                  >
                    Új óra hozzáadása
                  </button>
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
                      <button
                        onClick={(e) => {
                          displaySubject(e.target.id);
                        }}
                        className={styles.day}
                        id={`${i}_3`}
                        key={i}
                      >
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
                  <button
                    onClick={(e) => {
                      setSubjectAdder(true);
                      setNewSubjectId(e.target.id);
                    }}
                    id={`${days[3].length}_3`}
                  >
                    Új óra hozzáadása
                  </button>
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
                      <button
                        onClick={(e) => {
                          displaySubject(e.target.id);
                        }}
                        className={styles.day}
                        id={`${i}_4`}
                        key={i}
                      >
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
                  <button
                    onClick={(e) => {
                      setSubjectAdder(true);
                      setNewSubjectId(e.target.id);
                    }}
                    id={`${days[4].length}_4`}
                  >
                    Új óra hozzáadása
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
