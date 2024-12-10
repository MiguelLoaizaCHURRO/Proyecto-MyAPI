const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const animeResults = document.getElementById("animeResults");

function searchAnime() {
    const query = searchInput.value.trim();
    if (query === "") {
        alert("Por favor ingresa el nombre de un anime.");
        return;
    }

    const apiUrl = `https://api.jikan.moe/v4/anime?q=${query}&limit=5`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayResults(data.data);
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });
}

function displayResults(animes) {
    if (animes.length === 0) {
        animeResults.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }

    let resultsHTML = "";
    animes.forEach((anime) => {
        resultsHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${anime.images.jpg.large_image_url}" class="card-img-top" alt="${anime.title}">
                    <div class="card-body">
                        <h5 class="card-title">${anime.title}</h5>
                        <p class="card-text">Episodios: ${anime.episodes ? anime.episodes : "N/A"}</p>
                        <a href="${anime.url}" class="btn btn-dark" target="_blank">Ver más</a>
                    </div>
                </div>
            </div>
        `;
    });

    animeResults.innerHTML = resultsHTML;
}

searchButton.addEventListener("click", searchAnime);
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchAnime();
    }
});