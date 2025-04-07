//task 1

function printNumbers1(from, to) {
  let num = from;

  let timer = setInterval(function () {
    console.log(num);
    if (num == to) {
      clearInterval(timer);
    }
    num++;
  }, 1000);
}

printNumbers1(1, 10);

function printNumbers2(from, to) {
  let num = from;

  setTimeout(function start() {
    console.log(num);
    if (num < to) {
      setTimeout(start, 1000);
    }
    num++;
  }, 1000);
}

printNumbers2(1, 10);