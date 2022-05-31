const zeroPad = (num: string, places: number) =>
  String(num).padStart(places, "0");

export function convertDateToComparable(date: string): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.substring(11);
  const day = date.substring(8, 10);
  let month = (months.indexOf(date.substring(4, 7)) + 1).toString();
  if (parseInt(month) < 10) {
    month = zeroPad(month, 2);
  }
  return `${year}${month}${day}`;
}
