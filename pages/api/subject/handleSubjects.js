import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default async function HandleSubjectsPage(req, res) {
  if (req.method === "POST") {
    try {
      let { userId, id, day, name, timeStart, timeEnd, room, teacher } =
        req.body;

      let dbInstance = doc(
        db,
        `userCalendar/${userId}/days/${day}/subjects/${id}`
      );
      let response = await setDoc(dbInstance, {
        name: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
        room: room,
        teacher: teacher
      });
      res.status(200).json({ message: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PATCH") {
    try {
      let { userId, id, day, name, timeStart, timeEnd, room, teacher } =
        req.body;

      let dbInstance = doc(
        db,
        `userCalendar/${userId}/days/${day}/subjects/${id}`
      );
      let response = await updateDoc(dbInstance, {
        name: name,
        timeStart: timeStart,
        timeEnd: timeEnd,
        room: room,
        teacher: teacher
      });
      res.status(200).json({ message: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      let { userId, id, day } = req.body;

      let dbInstance = doc(
        db,
        `userCalendar/${userId}/days/${day}/subjects/${id}`
      );

      let response = deleteDoc(dbInstance);

      res.status(200).json({ message: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Invalid request" });
  }
}
