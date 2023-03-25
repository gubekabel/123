import styles from "../../styles/calendarcalendar/style.module.css";
import { useEffect, useState } from "react";
import LoaderPage from "../../ui/LoadingPage";
import { useRouter } from "next/router";
import { getUserData } from "../../lib/userData/firebase";
import SubjectAdderForm from "./AddSubjectForm";
import { getSubLines } from "./../../lib/subs/GetSubLines";

export default function CalendarPage(props) {
  let router = useRouter();
  let [days, setDays] = useState([]);
  let { todayPageData, tomorrowPageData } = props;
  todayPageData = getSubLines(todayPageData);
  tomorrowPageData = getSubLines(tomorrowPageData);

  let [isLoading, setIsLoading] = useState(true);
  let [monday, setMonday] = useState(false);
  let [tuesday, setTuesday] = useState(false);
  let [isSubbed, setIsSubbed] = useState(false);
  let [wednesday, setWednesday] = useState(false);
  let [thursday, setThursday] = useState(false);
  let [friday, setFriday] = useState(false);
  let [isSubjectDisplay, setIsSubjectDisplay] = useState(false);
  let [subjectToDisplay, setSubjectToDisplay] = useState({});
  let [userClass, setUserClass] = useState("");
  let [subjectAdder, setSubjectAdder] = useState(false);
  let [newSubjectId, setNewSubjectId] = useState("");
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
  tomorrowPageData.map((line, i) => {
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
      delete tomorrowPageData[i];
    }
  });

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

  function displaySubject(id, isSubbed) {
    try {
      let dayId = parseInt(id.split("_")[1]);
      console.log(dayId, days[dayId], id);
      let subject = days[dayId].filter((day) => day.id === id);
      setIsSubjectDisplay((prev) => !prev);
      setSubjectToDisplay(subject[0]);
      setIsSubbed(isSubbed);
    } catch (error) {}
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
            {isSubbed ? (
              <>
                <div className={`${styles.subjectDisplay} ${styles.subbed}`}>
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
            )}
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
                    let date = new Date();
                    let isSubjectSubbed = false;
                    if (date.getDay() === 1) {
                      todayPageData.map((sub) => {
                        if (
                          sub.classNumber === subject.id.split("_")[0] &&
                          subject.name.toLowerCase() ===
                            sub.subject.toLowerCase()
                        ) {
                          isSubjectSubbed = true;
                          subject.name = sub.subject;
                          subject.room = sub.roomNumber;
                          subject.teacher = sub.substituteTeacher;
                          subject.note = sub.note;
                        }
                      });
                    }
                    return (
                      <>
                        {isSubjectSubbed ? (
                          <>
                            <button
                              onClick={(e) => {
                                console.log(e.target.id);
                                displaySubject(e.target.id, true);
                              }}
                              className={`${styles.day} ${styles.subbed}`}
                              id={`${i}_0`}
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
                          </>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                console.log(e.target.id);
                                displaySubject(e.target.id, false);
                              }}
                              className={styles.day}
                              id={`${i}_0`}
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
                          </>
                        )}
                      </>
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
                    let date = new Date();
                    let isSubjectSubbed = false;
                    if (date.getDay() === 2) {
                      todayPageData.map((sub) => {
                        if (
                          sub.classNumber === subject.id.split("_")[0] &&
                          subject.name.toLowerCase() ===
                            sub.subject.toLowerCase()
                        ) {
                          isSubjectSubbed = true;
                          subject.name = sub.subject;
                          subject.room = sub.roomNumber;
                          subject.teacher = sub.substituteTeacher;
                          subject.note = sub.note;
                        }
                      });
                    } else if (date.getDay() + 1 === 2) {
                      tomorrowPageData.map((sub) => {
                        if (
                          sub.classNumber === subject.id.split("_")[0] &&
                          subject.name.toLowerCase() ===
                            sub.subject.toLowerCase()
                        ) {
                          isSubjectSubbed = true;
                          subject.name = sub.subject;
                          subject.room = sub.roomNumber;
                          subject.teacher = sub.substituteTeacher;
                          subject.note = sub.note;
                        }
                      });
                    }
                    return (
                      <>
                        {isSubjectSubbed ? (
                          <>
                            <button
                              onClick={(e) => {
                                displaySubject(e.target.id, true);
                              }}
                              className={`${styles.day} ${styles.subbed}`}
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
                          </>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                displaySubject(e.target.id, false);
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
                          </>
                        )}
                      </>
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
                    let date = new Date();
                    let isSubjectSubbed = false;
                    if (date.getDay() === 3) {
                      todayPageData.map((sub) => {
                        if (
                          sub.classNumber === subject.id.split("_")[0] &&
                          subject.name.toLowerCase() ===
                            sub.subject.toLowerCase()
                        ) {
                          isSubjectSubbed = true;
                          subject.name = sub.subject;
                          subject.room = sub.roomNumber;
                          subject.teacher = sub.substituteTeacher;
                          subject.note = sub.note;
                        }
                      });
                    } else if (date.getDay() + 1 === 3) {
                      tomorrowPageData.map((sub) => {
                        if (
                          sub.classNumber === subject.id.split("_")[0] &&
                          subject.name.toLowerCase() ===
                            sub.subject.toLowerCase()
                        ) {
                          isSubjectSubbed = true;
                          subject.name = sub.subject;
                          subject.room = sub.roomNumber;
                          subject.teacher = sub.substituteTeacher;
                          subject.note = sub.note;
                        }
                      });
                    }
                    return (
                      <>
                        {isSubjectSubbed ? (
                          <>
                            <button
                              onClick={(e) => {
                                displaySubject(e.target.id, true);
                              }}
                              className={`${styles.day} ${styles.subbed}`}
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
                          </>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                displaySubject(e.target.id, false);
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
                          </>
                        )}
                      </>
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
                    let date = new Date();
                    let isSubjectSubbed = false;
                    if (date.getDay() === 4) {
                      todayPageData.map((sub) => {
                        if (
                          sub.classNumber === subject.id.split("_")[0] &&
                          subject.name.toLowerCase() ===
                            sub.subject.toLowerCase()
                        ) {
                          isSubjectSubbed = true;
                          subject.name = sub.subject;
                          subject.room = sub.roomNumber;
                          subject.teacher = sub.substituteTeacher;
                          subject.note = sub.note;
                        }
                      });
                    } else if (date.getDay() + 1 === 3) {
                      tomorrowPageData.map((sub) => {
                        if (
                          sub.classNumber === subject.id.split("_")[0] &&
                          subject.name.toLowerCase() ===
                            sub.subject.toLowerCase()
                        ) {
                          isSubjectSubbed = true;
                          subject.name = sub.subject;
                          subject.room = sub.roomNumber;
                          subject.teacher = sub.substituteTeacher;
                          subject.note = sub.note;
                        }
                      });
                    }
                    return (
                      <>
                        {isSubjectSubbed ? (
                          <>
                            <button
                              onClick={(e) => {
                                displaySubject(e.target.id, true);
                              }}
                              className={`${styles.day} ${styles.subbed}`}
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
                          </>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                displaySubject(e.target.id, false);
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
                          </>
                        )}
                      </>
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
                    let date = new Date();
                    let isSubjectSubbed = false;
                    if (date.getDay() === 5) {
                      todayPageData.map((sub) => {
                        if (
                          sub.classNumber === subject.id.split("_")[0] &&
                          subject.name.toLowerCase() ===
                            sub.subject.toLowerCase()
                        ) {
                          isSubjectSubbed = true;
                          subject.name = sub.subject;
                          subject.room = sub.roomNumber;
                          subject.teacher = sub.substituteTeacher;
                          subject.note = sub.note;
                        }
                      });
                    }
                    return (
                      <>
                        {isSubjectSubbed ? (
                          <>
                            <button
                              onClick={(e) => {
                                displaySubject(e.target.id, true);
                              }}
                              className={`${styles.day} ${styles.subbed}`}
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
                          </>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                displaySubject(e.target.id, false);
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
                          </>
                        )}
                      </>
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
