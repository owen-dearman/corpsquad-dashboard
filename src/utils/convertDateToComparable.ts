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
  const day = date.substring(8, 9);
  const month: string = (months.indexOf(date.substring(4, 6)) + 1).toString();
  return `${year}${month}${day}`;
}
