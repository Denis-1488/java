const API_KEY = "85b35bc639a99845a7e503d0e3fcf910";

const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");
const weatherResult = document.getElementById("weatherResult");

const cities = {
    Ukraine: ["Kyiv", "Kharkiv", "Odesa", "Dnipro"],
    Poland: ["Warsaw", "Krakow", "Gdansk"],
    Germany: ["Berlin", "Munich", "Hamburg"],
    France: ["Paris", "Lyon", "Marseille"]
};

for (let country in cities) {
    let option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
}

countrySelect.addEventListener("change", () => {
    citySelect.innerHTML = "";

    cities[countrySelect.value].forEach(city => {
        let option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
});

document.getElementById("weatherBtn").addEventListener("click", async () => {

    const city = citySelect.value;

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        let icon = "☀️";

        const weather =
            data.weather[0].main.toLowerCase();

        if(weather.includes("rain")){
            icon = "🌧️";
        }
        else if(weather.includes("cloud")){
            icon = "☁️";
        }
        else if(weather.includes("snow")){
            icon = "❄️";
        }

        weatherResult.innerHTML = `
            <div class="weather-icon">${icon}</div>
            <h2>${data.name}</h2>
            <p>${data.main.temp} °C</p>
            <p>${data.weather[0].description}</p>
        `;

    } catch(error){
        weatherResult.innerHTML =
            "Помилка отримання погоди";
    }

});