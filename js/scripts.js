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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 0.6) {
    document.write(
      "<p>" +
        `--Name: ${pokemonList[i].name}; height: ${pokemonList[i].height} Wow thats Big!` +
        "</p>"
    );
  } else {
    document.write(
      "<p>" +
        `--Name: ${pokemonList[i].name}; height: ${pokemonList[i].height}\n` +
        +"</p>"
    );
  }
}
