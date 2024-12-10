const API_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

function getPokemon(api) {
  fetch(api)
    .then((response) => response.json())
    .then((json) => {
      fillPokemonData(json.results);
      handlePagination(json.previous, json.next);
    })
    .catch((error) => {
      console.error("Error al consumir la API de Pokémon:", error);
    });
}

async function fillPokemonData(results) {
  let cards = "";
  for (const pokemon of results) {
    try {
      const response = await fetch(pokemon.url);
      const details = await response.json();

      // Extraer Species ID del campo species.url
      const speciesID = details.species.url.split("/").slice(-2, -1)[0];

      // Crear tarjeta
      cards += `
        <div class="col">
          <div class="card h-100" style="width: 12rem; background-color: #f8f9fa;">
            <img src="${details.sprites.front_default}" class="card-img-top" alt="${details.name}">
            <div class="card-body text-center">
              <h2 class="card-title text-capitalize">${details.name}</h2>
              <h5 class="card-title">Status: ${details.moves.length}</h5>
              <h5 class="card-title">Species: ${speciesID}</h5>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error("Error obteniendo detalles del Pokémon:", error);
    }
  }
  document.getElementById("dataPokemon").innerHTML = cards;
}

function handlePagination(prev, next) {
  const prevDisabled = prev ? "" : "disabled";
  const nextDisabled = next ? "" : "disabled";

  const paginationHTML = `
    <li class="page-item ${prevDisabled}">
      <a class="page-link" onclick="getPokemon('${prev}')">Prev</a>
    </li>
    <li class="page-item ${nextDisabled}">
      <a class="page-link" onclick="getPokemon('${next}')">Next</a>
    </li>
  `;

  document.getElementById("pagination-top").innerHTML = paginationHTML;
  document.getElementById("pagination-bottom").innerHTML = paginationHTML;
}

// Inicializar con la primera llamada
getPokemon(API_POKEMON);