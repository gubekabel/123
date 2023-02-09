import { getSubjects } from "../../../lib/userCalendar/firebase";

export default async function HandleUserSubjectsPage(req, res) {
  if (req.method === "PATCH") {
    let monday = [];
    let tuesday = [];
    let wednesday = [];
    let thursday = [];
    let friday = [];

    try {
      let mondayData = await getSubjects(`${req.body.userId}`, "monday");
      mondayData.map((doc) => {
        monday.push(doc);
      });
      let tuesdayData = await getSubjects(`${req.body.userId}`, "tuesday");
      tuesdayData.map((doc) => {
        tuesday.push(doc);
      });
      let wednesdayData = await getSubjects(`${req.body.userId}`, "wednesday");
      wednesdayData.map((doc) => {
        wednesday.push(doc);
      });
      let thursdayData = await getSubjects(`${req.body.userId}`, "thursday");
      thursdayData.map((doc) => {
        thursday.push(doc);
      });
      let fridayData = await getSubjects(`${req.body.userId}`, "friday");
      fridayData.map((doc) => {
        friday.push(doc);
      });

      let days = [monday, tuesday, wednesday, thursday, friday];
      res.status(200).json({ message: days });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Invalid request" });
  }
}
