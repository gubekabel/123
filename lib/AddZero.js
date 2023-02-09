export function AddZero(num) {
  num = parseInt(num);
  console.log(num);
  if (num < 10) {
    num = "0" + num.toString();
    return num;
  } else {
    return num;
  }
}
