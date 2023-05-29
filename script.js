// Initialization of variables
let countryIndex = [{}];
const countryCount = 250;
let wikipediaLink;
let loading = true;
const debug = false;

window.onload = async function () {
  let statusText = document.getElementById("title");
  let contentBox = document.getElementById("content-box");
  updateCountry(); // Update displayed country information
  await GetData(); // Asynchronously get data for each country
  // Once data loading is complete, sort and create the list
  sort();
  statusText.innerHTML = "Countries of the World";
  contentBox.classList.remove("d-none");
  loading = false;
  console.log(countryIndex);
};

// Get data for all countries from an API
async function GetData() {
  let url = "https://restcountries.com/v3.1/all/";
  let response = await fetch(url);
  let data = await response.json();

  // Iterate over each country data and populate the countryIndex
  data.forEach((country, index) => {
    let countryName = country["name"]["common"];
    let officialName = country["name"]["official"];
    let countryFlag = country["flags"]["svg"];
    let capitol = country["capital"];
    let continent = country["region"];
    let population = country["population"].toLocaleString("en-GB");

    countryIndex[index] = {
      name: countryName,
      flag: countryFlag,
      officialname: officialName,
      region: continent,
      capitol: capitol,
      population: population,
    };
  });
}

function updateCountry() {
  if (loading) {
    //Hardcoded default values while page is loading.
    document.getElementById("country-name").innerText = "Kingdom of Norway";
    document.getElementById("country-flag").src = "https://flagcdn.com/no.svg";
    document.getElementById("capitol").innerText = "Oslo";
    document.getElementById("region").innerText = "Europe";
    document.getElementById("population").innerText = "5,379,475";
    wikipediaLink = "Norway";
  } else {
    document.getElementById("country-name").innerText =
      countryIndex[this.id]["officialname"];
    document.getElementById("country-flag").src = countryIndex[this.id]["flag"];
    document.getElementById("capitol").innerText =
      countryIndex[this.id]["capitol"];
    document.getElementById("region").innerText =
      countryIndex[this.id]["region"];
    document.getElementById("population").innerText =
      countryIndex[this.id]["population"];
    wikipediaLink = countryIndex[this.id]["name"];
  }
}

function sort() {
  countryIndex.sort(function (a, b) {
    //Convert to lowercase for case insensitive sorting.
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  createList();
}

// Function to create the list of countries in the HTML
function createList() {
  //Create a list item for each country retrieved from the API
  for (i = 0; i < countryCount; i++) {
    let country = document.createElement("li");
    country.id = i;
    country.innerText = countryIndex[i]["name"];
    country.classList.add("country-list-name");
    country.classList.add("list-group-item");
    country.classList.add("border-bottom");
    country.classList.add("fs-5");
    country.classList.add("py-1");
    document.getElementById("country-list").append(country);
    country.addEventListener("click", updateCountry);
  }
  searchList();
}

// Function to enable searching the list of countries
function searchList() {
  const searchBox = document.getElementById("searchinput");
  const list = document.getElementById("country-list");

  //Add an eventlistener to the input field to check for changes
  searchBox.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const listItems = list.getElementsByTagName("li");
    //Loop through contrylist to see if searchvalue present. Hide the ones that dont match searchvalue
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      if (listItem.textContent.toLowerCase().includes(searchValue)) {
        listItem.style.display = "block";
      } else {
        listItem.style.display = "none";
      }
    }
  });
}

// Function to open the Wikipedia page for a country in a new tab
function wikipedia() {
  window.open("https://en.wikipedia.org/wiki/" + wikipediaLink, "_blank");
}
