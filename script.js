(function () {
  const countryIndex = [];

  window.onload = async () => {
    const statusText = document.getElementById("title");
    const contentBox = document.getElementById("content-box");
    const loadingText = document.getElementById("loading-text");
    statusText.innerHTML = "Countries of the World";
    await GetData();
    loadingText.classList.add("d-none");
    contentBox.classList.remove("d-none");
    sort();
    showRandomCountry();
  };

  function showRandomCountry() {
    const randomCountry = Math.floor(Math.random() * countryIndex.length);
    updateCountry(randomCountry);
  }

  async function GetData() {
    const url = "https://restcountries.com/v3.1/all/";
    //const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    try {
      //await delay(2000);
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
    };

    for (const [elementId, property] of Object.entries(mappings)) {
      const element = document.getElementById(elementId);

      if (elementId === "country-flag") {
        element.src = countryIndex[id][property];
      } else {
        element.innerText = countryIndex[id][property];
      }
    }

    const btn = document.getElementById("wikipedia-btn");
    btn.setAttribute("data-wikipedia", countryIndex[id]["name"]);

    updateList(id);
  }

  function updateList(id) {
    const listItems = getListItems();
    Array.from(listItems).forEach((l) => l.classList.remove("fw-bold"));

    const listItem = document.getElementById(id);
    listItem.classList.add("fw-bold");
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
      document.getElementById("country-list").append(country);
      country.addEventListener("click", () => updateCountry(country.id));
    });
    searchList();
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

function wikipedia(btn) {
  const wikipediaLink = btn.getAttribute("data-wikipedia");
  window.open("https://en.wikipedia.org/wiki/" + wikipediaLink, "_blank");
}
