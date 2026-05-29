const board = document.getElementById("gameBoard");

const emojis = [
    "🍎", "🍌", "🍇", "🍓",
    "🍒", "🍍", "🥝", "🍉",
    "🍎", "🍌", "🍇", "🍓",
    "🍒", "🍍", "🥝", "🍉"
];

// Перемешивание карточек
emojis.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let matchedPairs = 0;

emojis.forEach(emoji => {

    const card = document.createElement("div");

    card.classList.add("card", "hidden");

    card.innerText = emoji;

    board.appendChild(card);

    card.addEventListener("click", () => {

        if (
            lockBoard ||
            card === firstCard ||
            card.classList.contains("matched")
        ) {
            return;
        }

        // Показать карточку
        card.classList.remove("hidden");

        if (!firstCard) {

            firstCard = card;

        } else {

            secondCard = card;

            lockBoard = true;

            // Проверка совпадения
            if (firstCard.innerText === secondCard.innerText) {

                firstCard.classList.add("matched");
                secondCard.classList.add("matched");

                matchedPairs++;

                // Победа
                if (matchedPairs === emojis.length / 2) {

                    setTimeout(() => {
                        alert("🎉 Ты победил!");
                    }, 500);
                }

                resetCards();

            } else {

                // Если не совпали
                setTimeout(() => {

                    firstCard.classList.add("hidden");
                    secondCard.classList.add("hidden");

                    resetCards();

                }, 1000);
            }
        }

    });

});

function resetCards() {

    firstCard = null;
    secondCard = null;

    lockBoard = false;
}