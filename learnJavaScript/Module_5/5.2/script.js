//task 1

function sum() {
  let input = prompt("Введите два числа через пробел");

  let numbers = input.split(" ");

  let num1 = +numbers[0];
  let num2 = +numbers[1];

  alert(num1 + num2);
}

sum()

//taks 2

function readNumber() {
  let num = prompt("Введите число");

  if (isFinite(num)) {
    return num;
  } else if (num === null || num.trim() === "") {
    return num;
  }
}

readNumber()

//task 3

function random(min, max) {
  alert(Math.random() * (max - min) + min);
}

random(1, 5);
// random(1, 5);
// random(1, 5);

//task 4

function randomFloat(min, max) {
  alert(Math.floor(Math.random() * (max - min + 1)) + min);
}

randomFloat(1, 5);
// randomFloat(1, 5);
// randomFloat(1, 5);
