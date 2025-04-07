//task 1

Function.prototype.defer = function (ms) {
  setTimeout(this, ms);
};

function f1() {
  console.log("Hello!");
}

f1.defer(1000);

//task 2

Function.prototype.defer = function (ms) {
  let f = this;
  return function (...args) {
    setTimeout(() => f.apply(this, args), ms);
  };
};

function f2(a, b) {
  console.log(a + b);
}

f2.defer(1000)(1, 2);
