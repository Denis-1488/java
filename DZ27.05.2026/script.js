// ===== Завдання 3 =====

function washDishes() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("✅ Посуд вимито");
        }, 2000);
    });
}

function cleanRoom() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("✅ Кімнату прибрано");
        }, 4000);
    });
}

function makeDinner() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("✅ Вечеря приготована");
        }, 3000);
    });
}

document.getElementById("task3Btn").addEventListener("click", () => {
    const result = document.getElementById("task3Result");
    result.innerHTML = "Починаємо...<br>";

    washDishes()
        .then((message) => {
            result.innerHTML += message + "<br>";
            return cleanRoom();
        })
        .then((message) => {
            result.innerHTML += message + "<br>";
            return makeDinner();
        })
        .then((message) => {
            result.innerHTML += message;
        });
});

// ===== Завдання 5 =====

function multiplyAsync(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a !== "number" || typeof b !== "number") {
                reject("❌ Некоректні значення");
            } else {
                resolve(a * b);
            }
        }, 2000);
    });
}

async function main() {
    const resultBlock = document.getElementById("task5Result");

    try {
        resultBlock.innerHTML = "Обчислення...";
        const result = await multiplyAsync(6, 9);
        resultBlock.innerHTML = `✅ Результат: ${result}`;
    } catch (error) {
        resultBlock.innerHTML = error;
    }
}

document.getElementById("task5Btn").addEventListener("click", main);