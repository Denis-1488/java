let buttons = document.querySelectorAll(".tab-btn");

let contents = document.querySelectorAll(".tab-content");

buttons.forEach(button => {

    button.addEventListener("click", function () {

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        contents.forEach(content => {
            content.classList.remove("active");
        });

        button.classList.add("active");

        let tabId = button.getAttribute("data-tab");

        document.getElementById(tabId).classList.add("active");

    });

});