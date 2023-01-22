var countryIndex = [{}];
const countryCount = 250;
let wikipediaLink;
let loading = true;
const debug = false;


window.onload = async function () {
    let statusText = document.getElementById("title");
    let contentBox = document.getElementById("content-box");
    updateCountry();
    if(!debug){
        for (let i = 0; i < countryCount; i++) {
            await GetData(i);
            if(i === countryCount-1){
                //console.log("loop finished");
                sort();
                statusText.innerHTML = "Countries of the World";
                contentBox.classList.remove("d-none");
                loading = false;
                console.log(countryIndex);
            }
            else{
                statusText.innerHTML = "Loading please wait... " + ((i/countryCount)*100).toFixed() + "%";
                loading = true;
            }
        }
    }
    else{
        document.getElementById("country-name").innerText = "Kingdom of Norway";
        document.getElementById("country-flag").src = "https://flagcdn.com/no.svg";
        document.getElementById("capitol").innerText = "Oslo";
        document.getElementById("region").innerText = "Europe";
        document.getElementById("population").innerText = "5,379,475";
        wikipediaLink = "Norway"
        contentBox.classList.remove("d-none");

        for(i=0;i<50;i++){
            let country = document.createElement("li");
            country.innerText = "placeholder item";
            country.classList.add("country-list-name");
            country.classList.add("list-group-item");
            country.classList.add("border-bottom");
            country.classList.add("fs-5");
            country.classList.add("py-1");
            document.getElementById("country-list").append(country);
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
        wikipediaLink = "Norway"
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
        country.innerText = countryIndex[i]["name"];
        country.classList.add("country-list-name");
        country.classList.add("list-group-item");
        country.classList.add("border-bottom");
        country.classList.add("fs-5");
        country.classList.add("py-1");
        document.getElementById("country-list").append(country)
        country.addEventListener("click", updateCountry);
    }
    searchList();
}

function searchList(){
    const searchBox = document.getElementById("searchinput");
    const list = document.getElementById("country-list");

    searchBox.addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();
    const listItems = list.getElementsByTagName("li");
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

function wikipedia(){
    window.open("https://en.wikipedia.org/wiki/" + wikipediaLink, "_blank");
}