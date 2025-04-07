//task 1
/*Имеется объект. Нужно проверить, 
что этот объект не пустой и что в нем есть ключ age*/

let user = {
  name: "John",
  age: 30,
};

if ("age" in user) {
  typeof user.age !== "undefined"
    ? alert("В свойстве age есть данные")
    : alert("В свойстве age нет данных");
} else alert("В объекте user нет свойства age");

//task 2
// 1. Создать пустой объект userInfo
// 2. Добавить свойство name со значением Вася
// 3. Добавить свойство age со значением 30
// 4. Изменить значение свойствай name на Лена
// 5. Удалить свойство name из объекта

const userInfo = {};

userInfo.name = "Вася";
userInfo.age = 30;
console.log(userInfo);

userInfo.name = "Лена";
console.log(userInfo);

delete userInfo.name;
console.log(userInfo);
