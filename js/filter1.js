'use strict';
//Import backdrop
import { backdrop } from "./header.js";
//Import backdrop

const cars = document.querySelectorAll('.notover-products-box__product');

let deviceSize = window.innerWidth;

window.addEventListener('resize', function () {
  deviceSize = this.innerWidth;
  function changeDisplayInReponsive(displayType1, displayType2) {
    cars.forEach(function (car) {
      if (car.style.display == displayType1) {
        car.style.display = displayType2;
      };
    });
  };

  if (deviceSize < 770) {
    changeDisplayInReponsive('block', 'flex');
  } else {
    changeDisplayInReponsive('flex', 'block');
  };
});

const saveFilters = {
  type: null,
  capacity: null,
  price: null
};

let result;
let checkNone = true;

const checkDivNoneDisplay = (divs) => {
  checkNone = true;
  for (let i in divs) {
    if (divs[i].style.display !== 'none') {
      checkNone = false;
      break;
    };
  };
  return checkNone;
};
function showAndHiddenError(displayType, displayType2) {
  const productsParent = document.getElementById('notover-products-box');
  const showMoreParent = document.getElementById('w-100-show-number');
  const error404 = document.getElementById('not-found');
  productsParent.style.display = displayType;
  showMoreParent.style.display = displayType;
  error404.style.display = displayType2;
};

function loading() {
  const loadProduct = document.getElementById('loading');
  loadProduct.style.display = 'flex';

  setTimeout(() => {
    loadProduct.style.display = 'none';
    if (result) {
      showAndHiddenError('none', 'flex');
    } else {
      showAndHiddenError('flex', 'none');
    };
  }, 3300);
};

function setFilter() {
  showAndHiddenError('none', 'none');
  const types = document.querySelectorAll('.notover-products-box__deception p');
  const capacity = document.querySelectorAll('.notover-products-box__product--info div:nth-child(3) span');
  const productsPrice = document.querySelectorAll('.notover-products-box__price h3');

  cars.forEach(function (car, index) {
    const carType = types[index].textContent.trim().toLowerCase();
    const carCapacity = capacity[index].textContent.trim().toLowerCase();
    const productsPriceValue = parseInt(productsPrice[index].textContent.replace(/\D+/g, '').slice(0, -2));

    let show = true;

    if (saveFilters.type && carType !== saveFilters.type) {
      show = false;
    };

    if (saveFilters.capacity && carCapacity !== saveFilters.capacity) {
      show = false;
    };
    if (saveFilters.price !== null && productsPriceValue > saveFilters.price) {
      show = false;
    };

    if (show) {
      if (deviceSize < 770) {
        car.style.display = 'flex';
      } else {
        car.style.display = 'block';
      };
    } else {
      car.style.display = 'none';
    };

  });

  result = checkDivNoneDisplay(Array.from(cars));
  loading();

};

function setFilterEvent(selectFilterTXT, index, filterPart) {
  const filter = document.querySelectorAll(selectFilterTXT);
  const clickedValue = filter[index].textContent.trim().toLowerCase();
  if (saveFilters[filterPart] == clickedValue) {
    saveFilters[filterPart] = null;
    filter[index].removeAttribute('style');
  } else {
    filter.forEach(function (type) {
      type.removeAttribute('style');
    });
    filter[index].style.color = '#3563EA';
    if (filter[index - 6] !== undefined) {
      filter[index - 6].style.color = '#3563EA';
    } else {
      filter[index + 6].style.color = '#3563EA';
    };
    const filterValue = filter[index].textContent.trim().toLowerCase();
    saveFilters[filterPart] = filterValue;
  };
  setFilter();
};

const typeFilterParent = document.querySelectorAll('.filter__car--type div');
typeFilterParent.forEach(function (container, index) {
  container.onclick = function () {
    setFilterEvent('.filter__car--type div h6', index, 'type');
  };
});

const capacityFilterParent = document.querySelectorAll('.filter__car--capacity div');
capacityFilterParent.forEach(function (container, index) {
  container.onclick = function () {
    setFilterEvent('.filter__car--capacity div h6', index, 'capacity');
  };
});

const priceFilter = document.querySelectorAll('.filterPrice');
priceFilter.forEach(function (input) {
  input.oninput = function () {
    showAndHiddenError('none', 'none');
    const maxPrice = parseInt(input.value, 10);
    saveFilters.price = maxPrice;
    setFilter();
    priceFilter.forEach(function (otherInput) {
      otherInput.value = maxPrice;
    });
  };
});

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