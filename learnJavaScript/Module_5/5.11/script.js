//task 1

let dateTask1 = new Date(2012, 1, 20, 3, 12);
// alert(dateTask1);

//task 2

let dateTask2 = new Date(2012, 0, 3);

// console.log(getWeekDay(dateTask2));

function getWeekDay(dateTask2) {
  const days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  return days[dateTask2.getDay()];
}

//task 3

let dateTask3 = new Date(2025, 3, 13);

// console.log(getDateAgo(dateTask3, 1));
// console.log(getDateAgo(dateTask3, 2));
// console.log(getDateAgo(dateTask3, 365));

function getDateAgo(date, days) {
  let pastDate = new Date(date);
  pastDate.setDate(date.getDate() - days);
  return pastDate.getDate();
}

//task 4

function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// console.log(getLastDayOfMonth(2012, 1));
// console.log(getLastDayOfMonth(2024, 0));
// console.log(getLastDayOfMonth(2024, 3));
// console.log(getLastDayOfMonth(2024, 11));

//task 5

function getSecondsToday() {
  let now = new Date();
  let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((now - startOfDay) / 1000);
}

// console.log(getSecondsToday());

//task 6

function getSecondsUntillTomorrow() {
  let now = new Date();
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.floor((tomorrow - now) / 1000);
}

// console.log(getSecondsUntillTomorrow());

//task 7

function formatDate(date) {
  let diff = new Date() - date;
  if (diff < 1000) return "прямо сейчас";

  let sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec} сек. назад`;

  let min = Math.floor(sec / 60);
  if (min < 60) return `${min} мин. назад`;

  let d = date;
  return `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${(d.getFullYear() % 100)
    .toString()
    .padStart(2, "0")} ${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

// console.log(formatDate(new Date(new Date() - 1)));
// console.log(formatDate(new Date(new Date() - 30 * 1000)));
// console.log(formatDate(new Date(new Date() - 5 * 60 * 1000)));
// console.log(formatDate(new Date(new Date() - 86400 * 1000)));
