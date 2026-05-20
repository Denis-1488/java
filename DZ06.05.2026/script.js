// 1. Сума чисел у діапазоні

let start = Number(prompt("Введіть початок діапазону"));
let end = Number(prompt("Введіть кінець діапазону"));

let sum = 0;

for (let i = start; i <= end; i++) {
    sum += i;
}

alert("Сума чисел: " + sum);



// 3. Дільники числа

let number = Number(prompt("Введіть число"));

let divisors = "";

for (let i = 1; i <= number; i++) {
    if (number % i == 0) {
        divisors += i + " ";
    }
}

alert("Дільники числа: " + divisors);



// 4. Кількість цифр

let num = prompt("Введіть число");

alert("Кількість цифр: " + num.length);



// 6. Калькулятор

let a = Number(prompt("Перше число"));
let b = Number(prompt("Друге число"));
let sign = prompt("Введіть знак + - * /");

let result;

if (sign == "+") {
    result = a + b;
}
else if (sign == "-") {
    result = a - b;
}
else if (sign == "*") {
    result = a * b;
}
else if (sign == "/") {
    result = a / b;
}

alert("Результат: " + result);



// 9. Таблиця множення

let table = "";

for (let i = 2; i <= 9; i++) {

    table += "Таблиця для " + i + "\n";

    for (let j = 1; j <= 10; j++) {
        table += i + " x " + j + " = " + (i * j) + "\n";
    }

    table += "\n";
}

alert(table);