var countryIndex = {};
const countryCount = 150;

window.onload = async function () {
    for (let i = 0; i < countryCount; i++) {
        await GetData(i);
        let country = document.createElement("div");
        country.id = i;
        country.innerText = (i + 1).toString() + ": " + countryIndex[i]["name"];
        country.classList.add("country-list-name");
        document.getElementById("country-list").append(country)
        country.addEventListener("click", updateCountry);
    }
}

async function GetData(num){
    let  url = "https://restcountries.com/v3.1/all/";
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    let countryName = data[num]["name"]["common"];
    let officialName = data[num]["name"]["official"]
    let countryFlag = data[num]["flags"]["png"];

    countryIndex[num] = {"name" : countryName, "flag": countryFlag, "officialname": officialName};
    //console.log(countryName + ", " + countryFlag);
}

function updateCountry(){
    document.getElementById("country-name").innerText = countryIndex[this.id]["officialname"]
    document.getElementById("country-flag").src = countryIndex[this.id]["flag"];
}