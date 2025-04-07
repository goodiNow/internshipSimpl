//task 1

let user = {};

user.name = "Jhon";
user.surname = "Smith";

user.name = "Pete";
delete user.name;

//task 2

let schedule = {};

alert(isEmpty(schedule));

schedule["8:30"] = "get up";

alert(isEmpty(schedule));

function isEmpty(schedule) {
  return Object.keys(schedule).length === 0;
}

//task 3

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
};

let sum = 0;

function salariesSum(salaries) {
  for (let key in salaries) {
    sum += salaries[key];
  }

  alert(sum);
}

salariesSum(salaries);

//taks 4

let menu = {
  width: 200,
  height: 300,
  title: "My menu",
};

multiplyNumeric(menu);

function multiplyNumeric(menu) {
  for (let key in menu) {
    if (typeof menu[key] === "number") {
      menu[key] *= 2;
    }
  }
}
