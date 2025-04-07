//task 1

for (j = 2; j <= 10; j++) {
    if (j % 2 === 0) console.log(j); continue;
}

//task 2

let i = 0;

while (i < 3) {
    alert(`number ${i}!`)
    i++;
}

//task 3

let num;

do {
    num = prompt('Введите число больше сотни');
} while (num <= 100 && num);

//task 4

let n = prompt('Введите конечное число');

prime: for (let l = 2; l <= n; l++) {
    if (l === 2) console.log(`Число ${l} простое!`)

    for (let o = 2; o < l; o++) {
        if (l % o == 0) continue prime;
    }

    console.log(`Число ${l} простое!`)
}