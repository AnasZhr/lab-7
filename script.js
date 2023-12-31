const btnXHR = document.getElementById("xhrSearch");
const btnFetch = document.getElementById("fetchSearch");
const btnFetchAsyncAwait = document.getElementById("fetchAsyncAwait");

let searchQueryElem = document.getElementById("query");
let searchResults = document.getElementById("searchResults");

const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "R11IL0IR5ZQWNnnYw-m2H67k1QfyyctF_LAsx_g5xro";

btnXHR.addEventListener("click", function () {
  searchResults.innerHTML = "";
  searchUsingXHR(searchQueryElem.value);
});

btnFetch.addEventListener("click", function () {
  searchResults.innerHTML = "";
  searchUsingFetch(searchQueryElem.value);
});

btnFetchAsyncAwait.addEventListener("click", function () {
  searchResults.innerHTML = "";
  searchUsingFetchAsync(searchQueryElem.value);
});

function getParams(query) {
  if (!query || query.trim().length === 0) {
    return;
  }
  return "client_id=" + API_KEY + "&query=" + query + "&per_page=10";
}

function searchUsingXHR(query) {
  if (!query || query.trim().length === 0) {
    return;
  }
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      displayResults(JSON.parse(xhr.responseText));
    }
  });

  let params = getParams(query);
  xhr.open("GET", API_URL + "?" + params);
  xhr.setRequestHeader("Authorization", "Client-ID " + API_KEY);
  xhr.send();
}

function searchUsingFetch(query) {
  let params = getParams(query);
  fetch(API_URL + "?" + params, { method: "GET" })
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      displayResults(JSON.parse(text));
    })
    .catch((err) => {
      console.log(err);
    });
}

async function searchUsingFetchAsync(query) {
  let params = getParams(query);
  let response = await fetch(API_URL + "?" + params, { method: "GET" });
  let data = await response.json();
  displayResults(data);
}

function displayResults(respObject) {
  for (item of respObject.results) {
    let imgElement = document.createElement("img");
    imgElement.src = item.urls.small;
    imgElement.alt = item.alt_description;
    searchResults.appendChild(imgElement);
  }
}
