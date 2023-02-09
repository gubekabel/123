import { collection, getDocs } from "firebase/firestore";
import { getUserData } from "../userData/firebase";
import { db } from "./../../firebaseConfig";

export async function getSubs(isToday, userId) {
  try {
    let userData = await getUserData(userId);
    let userClass = userData.userClass;
    if (isToday) {
      let date = new Date();
      let dateToUpdate = `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
      let data = [];
      let dbInstance = collection(db, `subs/todaySubs/${dateToUpdate}`);
      let response = await getDocs(dbInstance);
      response.docs.map((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      data.map((doc, i) => {
        let userClassNumber = userClass.split(".")[0];
        let userClassLetter = userClass.split(".")[1];
        if (
          doc.class.split(".")[0] != userClassNumber ||
          !doc.class
            .trim()
            .toLowerCase()
            .split(".")[1]
            .includes(userClassLetter.trim().toLowerCase())
        ) {
          delete data[i];
        }
      });
      return data;
    } else {
      let date = new Date();
      let dateToUpdate = `${date.getFullYear()}_${date.getMonth()}_${
        date.getDate() + 1
      }`;
      let data = [];
      let dbInstance = collection(db, `subs/tomorrowSubs/${dateToUpdate}`);
      let response = await getDocs(dbInstance);
      response.docs.map((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      data.map((doc, i) => {
        let userClassNumber = userClass.split(".")[0];
        let userClassLetter = userClass.split(".")[1];
        if (
          doc.class.split(".")[0] != userClassNumber ||
          !doc.class
            .trim()
            .toLowerCase()
            .split(".")[1]
            .includes(userClassLetter.trim().toLowerCase())
        ) {
          delete data[i];
        }
      });
      return data;
    }
  } catch (error) {}
}
