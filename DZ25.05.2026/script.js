function setCookie(name, value, days = 30) {
    let date = new Date();

    date.setTime(
        date.getTime() + days * 24 * 60 * 60 * 1000
    );

    document.cookie =
        `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    let cookieName = name + "=";

    let cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        cookie = cookie.trim();

        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length);
        }
    }

    return "";
}

const translations = {
    uk: {
        title: "Реєстраційна форма",
        subtitle: "Приклад сучасної HTML форми з різними елементами",
        theme: "Тема",
        language: "Мова",
        name: "Ім'я",
        surname: "Прізвище",
        password: "Пароль",
        birth: "Дата народження",
        phone: "Телефон",
        country: "Країна",
        comment: "Коментар",
        submit: "Відправити",
        reset: "Очистити"
    },

    en: {
        title: "Registration Form",
        subtitle: "Example of a modern HTML form",
        theme: "Theme",
        language: "Language",
        name: "Name",
        surname: "Surname",
        password: "Password",
        birth: "Date of Birth",
        phone: "Phone",
        country: "Country",
        comment: "Comment",
        submit: "Submit",
        reset: "Reset"
    }
};

function changeLanguage(lang) {

    document.getElementById("title").textContent =
        translations[lang].title;

    document.getElementById("subtitle").textContent =
        translations[lang].subtitle;

    document.getElementById("themeLabel").textContent =
        translations[lang].theme;

    document.getElementById("langLabel").textContent =
        translations[lang].language;

    document.getElementById("nameLabel").textContent =
        translations[lang].name;

    document.getElementById("surnameLabel").textContent =
        translations[lang].surname;

    document.getElementById("passwordLabel").textContent =
        translations[lang].password;

    document.getElementById("birthLabel").textContent =
        translations[lang].birth;

    document.getElementById("phoneLabel").textContent =
        translations[lang].phone;

    document.getElementById("countryLabel").textContent =
        translations[lang].country;

    document.getElementById("commentLabel").textContent =
        translations[lang].comment;

    document.getElementById("submitBtn").textContent =
        translations[lang].submit;

    document.getElementById("resetBtn").textContent =
        translations[lang].reset;

    setCookie("language", lang);
}

function changeTheme(theme) {

    if (theme === "light") {
        document.body.classList.add("light-theme");
    }
    else {
        document.body.classList.remove("light-theme");
    }

    setCookie("theme", theme);
}

window.onload = () => {

    let savedTheme =
        getCookie("theme") || "dark";

    let savedLanguage =
        getCookie("language") || "uk";

    changeTheme(savedTheme);
    changeLanguage(savedLanguage);

    document.getElementById("themeSelect").value =
        savedTheme;

    document.getElementById("langSelect").value =
        savedLanguage;

    document.getElementById("themeSelect")
        .addEventListener("change", function () {

            changeTheme(this.value);

        });

    document.getElementById("langSelect")
        .addEventListener("change", function () {

            changeLanguage(this.value);

        });
};