const API_URL = "https://www.themealdb.com/api/json/v1/1";

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
}

const mealsContainer = document.getElementById("meals") as HTMLElement;
const categoriesContainer = document.getElementById("categories") as HTMLElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const randomBtn = document.getElementById("randomBtn") as HTMLButtonElement;
const favoritesBtn = document.getElementById("favoritesBtn") as HTMLButtonElement;

/* -------------------- Загрузка популярных блюд -------------------- */

async function loadPopularMeals(): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/search.php?s=`);
        const data = await response.json();

        if (data.meals) {
            renderMeals(data.meals.slice(0, 12));
        }
    } catch (error) {
        console.error(error);
    }
}

/* -------------------- Отображение карточек -------------------- */

function renderMeals(meals: Meal[]): void {

    mealsContainer.innerHTML = "";

    if (!meals || meals.length === 0) {
        mealsContainer.innerHTML = `
            <p class="empty-message">
                Страв не знайдено
            </p>
        `;
        return;
    }

    meals.forEach((meal) => {

        mealsContainer.innerHTML += `
            <div class="col-md-4">

                <div class="card shadow-sm h-100">

                    <img
                        src="${meal.strMealThumb}"
                        class="card-img-top"
                        alt="${meal.strMeal}">

                    <div class="card-body">

                        <h5 class="card-title">
                            ${meal.strMeal}
                        </h5>

                        <p class="card-text">
                            ${meal.strCategory || "Meal"}
                        </p>

                        <div class="mt-auto">

                            <button
                                class="btn btn-primary"
                                onclick="showMeal('${meal.idMeal}')">
                                Детальніше
                            </button>

                            <button
                                class="btn btn-danger favorite-btn"
                                onclick="addToFavorites('${meal.idMeal}')">
                                ❤️
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `;
    });
}

/* -------------------- Поиск -------------------- */

searchForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const query = searchInput.value.trim();

    if (!query) return;

    try {

        const response = await fetch(
            `${API_URL}/search.php?s=${query}`
        );

        const data = await response.json();

        renderMeals(data.meals);

    } catch (error) {
        console.error(error);
    }

});

/* -------------------- Категории -------------------- */

async function loadCategories(): Promise<void> {

    try {

        const response = await fetch(
            `${API_URL}/categories.php`
        );

        const data = await response.json();

        categoriesContainer.innerHTML = "";

        data.categories.forEach((category: any) => {

            categoriesContainer.innerHTML += `
                <div class="col-md-3">

                    <button
                        class="btn btn-outline-primary category-btn"
                        onclick="filterCategory('${category.strCategory}')">

                        ${category.strCategory}

                    </button>

                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

/* -------------------- Фильтр категории -------------------- */

async function filterCategory(category: string): Promise<void> {

    try {

        const response = await fetch(
            `${API_URL}/filter.php?c=${category}`
        );

        const data = await response.json();

        renderMeals(data.meals);

    } catch (error) {
        console.error(error);
    }
}

/* -------------------- Детальная информация -------------------- */

async function showMeal(id: string): Promise<void> {

    try {

        const response = await fetch(
            `${API_URL}/lookup.php?i=${id}`
        );

        const data = await response.json();

        const meal = data.meals[0];

        const modalTitle =
            document.querySelector(".modal-title") as HTMLElement;

        const modalBody =
            document.querySelector(".modal-body") as HTMLElement;

        modalTitle.textContent = meal.strMeal;

        let ingredients = "";

        for (let i = 1; i <= 20; i++) {

            const ingredient = meal[`strIngredient${i}`];

            if (ingredient && ingredient.trim() !== "") {

                ingredients += `
                    <li>${ingredient}</li>
                `;
            }
        }

        modalBody.innerHTML = `
            <img
                src="${meal.strMealThumb}"
                class="img-fluid mb-3">

            <h4>Інгредієнти</h4>

            <ul class="ingredients-list">
                ${ingredients}
            </ul>

            <h4 class="mt-4">
                Інструкція
            </h4>

            <p>
                ${meal.strInstructions}
            </p>
        `;

        const modal = new (window as any).bootstrap.Modal(
            document.getElementById("mealModal")
        );

        modal.show();

    } catch (error) {
        console.error(error);
    }
}

/* -------------------- Random Meal -------------------- */

randomBtn.addEventListener("click", async () => {

    try {

        const response = await fetch(
            `${API_URL}/random.php`
        );

        const data = await response.json();

        renderMeals(data.meals);

    } catch (error) {
        console.error(error);
    }

});

/* -------------------- Favorites -------------------- */

function addToFavorites(id: string): void {

    let favorites: string[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );

    if (!favorites.includes(id)) {

        favorites.push(id);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        alert("Страву додано в обрані");
    }
}

/* -------------------- Показ избранных -------------------- */

favoritesBtn.addEventListener("click", async () => {

    const favorites: string[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );

    if (favorites.length === 0) {

        mealsContainer.innerHTML = `
            <p class="empty-message">
                Немає обраних рецептів
            </p>
        `;

        return;
    }

    const meals: Meal[] = [];

    for (const id of favorites) {

        const response = await fetch(
            `${API_URL}/lookup.php?i=${id}`
        );

        const data = await response.json();

        meals.push(data.meals[0]);
    }

    renderMeals(meals);
});

/* -------------------- Глобальные функции -------------------- */

(window as any).filterCategory = filterCategory;
(window as any).showMeal = showMeal;
(window as any).addToFavorites = addToFavorites;

/* -------------------- Старт -------------------- */

loadPopularMeals();
loadCategories();