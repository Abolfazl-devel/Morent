'use strict';

// Set search filter
import { setFilter } from "./search-filter.js";
// Set search filter

// Get filter
function getFilter() {
  if (sessionStorage.getItem('carType') !== null) {
    setFilter('carType', '.notover-products-box__deception p');
  };

  if (sessionStorage.getItem('carCapacity') !== null) {
    setFilter('carCapacity', '.notover-products-box__product--info div:nth-child(3) span');
  };

  if (sessionStorage.getItem('minPrice') !== null) {
    const productsPrice = document.querySelectorAll('.notover-products-box__price h3');
    const minPriceFilter = sessionStorage.getItem('minPrice');
    const maxPriceFilter = sessionStorage.getItem('maxPrice')

    for (let i = 0; i < productsPrice.length; i++) {
      if (!(Number(productsPrice[i].textContent.replaceAll(/\D+/g, '')) >= Number(minPriceFilter) && Number(productsPrice[i].textContent.replaceAll(/\D+/g, '')) <= Number(maxPriceFilter))) {
        productsPrice[i].parentElement.parentElement.parentElement.style.display = 'none';
      };
    };
  };
};
getFilter();
// Get filter