'use strict';
// In this file we set item details to payment
export function linkToPay(selectImg, selectPrice, selectName) {
  const rentButton = document.querySelectorAll('.rentOnPage');
  rentButton.forEach(function (but, index) {
    but.onclick = function () {
      const image = document.querySelectorAll(selectImg);
      sessionStorage.setItem('productImgForRent', image[index].src);
      const price = document.querySelectorAll(selectPrice);
      sessionStorage.setItem('priceForRent', price[index].textContent.replace('/',''));
      const productName = document.querySelectorAll(selectName);
      sessionStorage.setItem('productName', productName[index].textContent);
      window.location.href = 'payment.html';

    };
  });
};