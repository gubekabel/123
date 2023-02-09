export function getSubLines(pageData) {
  let lines = [];
  let line = [];
  let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  pageData = pageData.replace(/\s+/g, " ");
  for (let i = 0; i < pageData.length; i++) {
    if (pageData[i - 1] === " " && pageData[i + 1] === " " && i != 1) {
      line = line.join("").split(" ");
      let lineDict = {};
      for (let j = 0; j < line.length; j++) {
        if (line[j] === " " || line[j] === "") {
          line.splice(j, 1);
        }
      }
      for (let k = 0; k < line.length; k++) {
        if (k === 0) {
          lineDict.classNumber = line[k];
        } else if (k === 1) {
          lineDict.class = line[k];
        } else if (k === 2) {
          lineDict.subject = line[k];
        } else if (k === 3) {
          if (nums.includes(line[k][0])) {
            lineDict.roomNumber = line[k];
          } else {
            lineDict.substitutedTeacher = line[k];
          }
        } else if (k === 4) {
          lineDict.substitutedTeacher += ` ${line[k]}`;
        } else if (k === 5) {
          if (line[k][0] === line[k][0].toUpperCase()) {
            lineDict.substitutedTeacher += ` ${line[k]}`;
          } else {
            lineDict.note = line[k];
          }
        } else if (k === 6) {
          if (
            line[k][0] === line[k][0].toUpperCase() &&
            !nums.includes(line[k][0])
          ) {
            lineDict.substituteTeacher += ` ${line[k]}`;
          } else {
            lineDict.note += ` ${line[k]}`;
          }
        } else if (k === 7) {
          if (
            line[k][0] === line[k][0].toUpperCase() &&
            !nums.includes(line[k][0])
          ) {
            lineDict.substituteTeacher += ` ${line[k]}`;
          } else {
            lineDict.note += ` ${line[k]}`;
          }
        } else if (k === 8) {
          if (
            line[k][0] === line[k][0].toUpperCase() &&
            !nums.includes(line[k][0])
          ) {
            lineDict.substituteTeacher += ` ${line[k]}`;
          } else {
            lineDict.note += ` ${line[k]}`;
          }
        } else if (k === 9) {
          if (
            line[k][0] === line[k][0].toUpperCase() &&
            !nums.includes(line[k][0])
          ) {
            lineDict.substituteTeacher += ` ${line[k]}`;
          } else {
            lineDict.note += ` ${line[k]}`;
          }
        } else if (k === 10) {
          if (
            line[k][0] === line[k][0].toUpperCase() &&
            !nums.includes(line[k][0])
          ) {
            lineDict.substituteTeacher += ` ${line[k]}`;
          } else {
            lineDict.note += ` ${line[k]}`;
          }
        }
      }
      if (lineDict.note) {
        lineDict.note = lineDict.note
          .split(" ")
          .filter((element) => element != "undefined")
          .join(" ");
      }
      if (lineDict.substituteTeacher) {
        lineDict.substituteTeacher = lineDict.substituteTeacher
          .split(" ")
          .filter((element) => element != "undefined")
          .join(" ");
      }
      if (lineDict.substitutedTeacher) {
        lineDict.substitutedTeacher = lineDict.substitutedTeacher
          .split(" ")
          .filter((element) => element != "undefined")
          .join(" ");
      }
      if (!lineDict.substituteTeacher) {
        lineDict.substituteTeacher = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      if (!lineDict.roomNumber) {
        lineDict.roomNumber = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      if (!lineDict.note) {
        lineDict.note = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      line = lineDict;
      lines.push(line);
      line = [];
      line.push(pageData[i]);
    } else {
      line.push(pageData[i]);
    }
  }
  return lines;
}
