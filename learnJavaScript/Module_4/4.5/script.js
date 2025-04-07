//task 1

function Calculator() {
  this.a = 0;
  this.b - 0;

  this.read = function () {
    this.a = +prompt("Число a");
    this.b = +prompt("Число b");
  };

  this.sum = function () {
    return this.a + this.b;
  };

  this.mul = function () {
    return this.a * this.b;
  };
}

let calculator = new Calculator();
calculator.read();
alert(calculator.sum());
alert(calculator.mul());

//task 2

function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function () {
    this.value += +prompt("Введите значение", 5);
  };
}

let accumulator = new Accumulator(0);
accumulator.read();
accumulator.read();
alert(accumulator.value);
