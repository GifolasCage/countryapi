let countryName;
let countryFlag;

window.onload = async function () {
    countryName = document.getElementById("country-name");
    countryFlag = document.getElementById("country-flag");
    GetData();
}

async function GetData(){
    let response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();
    console.log(data);
    // countryName.innerText = data[0]["name"]["official"];
    // countryFlag.src = data[0]["flags"]["png"];
}