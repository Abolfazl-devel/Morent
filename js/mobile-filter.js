'use strict';
//Import backdrop
import { backdrop } from "./header.js";
//Import backdrop

const mobileFilterButton = document.getElementById('filter-mobile-but');
const mobileFilter = document.getElementById('filter-mobile');
mobileFilterButton.onclick = function (event) {
  event.stopPropagation();
  backdrop.style.display = 'block';
  mobileFilter.style.left = 0;
};

mobileFilter.onclick = function (event) {
  event.stopPropagation();
};

const closeMobileFilter = document.getElementById('filter__close');
closeMobileFilter.onclick = function () {
  mobileFilter.removeAttribute('style');
  backdrop.style.display = 'none';
};

window.addEventListener('click', function () {
  mobileFilter.removeAttribute('style');
});