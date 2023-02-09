import styles from "../../styles/calendarcalendar/style.module.css";
import { useEffect, useState } from "react";
import LoaderPage from "./../../ui/Loader";
import { GetCalendarLines } from "./../../lib/userCalendar/getCalendarLines";
import { useRouter } from "next/router";
import DetailComponent from "./Detail";
import { getUserData } from "../../lib/userData/firebase";

export default function CalendarPage(props) {
  let router = useRouter();
  let [days, setDays] = useState([]);
  let { subs, tomorrowSubs } = props;
  let [isLoading, setIsLoading] = useState(true);
  let [idToDetermineSubject, setIdToDetermineSubject] = useState("");
  let isClassSubbed = false;
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

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoaderPage></LoaderPage>
      </div>
    );
  }

  days = GetCalendarLines(days);

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={`${styles.tr} ${styles.firstTr}`}>
          <div className={styles.td}>00.00</div>
          <div className={styles.td}>Hétfő</div>
          <div className={styles.td}>Kedd</div>
          <div className={styles.td}>Szerda</div>
          <div className={styles.td}>Csütörtök</div>
          <div className={styles.td}>Péntek</div>
        </div>
        {days.map((day, i) => {
          return (
            <div className={styles.tr} key={i} id={`${hours[i].split(":")[0]}`}>
              <div className={styles.td}>
                <span>{hours[i]}</span>
              </div>
              {day.map((subject, j) => {
                let date = new Date();
                isClassSubbed = false;
                if (date.getDay() - 1 === j) {
                  if (subs.length >= 1) {
                    subs.map((sub) => {
                      if (subject.id) {
                        if (
                          (subject.id.split("_")[0] === sub.classNumber &&
                            userClass.split(".")[0] ===
                              sub.class.split(".")[0] &&
                            sub.class
                              .split(".")[1]
                              .trim()
                              .toLowerCase()
                              .includes(
                                userClass.split(".")[1].trim().toLowerCase()
                              )) ||
                          (userClass.split(".")[1].trim().toUpperCase() ===
                            "B" &&
                            sub.class
                              .split(".")[1]
                              .trim()
                              .toUpperCase()
                              .split(".")[1] != "IB")
                        ) {
                          if (
                            sub.subject.trim().toLowerCase() ===
                            subject.name.trim().toLowerCase()
                          ) {
                            isClassSubbed = true;
                            if (sub.note === "") {
                              subject.note = (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              );
                            } else {
                              subject.note = sub.note;
                            }
                            if (sub.roomNumber === "") {
                              subject.room = (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              );
                            } else {
                              subject.room = sub.roomNumber;
                            }
                            if (sub.substituteTeacher === "") {
                              subject.teacher = (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              );
                            } else {
                              subject.teacher = sub.substituteTeacher;
                            }
                          }
                        }
                      }
                    });
                  }
                } else if (date.getDay() === j) {
                  if (tomorrowSubs.length >= 1) {
                    tomorrowSubs.map((sub) => {
                      if (subject.id) {
                        if (
                          (subject.id.split("_")[0] === sub.classNumber &&
                            userClass.split(".")[0] ===
                              sub.class.split(".")[0] &&
                            sub.class
                              .split(".")[1]
                              .trim()
                              .toLowerCase()
                              .includes(
                                userClass.split(".")[1].trim().toLowerCase()
                              )) ||
                          (userClass.split(".")[1].trim().toUpperCase() ===
                            "B" &&
                            sub.class
                              .split(".")[1]
                              .trim()
                              .toUpperCase()
                              .split(".")[1] != "IB")
                        ) {
                          isClassSubbed = true;
                          if (sub.note === "") {
                            subject.note = (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            );
                          } else {
                            subject.note = sub.note;
                          }
                          if (sub.roomNumber === "") {
                            subject.room = (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            );
                          } else {
                            subject.room = sub.roomNumber;
                          }
                          if (sub.substituteTeacher === "") {
                            subject.teacher = (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            );
                          } else {
                            subject.teacher = sub.substituteTeacher;
                          }
                        }
                      }
                    });
                  }
                }
                if (isClassSubbed) {
                  if (days[i + 1]) {
                    if (
                      days[i + 1][j].name === days[i][j].name &&
                      days[i + 1][j].teacher === days[i][j].teacher
                    ) {
                      return (
                        <>
                          {subject.name ? (
                            <>
                              <div
                                className={`${styles.tdFull} ${styles.doubleClassFirst} ${styles.subs}`}
                                key={j}
                              >
                                <button
                                  id={`${i}_${j}`}
                                  onClick={(e) => {
                                    setIdToDetermineSubject(e.target.id);
                                  }}
                                >
                                  <span> {subject.name}</span>
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={styles.td} key={j}>
                                <button
                                  id={`${i}_${j}`}
                                  onClick={(e) => {
                                    setIdToDetermineSubject(e.target.id);
                                  }}
                                ></button>
                              </div>
                            </>
                          )}
                        </>
                      );
                    } else {
                      if (days[i - 1]) {
                        if (
                          days[i - 1][j].name === days[i][j].name &&
                          days[i - 1][j].teacher === days[i][j].teacher
                        ) {
                          return (
                            <>
                              {subject.name ? (
                                <>
                                  <div
                                    className={`${styles.tdFull} ${styles.doubleClassSecond} ${styles.subs}`}
                                    key={j}
                                  >
                                    <button
                                      id={`${i}_${j}`}
                                      onClick={(e) => {
                                        setIdToDetermineSubject(e.target.id);
                                      }}
                                    >
                                      <span> {subject.name}</span>
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className={styles.td} key={j}>
                                    <button
                                      id={`${i}_${j}`}
                                      onClick={(e) => {
                                        setIdToDetermineSubject(e.target.id);
                                      }}
                                    ></button>
                                  </div>
                                </>
                              )}
                            </>
                          );
                        } else {
                          return (
                            <>
                              {subject.name ? (
                                <>
                                  <div
                                    className={`${styles.tdFull} ${styles.subs}`}
                                    key={j}
                                  >
                                    <button
                                      id={`${i}_${j}`}
                                      onClick={(e) => {
                                        setIdToDetermineSubject(e.target.id);
                                      }}
                                    >
                                      <span> {subject.name}</span>
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className={styles.td} key={j}>
                                    <button
                                      id={`${i}_${j}`}
                                      onClick={(e) => {
                                        setIdToDetermineSubject(e.target.id);
                                      }}
                                    ></button>
                                  </div>
                                </>
                              )}
                            </>
                          );
                        }
                      } else {
                        return (
                          <>
                            {subject.name ? (
                              <>
                                <div
                                  className={`${styles.tdFull} ${styles.subs}`}
                                  key={j}
                                >
                                  <button
                                    id={`${i}_${j}`}
                                    onClick={(e) => {
                                      setIdToDetermineSubject(e.target.id);
                                    }}
                                  >
                                    <span> {subject.name}</span>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className={styles.td} key={j}>
                                  <button
                                    id={`${i}_${j}`}
                                    onClick={(e) => {
                                      setIdToDetermineSubject(e.target.id);
                                    }}
                                  ></button>
                                </div>
                              </>
                            )}
                          </>
                        );
                      }
                    }
                  } else {
                    return (
                      <>
                        {subject.name ? (
                          <>
                            <div
                              className={`${styles.tdFull} ${styles.subs}`}
                              key={j}
                            >
                              <button
                                id={`${i}_${j}`}
                                onClick={(e) => {
                                  setIdToDetermineSubject(e.target.id);
                                }}
                              >
                                <span> {subject.name}</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={styles.td} key={j}>
                              <button
                                id={`${i}_${j}`}
                                onClick={(e) => {
                                  setIdToDetermineSubject(e.target.id);
                                }}
                              ></button>
                            </div>
                          </>
                        )}
                      </>
                    );
                  }
                } else {
                  if (days[i + 1]) {
                    if (
                      days[i + 1][j].name === days[i][j].name &&
                      days[i + 1][j].teacher === days[i][j].teacher
                    ) {
                      return (
                        <>
                          {subject.name ? (
                            <>
                              <div
                                className={`${styles.tdFull} ${styles.doubleClassFirst}`}
                                key={j}
                              >
                                <button
                                  id={`${i}_${j}`}
                                  onClick={(e) => {
                                    setIdToDetermineSubject(e.target.id);
                                  }}
                                >
                                  <span> {subject.name}</span>
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={styles.td} key={j}>
                                <button
                                  id={`${i}_${j}`}
                                  onClick={(e) => {
                                    setIdToDetermineSubject(e.target.id);
                                  }}
                                ></button>
                              </div>
                            </>
                          )}
                        </>
                      );
                    } else {
                      if (days[i - 1]) {
                        if (
                          days[i - 1][j].name === days[i][j].name &&
                          days[i - 1][j].teacher === days[i][j].teacher
                        ) {
                          return (
                            <>
                              {subject.name ? (
                                <>
                                  <div
                                    className={`${styles.tdFull} ${styles.doubleClassSecond}`}
                                    key={j}
                                  >
                                    <button
                                      id={`${i}_${j}`}
                                      onClick={(e) => {
                                        setIdToDetermineSubject(e.target.id);
                                      }}
                                    >
                                      <span> {subject.name}</span>
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className={styles.td} key={j}>
                                    <button
                                      id={`${i}_${j}`}
                                      onClick={(e) => {
                                        setIdToDetermineSubject(e.target.id);
                                      }}
                                    ></button>
                                  </div>
                                </>
                              )}
                            </>
                          );
                        } else {
                          return (
                            <>
                              {subject.name ? (
                                <>
                                  <div className={styles.tdFull} key={j}>
                                    <button
                                      id={`${i}_${j}`}
                                      onClick={(e) => {
                                        setIdToDetermineSubject(e.target.id);
                                      }}
                                    >
                                      <span> {subject.name}</span>
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className={styles.td} key={j}>
                                    <button
                                      id={`${i}_${j}`}
                                      onClick={(e) => {
                                        setIdToDetermineSubject(e.target.id);
                                      }}
                                    ></button>
                                  </div>
                                </>
                              )}
                            </>
                          );
                        }
                      } else {
                        return (
                          <>
                            {subject.name ? (
                              <>
                                <div className={styles.tdFull} key={j}>
                                  <button
                                    id={`${i}_${j}`}
                                    onClick={(e) => {
                                      setIdToDetermineSubject(e.target.id);
                                    }}
                                  >
                                    <span> {subject.name}</span>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className={styles.td} key={j}>
                                  <button
                                    id={`${i}_${j}`}
                                    onClick={(e) => {
                                      setIdToDetermineSubject(e.target.id);
                                    }}
                                  ></button>
                                </div>
                              </>
                            )}
                          </>
                        );
                      }
                    }
                  } else {
                    return (
                      <>
                        {subject.name ? (
                          <>
                            <div className={styles.tdFull} key={j}>
                              <button
                                id={`${i}_${j}`}
                                onClick={(e) => {
                                  setIdToDetermineSubject(e.target.id);
                                }}
                              >
                                <span> {subject.name}</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={styles.td} key={j}>
                              <button
                                id={`${i}_${j}`}
                                onClick={(e) => {
                                  setIdToDetermineSubject(e.target.id);
                                }}
                              ></button>
                            </div>
                          </>
                        )}
                      </>
                    );
                  }
                }
              })}
            </div>
          );
        })}
      </div>
      <DetailComponent id={idToDetermineSubject} data={days}></DetailComponent>
    </div>
  );
}
