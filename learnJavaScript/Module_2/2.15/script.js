//task 1.1

let age = 18;

function checkAge(age) {
    return (age >= 18) ? true : confirm('Родители разрешили?');
}

checkAge(age)

//task 1.2

function checkAge2(age) {
    return (age >= 18) || confirm('Родители разрешили?');
}

checkAge2(age);

//task 2

function min (a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

min(10, 2)

//task 3

let x = prompt('Введите число');
let n = prompt('Введите степень');

function pow (x, n) {
    return Math.pow(x, n);
}

pow(x, n);