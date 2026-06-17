const mealsContainer = document.getElementById("meals");
const categoriesContainer = document.getElementById("categories");
const favoritesContainer = document.getElementById("favorites");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const randomBtn = document.getElementById("randomBtn");

const mealTitle = document.getElementById("mealTitle");
const mealBody = document.getElementById("mealBody");

const mealModal = new bootstrap.Modal(document.getElementById("mealModal"));

let currentMeals = [];

// ==================== Загрузка ====================

loadMeals();
loadCategories();
showFavorites();

// ==================== Главная ====================

async function loadMeals() {
    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );

    const data = await response.json();

    currentMeals = data.meals || [];

    renderMeals(currentMeals);
}

// ==================== Категории ====================

async function loadCategories() {

    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
    );

    const data = await response.json();

    categoriesContainer.innerHTML = "";

    data.categories.forEach(category => {

        categoriesContainer.innerHTML += `
            <div class="col-md-3">
                <button
                    class="btn btn-outline-primary w-100 category-btn"
                    data-category="${category.strCategory}">
                    ${category.strCategory}
                </button>
            </div>
        `;
    });

    document.querySelectorAll(".category-btn").forEach(button => {

        button.addEventListener("click", async () => {

            const category = button.dataset.category;

            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );

            const data = await response.json();

            currentMeals = data.meals || [];

            renderMeals(currentMeals);
        });

    });

}

// ==================== Поиск ====================

searchForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const text = searchInput.value.trim();

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`
    );

    const data = await response.json();

    currentMeals = data.meals || [];

    renderMeals(currentMeals);

});

// ==================== Вывод карточек ====================

function renderMeals(meals) {

    mealsContainer.innerHTML = "";

    if (!meals.length) {

        mealsContainer.innerHTML =
            "<h3 class='text-center'>Нічого не знайдено</h3>";

        return;
    }

    meals.forEach(meal => {

        mealsContainer.innerHTML += `
            <div class="col-md-4">

                <div class="card h-100 shadow-sm">

                    <img
                        src="${meal.strMealThumb}"
                        class="card-img-top"
                        alt="${meal.strMeal}">

                    <div class="card-body">

                        <h5>${meal.strMeal}</h5>

                        <button
                            class="btn btn-primary details-btn"
                            data-id="${meal.idMeal}">
                            Детальніше
                        </button>

                        <button
                            class="btn btn-warning favorite-btn"
                            data-id="${meal.idMeal}">
                            ⭐
                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    addButtonsEvents();
}

// ==================== Кнопки карточек ====================

function addButtonsEvents() {

    document.querySelectorAll(".details-btn").forEach(button => {

        button.addEventListener("click", () => {

            getMealDetails(button.dataset.id);

        });

    });

    document.querySelectorAll(".favorite-btn").forEach(button => {

        button.addEventListener("click", () => {

            const meal = currentMeals.find(
                item => item.idMeal === button.dataset.id
            );

            addToFavorites(meal);

        });

    });

}

// ==================== Детали блюда ====================

async function getMealDetails(id) {

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = await response.json();

    const meal = data.meals[0];

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`];

        if (ingredient && ingredient !== "") {

            ingredients += `<li>${ingredient}</li>`;

        }

    }

    mealTitle.textContent = meal.strMeal;

    mealBody.innerHTML = `
        <img
            src="${meal.strMealThumb}"
            class="img-fluid rounded mb-3">

        <h4>Інгредієнти</h4>

        <ul>
            ${ingredients}
        </ul>

        <h4>Інструкція</h4>

        <p>${meal.strInstructions}</p>
    `;

    mealModal.show();

}

// ==================== Случайное блюдо ====================

randomBtn.addEventListener("click", async () => {

    const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );

    const data = await response.json();

    getMealDetails(data.meals[0].idMeal);

});

// ==================== Избранное ====================

function addToFavorites(meal) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.find(
        item => item.idMeal === meal.idMeal
    );

    if (!exists) {

        favorites.push(meal);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        showFavorites();

    }

}

function showFavorites() {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesContainer.innerHTML = "";

    favorites.forEach(meal => {

        favoritesContainer.innerHTML += `
            <div class="col-md-3">

                <div class="card favorite-card">

                    <img
                        src="${meal.strMealThumb}"
                        class="card-img-top">

                    <div class="card-body">

                        <h6>${meal.strMeal}</h6>

                        <button
                            class="btn btn-danger remove-btn"
                            data-id="${meal.idMeal}">
                            Видалити
                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    document.querySelectorAll(".remove-btn").forEach(button => {

        button.addEventListener("click", () => {

            removeFavorite(button.dataset.id);

        });

    });

}

function removeFavorite(id) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(
        meal => meal.idMeal !== id
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    showFavorites();

}