function calculate() {
  let expression = prompt("Введите арифметическое выражение:", "2 + 2");
  if (expression === null) return;

  try {
    let result = eval(expression);
    alert(`Результат: ${result}`);
  } catch (error) {
    alert("Ошибка!");
  }
}

calculate();
