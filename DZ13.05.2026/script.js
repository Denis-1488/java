// =======================
// Завдання 1
// =======================

class Marker {
    constructor(color, ink) {
        this.color = color;
        this.ink = ink;
    }

    print(text) {
        let printedText = "";

        for (let char of text) {

            if (this.ink <= 0) {
                break;
            }

            printedText += char;

            if (char !== " ") {
                this.ink -= 0.5;
            }
        }

        document.getElementById("task1").innerHTML +=
            `<p style="color:${this.color}">${printedText}</p>`;

        document.getElementById("task1").innerHTML +=
            `<p>Залишок чорнила: ${this.ink}%</p>`;
    }
}

class RefillableMarker extends Marker {
    refill() {
        this.ink = 100;
    }
}

let marker = new RefillableMarker("blue", 10);

marker.print("Привіт! Це текст синім маркером.");

marker.refill();

document.getElementById("task1").innerHTML +=
    `<p>Маркер заправлено до ${marker.ink}%</p>`;

// =======================
// Завдання 2
// =======================

class ExtendedDate extends Date {

    getTextDate() {
        const months = [
            "січня", "лютого", "березня",
            "квітня", "травня", "червня",
            "липня", "серпня", "вересня",
            "жовтня", "листопада", "грудня"
        ];

        return `${this.getDate()} ${months[this.getMonth()]}`;
    }

    isFuture() {
        let today = new Date();

        return this >= today;
    }

    isLeapYear() {
        let year = this.getFullYear();

        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    nextDay() {
        let next = new Date(this);

        next.setDate(this.getDate() + 1);

        return next;
    }
}

let myDate = new ExtendedDate(2025, 4, 22);

document.getElementById("task2").innerHTML +=
    `<p>Дата текстом: ${myDate.getTextDate()}</p>`;

document.getElementById("task2").innerHTML +=
    `<p>Майбутня дата: ${myDate.isFuture()}</p>`;

document.getElementById("task2").innerHTML +=
    `<p>Високосний рік: ${myDate.isLeapYear()}</p>`;

document.getElementById("task2").innerHTML +=
    `<p>Наступна дата: ${myDate.nextDay().toLocaleDateString()}</p>`;

// =======================
// Завдання 3
// =======================

class Employee {
    constructor(name, position, salary) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }
}

class EmpTable {
    constructor(employees) {
        this.employees = employees;
    }

    getHtml() {

        let html = `
        <table>
            <tr>
                <th>Ім'я</th>
                <th>Посада</th>
                <th>Зарплата</th>
            </tr>
        `;

        for (let emp of this.employees) {
            html += `
                <tr>
                    <td>${emp.name}</td>
                    <td>${emp.position}</td>
                    <td>${emp.salary} грн</td>
                </tr>
            `;
        }

        html += `</table>`;

        return html;
    }
}

let employees = [
    new Employee("Іван", "Менеджер", 25000),
    new Employee("Олена", "Касир", 18000),
    new Employee("Максим", "Охоронець", 15000)
];

let empTable = new EmpTable(employees);

document.getElementById("task3").innerHTML =
    empTable.getHtml();