//task 1

let user = {
  name: "John",
  years: 30,
};

let { name, years: age, isAdmin = false } = user;

console.log(name);
console.log(age);
console.log(isAdmin);

//task 2

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 2500,
};

console.log(topSalary(salaries));

function topSalary(salaries) {
  let top = 0;
  let topName;

  for (const [name, salary] of Object.entries(salaries)) {
    if (top < salary) {
      top = salary;
      topName = name;
    }
  }

  return topName;
}
