//task 1

let calculator = {
  a: 0,
  b: 0,

  read() {
    this.a = +prompt("Введите первое число", 2);
    this.b = +prompt("Введите второе число", 3);
  },

  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());

//task 2

let ladder = {
  step: 0,

  up() {
    this.step++;
    return this;
  },

  down() {
    this.step--;
    return this;
  },

  showStep: function () {
    alert(this.step);
    return this;
  },
};

ladder.up().up().down().showStep().down().showStep();
