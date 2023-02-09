import { getProfilePic } from "../../../lib/userData/firebase";

export default async function handleProfilePicPage(req, res) {
  let { userId } = req.body;

  if (req.method === "PATCH") {
    try {
      let url = await getProfilePic(userId);
      res.status(200).json({ message: url });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Invalid request" });
  }
}
