import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./../../firebaseConfig";

export async function getSubjects() {
  try {
    let dbInstance = collection(db, "subjects");
    let response = await getDocs(dbInstance);

    let subjects = [];

    response.docs.map((doc) => {
      subjects.push(doc.id);
    });

    return subjects;
  } catch (error) {}
}
