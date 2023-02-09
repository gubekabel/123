export function GetCalendarLines(list) {
  let lines = [];
  let seven = [[], [], [], [], []];
  let eight = [[], [], [], [], []];
  let nine = [[], [], [], [], []];
  let ten = [[], [], [], [], []];
  let eleven = [[], [], [], [], []];
  let twelve = [[], [], [], [], []];
  let thirteen = [[], [], [], [], []];
  let fourteen = [[], [], [], [], []];
  let fifteen = [[], [], [], [], []];
  let sixteen = [[], [], [], [], []];
  let seventeen = [[], [], [], [], []];
  let eighteen = [[], [], [], [], []];
  let nineteen = [[], [], [], [], []];
  let twenty = [[], [], [], [], []];
  list.map((dayData, j) => {
    for (let i = 0; i < 15; i++) {
      let subject = dayData[i];
      if (subject) {
        if (subject.timeStart.split(":")[0] === "7") {
          seven[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "8") {
          eight[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "9") {
          nine[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "10") {
          ten[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "11") {
          eleven[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "12") {
          twelve[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "13") {
          thirteen[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "14") {
          fourteen[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "15") {
          fifteen[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "16") {
          sixteen[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "17") {
          seventeen[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "18") {
          eighteen[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "19") {
          nineteen[j] = subject;
        } else if (subject.timeStart.split(":")[0] === "20") {
          twenty[j] = subject;
        }
      } else {
      }
    }
  });

  lines = [
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen,
    seventeen,
    eighteen,
    nineteen,
    twenty
  ];

  return lines;
}
