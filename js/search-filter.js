'use strict';

export function setFilter(localStorageName, selectCarDetail) {
  const filterInLocal = localStorage.getItem(localStorageName);
  const carDetail = document.querySelectorAll(selectCarDetail);
  const car = document.querySelectorAll('.notover-products-box__product');
  console.log(filterInLocal);

  for (let i = 0; i < car.length; i++) {
    if (carDetail[i].textContent !== filterInLocal) {
      car[i].style.display = 'none';
      console.log('work');
    };
    console.log(carDetail[i].textContent);
  };
};