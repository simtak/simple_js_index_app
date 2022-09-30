let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let imputToFetch = pokemon.detailsUrl;
    return fetch(imputToFetch)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
      });
  }

  function addListItem(pokemon) {
    let pokeList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    listItem.classList.add("list-group-item", "d-grid");
    button.classList.add("btn", "btn-primary");
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#Modal1");

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let pokemonName = document.querySelector("#pokemon-name");
      pokemonName.innerText = pokemon.name;

      let pokemonImage = document.querySelector("#pokemon-img");
      pokemonImage.src = pokemon.imageUrl;
      pokemonImage.alt = "A front image of the choosen pokemon";

      let pokemonHeight = document.querySelector("#pokemon-height");
      pokemonHeight.innerHTML = `Height: ${pokemon.height}`;
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
