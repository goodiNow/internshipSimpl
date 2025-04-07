//task 1

function musicArr() {
  let styles = ["Джаз", "Блюз"];
  console.log(styles);

  styles.push("Рок-н-ролл");
  console.log(styles);

  let middleIndex = Math.floor(styles.length / 2);
  styles[middleIndex] = "Классика";
  console.log(styles);

  let firstElem = styles.shift();
  console.log(styles);

  styles.unshift("Рэп", "Регги");
  console.log(styles);
}

// musicArr();

//task2

function sumInput() {
  let input;
  let result = 0;
  let numbers = [];

  do {
    input = prompt("Введите числа число или нажмите 'Отмена' для выхода");

    if (input === null || isFinite(input) === false || input.trim() === "") break;

    input = +input;
    numbers.push(input);
  } while (true);

  for (let num of numbers) {
    result += num;
  }

  return result;
}

// sumInput();

function getMaxSubSum(arr) {
  let maxSum = 0;
  let currentSum = 0;

  for (let num of arr) {
    currentSum = Math.max(num, currentSum + num);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

console.log(getMaxSubSum([-1, 2, 3, -9]));
console.log(getMaxSubSum([2, -1, 2, 3, -9]));
console.log(getMaxSubSum([-1, 2, 3, -9, 11]));
// console.log(getMaxSubSum([-2, -1, 1, 2]));
// console.log(getMaxSubSum([100, -9, 2, -3, 5]));
// console.log(getMaxSubSum([1, 2, 3]));
// console.log(getMaxSubSum([-1, -2, -3]));
