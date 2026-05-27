let button = document.getElementById("toggleBtn");

let text = document.getElementById("text");

button.addEventListener("click", function () {

    if (text.style.display === "none") {

        text.style.display = "block";

    } else {

        text.style.display = "none";
    }

});