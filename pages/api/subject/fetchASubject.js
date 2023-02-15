import { getOneDaysSubjects } from "../../../lib/subjects/firebase";

export default async function SubjectPage(req, res) {
  if (req.method != "PATCH") {
    res.status(500).json({ message: "Invalid request!" });
    return;
  }
  try {
    let { day, userId } = req.body;

    let subjects = await getOneDaysSubjects(day, userId);

    res.status(200).json({ message: subjects });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
}
