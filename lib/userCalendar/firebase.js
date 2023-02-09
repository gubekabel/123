import { db } from "../../firebaseConfig";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

export async function getSubjects(userId, day) {
  try {
    let dbInstance = collection(
      db,
      `userCalendar/${userId}/days/${day}/subjects`
    );
    let data = [];
    let userData = await getDocs(dbInstance);

    userData.docs.map((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  } catch (error) {
    return error.message;
  }
}
