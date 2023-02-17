import { useState } from "react";
import styles from "../../styles/subjectadderform/style.module.css";
import { useRouter } from "next/router";

export default function SubjectAdderForm(props) {
  let [name, setName] = useState("");
  let [timeStart, setTimeStart] = useState("");
  let [timeEnd, setTimeEnd] = useState("");
  let [room, setRoom] = useState("");
  let [teacher, setTeacher] = useState("");
  let router = useRouter();
  let { id } = props;
  let days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  async function addRestaurant(e) {
    e.preventDefault();
    console.log(parseInt(id.split("_")[1]), days[parseInt(id.split("_")[1])]);
    let response = await fetch("/api/subject/handleSubjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        userId: router.query.userId,
        name: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
        room: room,
        teacher: teacher,
        day: days[parseInt(id.split("_")[1])]
      })
    });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={addRestaurant} className={styles.form}>
        <div className={styles.data}>
          <label htmlFor="">Tantárgy neve</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles.data}>
          <label htmlFor="">Kezdete</label>
          <input
            type="text"
            value={timeStart}
            onChange={(e) => {
              setTimeStart(e.target.value);
            }}
          />
        </div>
        <div className={styles.data}>
          <label htmlFor="">Vége</label>
          <input
            type="text"
            value={timeEnd}
            onChange={(e) => {
              setTimeEnd(e.target.value);
            }}
          />
        </div>
        <div className={styles.data}>
          <label htmlFor="">Tanár</label>
          <input
            type="text"
            value={teacher}
            onChange={(e) => {
              setTeacher(e.target.value);
            }}
          />
        </div>
        <div className={styles.data}>
          <label htmlFor="">Terem</label>
          <input
            type="text"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
        </div>
        <div className={styles.data}>
          <button type="submit">OK</button>
        </div>
      </form>
    </div>
  );
}
