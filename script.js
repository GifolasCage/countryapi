var countryIndex = [{}];
const countryCount = 250;
let wikipediaLink;
let loading = true;


window.onload = async function () {
    let statusText = document.getElementById("title");
    updateCountry();
    for (let i = 0; i < countryCount; i++) {
        await GetData(i);
        if(i === countryCount-1){
            //console.log("loop finished");
            sort();
            statusText.innerHTML = "Countries of the World";
            loading = false;
        }
        else{
            statusText.innerHTML = "Loading please wait..."
            loading = true;
        }
    }
}

async function GetData(num){
    let  url = "https://restcountries.com/v3.1/all/";
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    let countryName = data[num]["name"]["common"];
    let officialName = data[num]["name"]["official"]
    let countryFlag = data[num]["flags"]["svg"];
    let capitol = data[num]["capital"];
    let continent = data[num]["region"];
    let population = (data[num]["population"]).toLocaleString('en-GB');

    countryIndex[num] = {"name" : countryName, "flag": countryFlag, "officialname": officialName, "region": continent, "capitol" : capitol, "population" : population};
}

function updateCountry(){
    if(loading){
        document.getElementById("country-name").innerText = "Kingdom of Norway";
        document.getElementById("country-flag").src = "https://flagcdn.com/no.svg";
        document.getElementById("capitol").innerText = "Oslo";
        document.getElementById("region").innerText = "Europe";
        document.getElementById("population").innerText = "5,379,475";
        wikipediaLink = "https://en.wikipedia.org/wiki/Norway"
    }
    else{
        document.getElementById("country-name").innerText = countryIndex[this.id]["officialname"]
        document.getElementById("country-flag").src = countryIndex[this.id]["flag"];
        document.getElementById("capitol").innerText = countryIndex[this.id]["capitol"];
        document.getElementById("region").innerText = countryIndex[this.id]["region"];
        document.getElementById("population").innerText = countryIndex[this.id]["population"];
        wikipediaLink = countryIndex[this.id]["name"];
    }
}

function sort(){
    countryIndex.sort(function(a,b){
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
    createList();
}

function createList(){
    for(i = 0; i<countryCount; i++){
        let country = document.createElement("li");
        country.id = i;
        country.innerText = (i + 1).toString() + ": " + countryIndex[i]["name"];
        country.classList.add("country-list-name");
        country.classList.add("list-group-item");
        document.getElementById("country-list").append(country)
        country.addEventListener("click", updateCountry);
    }
    searchList();
}

function searchList(){
  // (A) GET HTML ELEMENTS
  var filter = document.getElementById("searchinput"), // search box
      list = document.querySelectorAll("li"); // all list items
 
  // (B) ATTACH KEY UP LISTENER TO SEARCH BOX
  filter.onkeyup = () => {
    console.log("hello");
    // (B1) GET CURRENT SEARCH TERM
    let search = filter.value.toLowerCase();
 
    // (B2) LOOP THROUGH LIST ITEMS - ONLY SHOW THOSE THAT MATCH SEARCH
    for (let i of list) {
      let item = i.innerHTML.toLowerCase();
      if (item.indexOf(search) == -1) { i.classList.add("d-none"); }
      else { i.classList.remove("d-none"); }
    }
  };
}

function wikipedia(){
    window.open("https://en.wikipedia.org/wiki/" + wikipediaLink, "_blank");
}