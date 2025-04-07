//task 1

let number = prompt('Введите число');
if (number > 0) {
    alert("1")
} else if (number === 0) {
    alert("0")
} else {
    alert("-1")
}

//task 2

let result;

let check1 = (a + b > 4) ? result = 'Мало' : result = 'Много';

//task 3

let message;

let check2 = (login == 'Сотрудник') ? message = 'Привет' :
(login == 'Директор') ? message = 'Здраствуйте' :
(login == '') ? message = 'Нет логина' : message = '';