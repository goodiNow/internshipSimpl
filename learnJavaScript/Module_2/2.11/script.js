let age;

//task 1

if (age >= 14 && age <= 90) {
    // alert('Возраст в диапазоне 14 и 90 включительно')
}

//task 2

if (!(age >= 14) && !(age <= 90)) {
    // alert('Возраст вне диапазоа 14 и 90 включительно')
}

if (age < 14 || age > 90) {
    // alert('Возраст вне диапазона 14 и 90')
}

//task 3

let promptName = prompt('Логин пожалуйста');
let promptPassword;

if (promptName == '' || promptName == null) {
    alert('Отменено')
} else if (promptName !== 'Админ' && promptName !== 'админ') {
    alert('Я вас не знаю')
} else {
    promptPassword = prompt('Пароль пожалуйста');

    if (promptPassword == '' || promptPassword == null) {
        alert('Отменено');
    } else if (promptPassword !== 'Я главный') {
        alert('Неверный пароль')
    } else {
        alert('Здравствуйте!')
    }
}