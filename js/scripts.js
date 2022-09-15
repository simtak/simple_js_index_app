let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ["Grass", "Poison"],
    },
    {
      name: "Charmander",
      height: 0.6,
      types: "fire",
    },
    {
      name: "Squirtle",
      height: 0.5,
      types: "Water",
    },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokeList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-1");
    listItem.classList.add("list-item-class");
    listItem.appendChild(button);
    pokeList.appendChild(listItem);

    button.addEventListener("click", showDetails);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    allListItem: addListItem,
  };
})();

pokemonRepository.getAll().forEach(function (item) {
  pokemonRepository.allListItem(item);
});
