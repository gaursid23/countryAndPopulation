let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");

let searchInputVal = "";
let countriesList = [];

function createAndAppendCountries(country) {
    let {
        name,
        flag,
        population
    } = country;

    let divEl = document.createElement("div");
    divEl.classList.add("country-card", "col-12", "col-md-12", "d-flex", "flex-row");
    resultCountriesEl.appendChild(divEl);

    let div1El = document.createElement("img");
    div1El.src = country.flag;
    div1El.classList.add("country-flag", "mt-auto", "mb-auto");
    divEl.appendChild(div1El);

    let div2El = document.createElement("div");
    div2El.classList.add("d-flex", "flex-column", "ml-4");
    divEl.appendChild(div2El);

    let headEl = document.createElement("h1");
    headEl.textContent = country.name;
    headEl.classList.add("country-name");
    div2El.appendChild(headEl);

    let paraEl = document.createElement("p");
    paraEl.textContent = country.population;
    paraEl.classList.add("country-population");
    div2El.appendChild(paraEl);
}

function displaySearchResults(countriesList) {
    resultCountriesEl.textContent = "";
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(searchInputVal)) {
            createAndAppendCountries(country);
        }
    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    spinnerEl.classList.remove("d-none");
    fetch(url, options)
        .then(function(resolve) {
            return resolve.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            countriesList = jsonData;
            displaySearchResults(countriesList);
        });
}

function onChangeSearchInput(event) {
    searchInputVal = event.target.value;
    displaySearchResults(countriesList);
}
getCountries();
searchInputEl.addEventListener("keyup", onChangeSearchInput);