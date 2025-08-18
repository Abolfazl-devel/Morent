'use strict';

export function setFilter(sessionStorageName, selectCarDetail) {
  sessionStorage.clear();
  const filterInLocal = sessionStorage.setItem(sessionStorageName);
  const carDetail = document.querySelectorAll(selectCarDetail);
  const car = document.querySelectorAll('.notover-products-box__product');
  for (let i = 0; i < car.length; i++) {
    if (carDetail[i].textContent !== filterInLocal) {
      car[i].style.display = 'none';
    };
  };
};