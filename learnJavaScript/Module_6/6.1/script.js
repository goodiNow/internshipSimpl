//task 1

function sumTo1(num) {
  let sum = 0;

  do {
    sum += num;
    num--;
  } while (num > 0);
  return sum;
}

console.log(sumTo1(100));

function sumTo2(num) {
  if (num === 1) return num;
  return num + sumTo2(num - 1);
}

console.log(sumTo2(100));

function sumTo3(num) {
  return (num * (num + 1)) / 2;
}

console.log(sumTo3(100));

//task 2

function factorial(num) {
  if (num === 1) return 1;
  return num * factorial(num - 1);
}

console.log(factorial(5));

//task 3

function fib(num) {
  let phi = (1 + Math.sqrt(5)) / 2;
  return Math.round(Math.pow(phi, num) / Math.sqrt(5));
}

console.log(fib(77));

//Посмотрел как вычисляются числа Фибоначчи. Выше формула Бине.
//Написал, вроде работает. Phi взял из математики - это обозначение золотого сечения.

function fib2(num) {
  let a = 0,
    b = 1;
  for (let i = 2; i <= num; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

console.log(fib2(77));

//task 4

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function printList1(list) {
  let current = list;
  while (current) {
    console.log(current.value);
    current = current.next;
  }
}

printList1(list);

function printList2(list) {
  console.log(list.value);
  if (list.next) {
    printList2(list.next);
  }
}

printList2(list);

//task 5

function printList3(list) {
  let stack = [];
  let current = list;

  while (current) {
    stack.push(current.value);
    current = current.next;
  }

  while (stack.length > 0) {
    console.log(stack.pop());
  }
}

printList3(list);

function printList4(list) {
  if (list.next) {
    printList4(list.next);
  }
  console.log(list.value);
}

printList4(list);
