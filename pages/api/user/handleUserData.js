import { db } from "../../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { getUserData } from "../../../lib/userData/firebase";

export default async function UploadUserData(req, res) {
  if (req.method === "POST") {
    try {
      let { userId, userClass, nickname, school } = req.body;
      let dbInstance = doc(db, `userData/${userId}`);
      let response = await setDoc(dbInstance, {
        userClass: userClass,
        nickname: nickname,
        school: school,
        id: userId
      });

      res.status(200).json({ message: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "PATCH") {
    try {
      let { userId } = req.body;
      let data = await getUserData(userId);
      res.status(200).json({ message: data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Invalid request" });
  }
}
