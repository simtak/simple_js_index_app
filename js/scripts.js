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

  return {
    add: add,
    getAll: getAll,
  };
})();

pokemonRepository.getAll().forEach(function (list) {
  if (list.height > 0.6) {
    document.write(
      "<p>" +
        `--Name: ${list.name}; height: ${list.height} Wow thats Big!` +
        "</p>"
    );
  } else {
    document.write(
      "<p>" + `--Name: ${list.name}; height: ${list.height}` + "</p>"
    );
  }
});
