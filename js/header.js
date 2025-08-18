'use strict';

// Backdrop
const backdrop = document.getElementById('backdrop');
// Backdrop

// Set search filter
import { setFilter } from "./search-filter.js";
// Set search filter

// Search filter

function closeHeaderPops(searchFilterBox) {
  backdrop.style.display = 'none';
  searchFilterBox.style.display = 'none';
};

const searchFilterBut = document.querySelectorAll('.search__filter');
const searchFilterBox = document.querySelectorAll('.search__filters');
searchFilterBut.forEach(function (but, index) {
  but.onclick = function (event) {
    if (searchFilterBox[index].style.display == 'none') {
      event.stopPropagation();
      backdrop.style.display = 'block';
      searchFilterBox[index].style.display = 'block';
    };
  };
});

searchFilterBox.forEach(function (box) {
  box.onclick = function (event) {
    event.stopPropagation();
  };
});

window.addEventListener('click', function () {
  closeHeaderPops(searchFilterBox[0]);
  closeHeaderPops(searchFilterBox[1]);
});

function searchFilter(item, sessionStorageItemName, selectCarDetail) {
  sessionStorage.setItem(sessionStorageItemName, item.textContent);

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
  if (key.key == 'Enter') {
    function sendInputs(selectMinprice, selectMaxPrice) {
      const minPriceFilterElement = document.getElementById(selectMinprice);
      const maxPriceFilterElement = document.getElementById(selectMaxPrice);
      sessionStorage.clear();
      sessionStorage.setItem('minPrice', minPriceFilterElement.value.replace(/\D+/g, ''));
      sessionStorage.setItem('maxPrice', maxPriceFilterElement.value.replace(/\D+/g, ''));
      window.location.href = 'category.html';
    };

    if (searchFilterBox[0].style.display == 'block') {
      sendInputs('search__filters--min', 'search__filters--max');
    } else if (searchFilterBox[1].style.display == 'block') {
      sendInputs('mobile-search__filters--min', 'mobile-search__filters--max');
    };
  };
});
// Search filter