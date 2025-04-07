//task 1

function sum(a) {
  let total = a;

  function inner(b) {
    total += b;
    return inner;
  }

  inner.toString = function () {
    return total;
  };

  return inner;
}

console.log(sum(1)(2).toString());
console.log(sum(1)(2)(3).toString());
console.log(sum(5)(-1)(2).toString());
console.log(sum(6)(-1)(-2)(-3).toString());
console.log(sum(0)(1)(2)(3)(4)(5).toString());
