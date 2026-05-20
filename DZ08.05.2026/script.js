let car = {
    manufacturer: "BMW",
    model: "M3",
    year: 2020,
    averageSpeed: 200
};

function showCarInfo(carObject) {

    let info =
        "Виробник: " + carObject.manufacturer + "\n" +
        "Модель: " + carObject.model + "\n" +
        "Рік випуску: " + carObject.year + "\n" +
        "Середня швидкість: " + carObject.averageSpeed + " км/год";

    alert(info);
}

showCarInfo(car);


function calculateTime(distance, speed) {

    let time = distance / speed;

    let breaks = Math.floor(time / 4);

    time += breaks;

    return time;
}


let distance = Number(prompt("Введіть відстань у км"));

let totalTime = calculateTime(distance, car.averageSpeed);

alert("Необхідний час: " + totalTime + " год.");




// ======================
// 2. Print Machine
// ======================

let printMachine = {

    fontSize: "20px",
    color: "blue",
    fontFamily: "Arial",

    print: function(text) {

        alert(
            "Текст: " + text + "\n" +
            "Розмір шрифту: " + this.fontSize + "\n" +
            "Колір: " + this.color + "\n" +
            "Шрифт: " + this.fontFamily
        );
    }
};

setTimeout(function () {

    printMachine.print("Привіт! Це Print Machine");

}, 5000);