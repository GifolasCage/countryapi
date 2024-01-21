(function () {
  const countryIndex = [];

  window.onload = async () => {
    await GetData();
    setUpView();
    sort();
    showRandomCountry();
  };

  function setUpView() {
    const contentBox = document.getElementById("content-box");
    const loadingText = document.getElementById("loading-text");
    const randomBtn = document.getElementById("random-btn");
    loadingText.classList.toggle("d-none");
    contentBox.classList.toggle("d-none");
    randomBtn.addEventListener("click", showRandomCountry);
  }

  function showRandomCountry() {
    const randomCountry = Math.floor(Math.random() * countryIndex.length);
    updateCountry(randomCountry);
  }

  async function GetData() {
    const url = "https://restcountries.com/v3.1/all/";
    try {
      const response = await fetch(url);
      const data = await response.json();

      data.forEach((country, index) => {
        countryIndex[index] = {
          name: country["name"]["common"],
          flag: country["flags"]["svg"],
          officialname: country["name"]["official"],
          region: country["region"],
          capitol: country["capital"],
          population: country["population"].toLocaleString("en-GB"),
        };
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  function updateCountry(id) {
    const mappings = {
      "country-name": "officialname",
      "country-flag": "flag",
      capitol: "capitol",
      region: "region",
      population: "population",
      "wikipedia-btn": "data-wikipedia",
    };

    const updateFunctions = {
      "country-flag": (element, property) => {
        element.src = countryIndex[id][property];
      },
      "wikipedia-btn": (element, property) => {
        element.setAttribute(property, countryIndex[id]["name"]);
        element.removeEventListener("click", wikipediaClickHandler);
        element.addEventListener("click", wikipediaClickHandler);
      },
      default: (element, property) => {
        element.innerText = countryIndex[id][property];
      },
    };

    for (const [elementId, property] of Object.entries(mappings)) {
      const element = document.getElementById(elementId);
      const updateFunction =
        updateFunctions[elementId] || updateFunctions.default;
      updateFunction(element, property);
    }

    updateList(id);
  }

  function wikipediaClickHandler(event) {
    const wikipediaLink = event.currentTarget.getAttribute("data-wikipedia");
    window.open(`https://en.wikipedia.org/wiki/${wikipediaLink}`, "_blank");
  }

  function updateList(id) {
    const listItems = getListItems();
    Array.from(listItems).forEach((l) => l.classList.remove("fw-bold"));
    const listItem = document.getElementById(id);
    listItem.classList.toggle("fw-bold");
  }

  function sort() {
    countryIndex.sort((a, b) => {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();
      return x < y ? -1 : 1;
    });
    createList();
  }

  function createList() {
    const countryList = document.getElementById("country-list");
    countryIndex.forEach((c, i) => {
      const country = document.createElement("li");
      country.id = i;
      country.innerText = countryIndex[i]["name"];
      country.classList.add(
        "country-list-name",
        "list-group-item",
        "border-bottom",
        "fs-5",
        "py-1"
      );
      countryList.append(country);
    });
    searchList();
    addClickToListItems();
  }

  function addClickToListItems() {
    const countryList = document.getElementById("country-list");
    countryList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        updateCountry(event.target.id);
      }
    });
  }

  function searchList() {
    const searchBox = document.getElementById("searchinput");
    const listItems = getListItems();

    searchBox.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();
      Array.from(listItems).forEach((l) => {
        l.style.display = l.textContent.toLowerCase().includes(searchValue)
          ? "block"
          : "none";
      });
    });
  }

  function getListItems() {
    const list = document.getElementById("country-list");
    const listItems = list.getElementsByTagName("li");
    return listItems;
  }
})();
