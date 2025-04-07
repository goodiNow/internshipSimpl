//task 1

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

console.log(sumSalaries(salaries));

function sumSalaries(salaries) {
  let sum = 0;

  for (let num of Object.values(salaries)) {
    sum += num;
  }

  return sum;
}

//task 2

let user = {
  name: "John",
  age: 30,
};

console.log(count(user));

function count(user) {
  let sum = Object.keys(user).length;
  return sum;
}
