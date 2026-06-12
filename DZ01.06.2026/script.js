const API_KEY = "a0cd1a3b";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const typeSelect = document.getElementById("typeSelect");

const moviesContainer = document.getElementById("movies");
const pagination = document.getElementById("pagination");
const details = document.getElementById("details");

let currentSearch = "";
let currentType = "";

searchBtn.addEventListener("click", () => {

    currentSearch = searchInput.value.trim();
    currentType = typeSelect.value;

    if(currentSearch !== ""){
        getMovies(1);
    }
});

async function getMovies(page){

    let url =
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${currentSearch}&page=${page}`;

    if(currentType){
        url += `&type=${currentType}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    moviesContainer.innerHTML = "";
    pagination.innerHTML = "";
    details.innerHTML = "";

    if(data.Response === "False"){
        moviesContainer.innerHTML =
        `<p class="error">Movie not found!</p>`;
        return;
    }

    data.Search.forEach(movie => {

        const poster =
        movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";

        moviesContainer.innerHTML += `
            <div class="card">
                <img src="${poster}">
                <div class="card-body">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>

                    <button onclick="showDetails('${movie.imdbID}')">
                        Details
                    </button>
                </div>
            </div>
        `;
    });

    createPagination(
        Math.ceil(data.totalResults / 10),
        page
    );
}

function createPagination(totalPages,currentPage){

    let limit = totalPages;

    if(limit > 10){
        limit = 10;
    }

    for(let i = 1; i <= limit; i++){

        const btn = document.createElement("button");

        btn.textContent = i;

        if(i === currentPage){
            btn.classList.add("active-page");
        }

        btn.addEventListener("click", () => {
            getMovies(i);
        });

        pagination.appendChild(btn);
    }
}

async function showDetails(id){

    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
    );

    const movie = await response.json();

    const poster =
    movie.Poster !== "N/A"
    ? movie.Poster
    : "https://via.placeholder.com/300x450?text=No+Image";

    details.innerHTML = `
        <div class="details-box">

            <img src="${poster}">

            <div class="info">
                <h2>${movie.Title}</h2>

                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>Country:</strong> ${movie.Country}</p>
                <p><strong>IMDb:</strong> ${movie.imdbRating}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
            </div>

        </div>
    `;

    details.scrollIntoView({
        behavior: "smooth"
    });
}