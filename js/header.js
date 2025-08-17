'use strict';

// Backdrop
const backdrop = document.getElementById('backdrop');
// Backdrop

// Set search filter
import { setFilter } from "./search-filter.js";
// Set search filter

// Search filter
const desktopSearchFilterBut = document.getElementById('search__filter');
const desktopSearchFilter = document.getElementById('search__filters');
desktopSearchFilterBut.onclick = function (event) {
  event.stopPropagation();
  backdrop.style.display = 'block';
  desktopSearchFilter.style.display = 'block';
};

desktopSearchFilter.onclick = function (event) {
  event.stopPropagation();
};

window.addEventListener('click', function () {
  backdrop.style.display = 'none';
  desktopSearchFilter.style.display = 'none';
});

function searchFilter(item, sessionStorageItemName, selectCarDetail) {
  sessionStorage.setItem(sessionStorageItemName, item.textContent);
  console.log(sessionStorage);

  if (window.location.href.search('category.html') !== -1) {
    setFilter(sessionStorageItemName, selectCarDetail);
  } else {
    window.location.href = 'category.html';
  };
};

const typeFilter = document.querySelectorAll('.search__filters > div:first-child > div > span');
typeFilter.forEach(function (type) {
  type.onclick = function () {
    searchFilter(type, 'carType', '.notover-products-box__deception p');
  };
});

const capacityFilter = document.querySelectorAll('.search__filters > div:nth-child(2) > div > span');
capacityFilter.forEach(function (type) {
  type.onclick = function () {
    searchFilter(type, 'carCapacity', '.notover-products-box__products div:nth-child(3)');
  };
});


window.addEventListener('keydown', function (key) {
  if (key.key == 'Enter' && desktopSearchFilter.style.display == 'block') {
    const minPriceFilterElement = document.getElementById('search__filters--min');
    const maxPriceFilterElement = document.getElementById('search__filters--max');
    sessionStorage.setItem('minPrice', minPriceFilterElement.value.replace(/\D+/g, ''));
    sessionStorage.setItem('maxPrice', maxPriceFilterElement.value.replace(/\D+/g, ''));
    this.location.href = 'category.html';
  };
});
// Search filter