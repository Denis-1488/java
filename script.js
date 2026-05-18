// 1. Привітання користувача

let name = prompt("Введіть ваше ім'я:");
alert("Привіт, " + name + "!");


// 3. Периметр квадрата

let side = prompt("Введіть сторону квадрата:");
let perimeter = side * 4;

alert("Периметр квадрата: " + perimeter);


// 4. Площа кола

let radius = prompt("Введіть радіус кола:");
let area = 3.14 * radius * radius;

alert("Площа кола: " + area);


// 6. Конвертер валют

const rate = 0.92;

let dollars = prompt("Введіть суму в доларах:");
let euro = dollars * rate;

alert("Сума в євро: " + euro);


// 10. Парне чи непарне число

let number = prompt("Введіть ціле число:");

(number % 2 == 0)
    ? alert("Число парне")
    : alert("Число непарне");