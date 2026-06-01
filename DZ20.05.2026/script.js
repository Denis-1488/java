function generateCalendar() {
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    const calendarDiv = document.getElementById("calendar");

    const monthNames = [
        "Січень", "Лютий", "Березень", "Квітень",
        "Травень", "Червень", "Липень", "Серпень",
        "Вересень", "Жовтень", "Листопад", "Грудень"
    ];

    let firstDay = new Date(year, month - 1, 1).getDay();

    // Понедельник первый день недели
    firstDay = (firstDay + 6) % 7;

    const daysInMonth = new Date(year, month, 0).getDate();

    let html = `<h2>${monthNames[month - 1]} ${year}</h2>`;
    html += `
        <table>
            <tr>
                <th>Пн</th>
                <th>Вт</th>
                <th>Ср</th>
                <th>Чт</th>
                <th>Пт</th>
                <th>Сб</th>
                <th>Нд</th>
            </tr>
    `;

    let day = 1;

    for (let i = 0; i < 6; i++) {
        html += "<tr>";

        for (let j = 0; j < 7; j++) {

            if (i === 0 && j < firstDay) {
                html += "<td></td>";
            } else if (day > daysInMonth) {
                html += "<td></td>";
            } else {
                html += `<td>${day}</td>`;
                day++;
            }
        }

        html += "</tr>";

        if (day > daysInMonth) break;
    }

    html += "</table>";
    calendarDiv.innerHTML = html;
}

// Календар сразу после загрузки
generateCalendar();