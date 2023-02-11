import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoaderPage from "./../../ui/Loader";
import styles from "../../styles/style.module.css";
import CalendarSavingPage from "./DetailSavingCalendar";
import { getSubjects } from "../../lib/subjects/firebase";

export default function DetailComponent(props) {
  let router = useRouter();
  let [isLoading, setIsLoading] = useState(true);
  let [userNickname, setUserNickname] = useState("");
  let [isClassAdder, setIsClassAdder] = useState(false);
  let [name, setName] = useState("");
  let [timeStart, setTimeStart] = useState("");
  let [timeEnd, setTimeEnd] = useState("");
  let [room, setRoom] = useState("");
  let [teacher, setTeacher] = useState("");
  let [isEditClass, setIsEditClass] = useState(false);
  let [isDeleteForSurePopUp, setIsDeleteForSurePopUp] = useState(false);
  let [subjects, setSubjects] = useState([]);
  let days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  let napok = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"];
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
  let hoursEnd = [
    "07:45",
    "08:45",
    "09:45",
    "10:45",
    "11:45",
    "12:45",
    "13:45",
    "14:45",
    "15:45",
    "16:45",
    "17:45",
    "18:45",
    "19:45",
    "20:45"
  ];
  let { id, data } = props;

  useEffect(() => {
    loadUserNickname().then((data) => {
      setUserNickname(data);
    });
    getSubjects()
      .then((data) => {
        setSubjects(data);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  async function loadUserNickname() {
    try {
      let response = await fetch("/api/user/handleUserData", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: router.query.userId
        })
      });

      response = await response.json();

      return response.message.nickname;
    } catch (error) {
      return error.message;
    }
  }

  async function handleNewSubject(e) {
    e.preventDefault();
    setIsLoading(true);
    let weekday = days[parseInt(id.split("_")[1])];
    let userId = router.query.userId;
    let response = await fetch("/api/subject/handleSubjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        id: id,
        day: weekday,
        name: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
        room: room,
        teacher: teacher
      })
    });
    setName("");
    setTimeStart("");
    setTimeEnd("");
    setRoom("");
    setTeacher("");
    setIsClassAdder(false);
    setIsEditClass(false);
    setIsDeleteForSurePopUp(false);
    setIsLoading(false);
  }

  async function updateSubject(e) {
    e.preventDefault();
    setIsLoading(true);
    let weekday = days[parseInt(id.split("_")[1])];
    let userId = router.query.userId;
    let response = await fetch("/api/subject/handleSubjects", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        id: id,
        day: weekday,
        name: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
        room: room,
        teacher: teacher
      })
    });
    setName("");
    setTimeStart("");
    setTimeEnd("");
    setRoom("");
    setTeacher("");
    setIsClassAdder(false);
    setIsEditClass(false);
    setIsDeleteForSurePopUp(false);
    setIsLoading(false);
  }

  async function deleteSubject(e) {
    e.preventDefault();
    setIsLoading(true);
    let weekday = days[parseInt(id.split("_")[1])];
    let userId = router.query.userId;
    let response = await fetch("/api/subject/handleSubjects", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        id: id,
        day: weekday
      })
    });
    setName("");
    setTimeStart("");
    setTimeEnd("");
    setRoom("");
    setTeacher("");
    setIsClassAdder(false);
    setIsEditClass(false);
    setIsDeleteForSurePopUp(false);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <>
        <LoaderPage></LoaderPage>
      </>
    );
  }

  let subject;
  try {
    subject = data[parseInt(id.split("_")[0])][parseInt(id.split("_")[1])];
  } catch (error) {}
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          {id ? (
            <div>
              <h2>{`${napok[parseInt(id.split("_")[1])]}, ${
                hours[parseInt(id.split("_")[0])]
              } óra`}</h2>
              {subject.name ? (
                <>
                  {isEditClass ? (
                    <button
                      onClick={() => {
                        setIsEditClass(false);
                      }}
                    >
                      Szerkesztés befejezése
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditClass(true);
                      }}
                    >
                      Óra szerkesztése
                    </button>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <>
              {userNickname === "" || userNickname === undefined ? (
                <>
                  <h1>Maxt Diák</h1>
                </>
              ) : (
                <>
                  <h1>{userNickname}</h1>
                </>
              )}
            </>
          )}
        </div>
        {id ? (
          <>
            <div className={styles.datas}>
              {subject != undefined && subject.name != undefined ? (
                <>
                  {isEditClass ? (
                    <>
                      {isDeleteForSurePopUp ? (
                        <div className={styles.deleteForSurePopUp}>
                          <h3>Biztos törölnéd az órát?</h3>
                          <button onClick={deleteSubject}>Törlés</button>
                          <button
                            onClick={() => {
                              setIsDeleteForSurePopUp(false);
                            }}
                          >
                            Vissza
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={updateSubject}>
                          <div className={styles.data}>
                            <h5>Tantárgy:</h5>
                            {/* <input
                              type="text"
                              placeholder={subject.name}
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            /> */}
                            {subjects.length > 0 ? (
                              <select
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              >
                                <option value="">Válassz tantárgyat</option>
                                {subjects.map((subject, i) => (
                                  <option value={subject} key={i}>
                                    {subject}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <h5>Hiba a tantárgyak betöltése közben.</h5>
                            )}
                          </div>
                          <div className={styles.data}>
                            <h5>Tartam:</h5>
                            <div className={styles.timeData}>
                              <input
                                type="text"
                                placeholder={subject.timeStart}
                                value={timeStart}
                                onChange={(e) => {
                                  setTimeStart(e.target.value);
                                }}
                              />
                              <input
                                type="text"
                                placeholder={subject.timeEnd}
                                value={timeEnd}
                                onChange={(e) => {
                                  setTimeEnd(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className={styles.data}>
                            <h5>Terem:</h5>
                            <input
                              type="text"
                              placeholder={subject.room}
                              value={room}
                              onChange={(e) => setRoom(e.target.value)}
                            />
                          </div>
                          <div className={styles.data}>
                            <h5>Tanár:</h5>
                            <input
                              type="text"
                              placeholder={subject.teacher}
                              value={teacher}
                              onChange={(e) => setTeacher(e.target.value)}
                            />
                          </div>
                          <div className={styles.data}>
                            <button
                              type="submit"
                              className={styles.classEditorButton}
                            >
                              Mentés
                            </button>
                            <button
                              onClick={() => {
                                setIsDeleteForSurePopUp(true);
                              }}
                              className={styles.classDeleterButton}
                            >
                              Törlés
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                  ) : (
                    <>
                      <div className={styles.data}>
                        <h5>Tantárgy:</h5>
                        <h5>{subject.name}</h5>
                      </div>
                      <div className={styles.data}>
                        <h5>Tartam:</h5>
                        <h5>{`${subject.timeStart} - ${subject.timeEnd}`}</h5>
                      </div>
                      <div className={styles.data}>
                        <h5>Terem:</h5>
                        <h5>{subject.room}</h5>
                      </div>
                      <div className={styles.data}>
                        <h5>Tanár:</h5>
                        <h5>{subject.teacher}</h5>
                      </div>
                      {subject.note != "" && subject.note != undefined ? (
                        <>
                          <div className={styles.data}>
                            <h5>Megjegyzés:</h5>
                            <h5>{subject.note}</h5>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {!isClassAdder ? (
                    <>
                      <h3>Nincs óra</h3>
                      <button
                        onClick={() => {
                          setIsClassAdder(true);
                          setTimeStart(hours[parseInt(id.split("_")[0])]);
                          setTimeEnd(hoursEnd[parseInt(id.split("_")[0])]);
                        }}
                      >
                        Adj hozzá
                      </button>
                    </>
                  ) : (
                    <form
                      onSubmit={handleNewSubject}
                      className={styles.classAdderWrapper}
                    >
                      <div>
                        <label htmlFor="">Tantárgy</label>
                        {subjects.length > 0 ? (
                          <select
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          >
                            <option value="">Válassz tantárgyat</option>
                            {subjects.map((subject, i) => (
                              <option value={subject} key={i}>
                                {subject}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <h5>Hiba a tantárgyak betöltése közben.</h5>
                        )}
                      </div>
                      <div>
                        <label htmlFor="">Kezdet</label>
                        <input
                          type="text"
                          placeholder="Pl.: 9:00"
                          onChange={(e) => {
                            setTimeStart(e.target.value);
                          }}
                          value={timeStart}
                        />
                      </div>
                      <div>
                        <label htmlFor="">Vége</label>
                        <input
                          type="text"
                          placeholder="Pl.: 9:45"
                          onChange={(e) => {
                            setTimeEnd(e.target.value);
                          }}
                          value={timeEnd}
                        />
                      </div>
                      <div>
                        <label htmlFor="">Terem</label>
                        <input
                          type="text"
                          placeholder="Pl.: 111"
                          onChange={(e) => {
                            setRoom(e.target.value);
                          }}
                          value={room}
                        />
                      </div>
                      <div>
                        <label htmlFor="">Tanár</label>
                        <input
                          type="text"
                          placeholder="Pl.: Rábai"
                          onChange={(e) => {
                            setTeacher(e.target.value);
                          }}
                          value={teacher}
                        />
                      </div>
                      <div>
                        <button type="submit">OK</button>
                        <button
                          onClick={() => {
                            setName("");
                            setTimeStart("");
                            setTimeEnd("");
                            setRoom("");
                            setTeacher("");
                            setIsClassAdder(false);
                          }}
                        >
                          Vissza
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
            {isClassAdder ? <></> : <CalendarSavingPage></CalendarSavingPage>}
          </>
        ) : (
          <>
            <h3 style={{ marginTop: "20vmin", textAlign: "center" }}>
              Válassz tantárgyat, vagy egy helyet neki!
            </h3>
            <CalendarSavingPage></CalendarSavingPage>
          </>
        )}
      </div>
    </>
  );
}
