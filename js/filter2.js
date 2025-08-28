'use strict';
function setFilter(sessionStorageItemName, selectTXT, index) {
  const txt = document.querySelectorAll(selectTXT);
  sessionStorage.clear();
  sessionStorage.setItem(sessionStorageItemName, txt[index].textContent.trim().toLowerCase());
  postMessage({ type: 'SEND_DATA', data: 'setfilter' }, 'http://localhost');
  // window.location.href = 'category.html';
};


const typeFilterParent = document.querySelectorAll('.filter__car--type div');
typeFilterParent.forEach(function (container, index) {
  container.onclick = function () {
    setFilter('type', '.filter__car--type h6', index);
  };
});

const capacityFilterParent = document.querySelectorAll('.filter__car--capacity div');
capacityFilterParent.forEach(function (container, index) {
  container.onclick = function () {
    setFilter('capacity', '.filter__car--capacity div h6', index);
  };
});

const priceFilter = document.querySelectorAll('.filterPrice');
function inputEvent() {
  const maxPrice = parseInt(saveInput.value, 10);
  sessionStorage.clear();
  sessionStorage.setItem('price', maxPrice);
  postMessage({ type: 'SEND_DATA', data: 'setfilter' }, 'http://localhost');
  window.location.href = 'category.html';
  saveInput.value = 0;
};
function setPriceWithDelay() {
  let saveTimeout;
  return function (...args) {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      inputEvent.apply(this.args);
    }, 2000);
  };
};
const setPriceAndChangePage = setPriceWithDelay();
let saveInput;
priceFilter.forEach(function (input) {
  input.addEventListener('input', function () {
    saveInput = input;
  });
  input.addEventListener('input', setPriceAndChangePage);
});