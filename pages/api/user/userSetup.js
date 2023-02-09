import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default async function UserSetupPage(req, res) {
  if (req.method === "POST") {
    try {
      let { id } = req.body;
      let dbInstance = doc(db, `userData/${id}`);
      let response = await setDoc(dbInstance, {
        userClass: "",
        school: "",
        nickname: "",
        id: id
      });
      res.status(200).json({ message: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Invalid request" });
  }
}
