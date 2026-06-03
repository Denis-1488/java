const users = [];

window.onload = function () {
    document.getElementById("country").value = "Німеччина";
    document.getElementById("male").checked = true;
};

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const birthDate = document.getElementById("birthDate");
    const phone = document.getElementById("phone");
    const country = document.getElementById("country");
    const comment = document.getElementById("comment");
    const agree = document.getElementById("agree");
    const result = document.getElementById("result");

    document.querySelectorAll(".error").forEach(el => {
        el.classList.remove("error");
    });

    const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+380\d{9}$/;

    if (!nameRegex.test(name.value.trim())) {
        name.classList.add("error");
        valid = false;
    }

    if (!nameRegex.test(surname.value.trim())) {
        surname.classList.add("error");
        valid = false;
    }

    if (!emailRegex.test(email.value.trim())) {
        email.classList.add("error");
        valid = false;
    }

    if (password.value.length < 5 || password.value.includes(" ")) {
        password.classList.add("error");
        valid = false;
    }

    if (birthDate.value === "") {
        birthDate.classList.add("error");
        valid = false;
    }

    if (!phoneRegex.test(phone.value.trim())) {
        phone.classList.add("error");
        valid = false;
    }

    const skills = document.querySelectorAll('input[name="skills"]:checked');

    if (skills.length < 2) {
        document.getElementById("skillsBlock").classList.add("error");
        valid = false;
    }

    if (
        comment.value.trim().length < 10 ||
        comment.value.trim().length > 150
    ) {
        comment.classList.add("error");
        valid = false;
    }

    if (!agree.checked) {
        agree.classList.add("error");
        valid = false;
    }

    if (valid) {
        const gender =
            document.querySelector('input[name="gender"]:checked').value;

        const user = {
            name: name.value.trim(),
            surname: surname.value.trim(),
            email: email.value.trim(),
            password: password.value,
            birthDate: birthDate.value,
            phone: phone.value.trim(),
            country: country.value,
            gender: gender,
            skills: [...skills].map(s => s.value),
            comment: comment.value.trim()
        };

        users.push(user);

        console.log(users);

        result.innerHTML =
            "<h3 style='color:green'>Все заповнено вірно!</h3>";

        this.reset();

        country.value = "Німеччина";
        document.getElementById("male").checked = true;
    } else {
        result.innerHTML =
            "<h3 style='color:red'>Виправте помилки у формі!</h3>";
    }
});