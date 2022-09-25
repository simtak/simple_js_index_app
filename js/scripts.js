let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let modalContainer = document.querySelector(".modal-container");
  let modalContent = document.createElement("div");
  modalContent.classList.add("modal");
  modalContainer.appendChild(modalContent);

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
    button.classList.add("button-1");
    listItem.classList.add("list-item-class");
    listItem.appendChild(button);
    pokeList.appendChild(listItem);

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);

      modalContainer.classList.add("is-visible");
      modalContainer.innerHTML = "";
      modalContent.innerHTML = "";

      let modalCloseButton = document.createElement("button");
      modalCloseButton.classList.add("modal-close");
      modalCloseButton.innerText = "Close";
      modalCloseButton.addEventListener("click", hideModal);

      let modalHeader = document.createElement("h1");
      modalHeader.innerText = pokemon.name;

      // let modalContent = document.createElement("div");
      // modalContent.classList.add("modal");

      let imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      let pokemonImage = document.createElement("img");
      pokemonImage.src = pokemon.imageUrl;
      pokemonImage.alt = "A front image of the choosen pokemon";

      let pokemonInfo1 = document.createElement("p");
      pokemonInfo1.innerHTML = `Height: ${pokemon.height}`;

      modalContent.appendChild(modalCloseButton);
      modalContent.appendChild(modalHeader);
      modalContainer.appendChild(modalContent);
      modalContent.appendChild(imageContainer);
      modalContent.appendChild(pokemonInfo1);
      imageContainer.appendChild(pokemonImage);
      //modalContainer.appendChild(modalContent);
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector(".modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
