'use strict';
// Import selection check varable
import { checkSelection } from "./pick-drop-form.js";
// Import selection check varable


// Get backup of first HTML without changing
const container = document.getElementById('continer');
const htmlBackup = container.cloneNode(true);

// Product price
const allProductsPriceOnPage = document.getElementById('about-car__total-sums');



const payForm = document.getElementById('payment-rent-forms');

const visaCardExpration = document.getElementById('payment-rent-form__part--expration-date');

let savePayMethod = 'Credit Card';

payForm.onsubmit = function (event) {
  event.preventDefault();
  const payLoading = document.getElementById('loading');
  payLoading.style.display = 'flex';
  const invaildError = document.querySelectorAll('.payment-rent-form__part--error');
  for (let i = 0; i < checkSelection.length; i++) {

    if (checkSelection[i] == false) {
      invaildError[i + 4].style.display = 'block';
    };
  }


  const firstName = document.getElementById('payment-rent-form__part--name');
  const nameRegax = /^[A-Za-z]{6,}$/;
  if (!nameRegax.test(firstName.value)) {
    invaildError[0].style.display = 'block';
  };

  const phoneNumber = document.getElementById('payment-rent-form__part--phone-number');
  if (!/^\+?[\d\s\-()]{7,20}$/.test(phoneNumber.value)) {
    invaildError[1].style.display = 'block';
  };

  const streetAddress = document.getElementById('payment-rent-form__part--address');
  const selectedCity = document.getElementById('payment-rent-form__part--city');
  const accessToken = 'pk.1f5c1326519fc0f8051e5f272d925692';

  fetch(`https://us1.locationiq.com/v1/search.php?key=${accessToken}&q=${encodeURIComponent(streetAddress.value)}&format=json`)
    .then(res => res.json())
    .then(data => {
      console.log(data[0]);
      if (data && data.length > 0) {
        const displayName = data[0].display_name || '';
        const parts = displayName.split(',').map(p => p.trim());

        let city = '';
        if (parts.length >= 3) {
          city = parts[parts.length - 3];
        } else if (parts.length >= 2) {
          city = parts[parts.length - 2];
        }

        if (!city || city.toLowerCase() !== selectedCity.value.toLowerCase()) {
          invaildError[2].style.display = 'block';
        }
      } else {
        invaildError[2].style.display = 'block';
      }
    });

  fetch(`https://us1.locationiq.com/v1/search.php?key=${accessToken}&q=${encodeURIComponent(selectedCity.value)}&format=json&limit=1`)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const results = data[0];
        let cityName = null;

        if (results.address) {
          cityName = results.address.city ||
            results.address.town ||
            results.address.village ||
            results.address.hamlet;
        };

        if (!cityName && results.display_name) {
          const parts = results.display_name.split(',').map(p => p.trim());
          if (parts.length >= 3) {
            cityName = parts[parts.length - 3];
          } else {
            cityName = parts[0];
          }
        };

        if (!cityName || cityName.trim().toLowerCase() !== selectedCity.value.trim().toLowerCase()) {
          invaildError[3].style.display = 'block';
        };
      } else {
        invaildError[3].style.display = 'block';
      };
    });


  const cardNumber = document.getElementById('payment-rent-form__part--card-num');
  if (cardNumber.parentElement.parentElement.style.display !== 'none') {
    function checkCardNum() {
      if (!/^\d+$/.test(cardNumber.value)) {
        invaildError[10].style.display = 'block';
        return;
      };

      const visaRegex = /^4(\d{12}|\d{15}|\d{18})$/;
      if (!visaRegex.test(cardNumber.value)) {
        invaildError[10].style.display = 'block';
        return;
      };

      let sum = 0;
      let shouldDouble = false;

      for (let i = cardNumber.value.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.value.charAt(i), 10);

        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        };

        sum += digit;
        shouldDouble = !shouldDouble;
      };

      if (sum % 10 !== 0) {
        invaildError[10].style.display = 'block';
      };

      const combinedRegax = /^4(\d{12}|\d{15}|\d{18})$|^5[1-5]\d{14}$|^(222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/;
      checkNumber = combinedRegax.test(cardNumber.value);
    };

    checkCardNum();

    function checkCardExpration() {
      if (!/^\d{2}\/\d{2}\/\d{2}$/.test(visaCardExpration.value)) {
        invaildError[11].style.display = 'block';
        return;
      };

      const [dayInArray, monthInArray, yearInArray] = visaCardExpration.value.split('/');
      const day = parseInt(dayInArray, 10);
      const month = parseInt(monthInArray, 10);
      const year = 2000 + parseInt(yearInArray, 10);

      if (month < 1 || month > 12) {
        invaildError[11].style.display = 'block';
        return;
      };

      const lastDayOfMonth = new Date(year, month, 0).getDate();
      if (day < 1 || day > lastDayOfMonth) {
        invaildError[11].style.display = 'block';
        return;
      };

      return { day, month, year };
    };

    function runCheckCardFun() {
      const gettingDate = checkCardExpration();
      if (!gettingDate) {
        invaildError[11].style.display = 'block';
        return;
      };
      const { day, month, year } = gettingDate;
      const expiryDate = new Date(year, month - 1, day, 23, 59, 59, 999);
      const now = new Date();
      if (expiryDate > now) {
        invaildError[11].style.display = 'block';
      };
    };
    runCheckCardFun();


    const visaCardHolderName = document.getElementById('payment-rent-form__part--card-holder-name');
    if (!nameRegax.test(visaCardHolderName.value)) {
      invaildError[12].style.display = 'block';
    };

    const cvc = document.getElementById('payment-rent-form__part--cvc');
    if (!/^\d{3}$/.test(cvc.value)) {
      invaildError[13].style.display = 'block';
    };
  };

  const payPalEmail = document.getElementById('payment-rent-form__part--paypal-email');
  if (payPalEmail.parentElement.parentElement.hasAttribute('style') && payPalEmail.parentElement.parentElement.style.display !== 'none') {
    if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@(gmail\.com|yahoo\.com|outlook\.com|protonmail\.com|zoho\.com|icloud\.com|mail\.com|gmx\.com|aol\.com|yandex\.com|yandex\.ru|tutanota\.com|fastmail\.com|posteo\.de|mailfence\.com|hotmail\.com|ymail\.com)$/.test(payPalEmail.value)) {
      invaildError[14].style.display = 'block';
    };
  };

  const TxID = document.getElementById('payment-rent-form__part--TxID');
  if (TxID.parentElement.parentElement.hasAttribute('style') && TxID.parentElement.parentElement.style.display !== 'none') {
    if (!/^[0-9a-fA-F]{64}$/.test(TxID.value)) {
      invaildError[15].style.display = 'block';
    };
  };
  const clientAgrrement1 = document.getElementById('payment-rent-form__confirm1');
  let checkFirstAgrrment1 = true;
  if (!clientAgrrement1.checked) {
    invaildError[16].style.display = 'block';
  };

  const clientAgrrement2 = document.getElementById('payment-rent-form__confirm2');
  let checkFirstAgrrment2 = true;
  if (!clientAgrrement2.checked) {
    invaildError[17].style.display = 'block';
  };
  methodParent.forEach(par => {
    par.style.height = par.scrollHeight + "px";
  });

  let checkDivNoneDisplay = (divs) => {
    let checkItem = true;
    for (let i in divs.length - 1) {
      if (divs[i].hasAttribute('style') && divs[i].style.display !== 'none') {
        checkItem = false;
        break;
      };
    };
    if (checkItem) {
      const allProductsPrice = document.getElementById('bill__product-price');
      allProductsPrice.textContent = allProductsPriceOnPage.textContent;

      const billingLoadingImg = document.querySelector('#loading > img');
      billingLoadingImg.src = 'img/check.gif';

      const paymentStatus = document.getElementById('bill-parent');
      setTimeout(() => {
        payLoading.style.display = 'none';
        paymentStatus.style.display = 'flex';
      }, 3300);


      const billDate = document.getElementById('bill__info--date');
      const allDate = new Date();
      const date = [allDate.getDay(), allDate.getMonth(), allDate.getFullYear()].join('-');
      const time = [allDate.getHours(), allDate.getMinutes(), allDate.getSeconds()].join(':');
      billDate.textContent = date + ',' + time;

      const paymentMethodName = document.getElementById('bill__info--payment-methode');
      paymentMethodName.textContent = savePayMethod;

      var total = document.getElementById('bill__total--total');
      total.textContent = allProductsPriceOnPage.textContent;

      setTimeout(() => {
        paymentStatus.style.display = 'none';
        payForm.reset();
        container.replaceWith(htmlBackup.cloneNode(true));
      }, 9000);
    };
  };

  let submitForm;
  submitForm = checkDivNoneDisplay(invaildError);
};

// Separat date
let exprationDateLength = visaCardExpration.value.length;
let valueWithOutRepalce = visaCardExpration.value;
visaCardExpration.oninput = function () {
  const inputWithFormat = this.value.length;
  let Inputvalue = this.value.replace(/\D/g, '');
  this.value = Inputvalue;

  let formatDate = '';

  if (this.value.length >= 7) {
    this.value = this.value.slice(0, this.value.length - 1);
  };

  if (inputWithFormat < exprationDateLength && valueWithOutRepalce[valueWithOutRepalce.length - 1] == '/') {
    this.value = this.value.slice(0, this.value.length - 1);
  };

  for (let i = 0; i < this.value.length; i++) {
    formatDate += this.value[i];
    if ((i == 1 || i == 3)) {
      formatDate += '/';
    };

  };
  this.value = formatDate;
  valueWithOutRepalce = this.value;
  exprationDateLength = this.value.length;
};
// Separat date

// Choose pay method

const payMethods = document.querySelectorAll('.payment-rent-form__platform');
const methodParent = document.querySelectorAll('.payment-rent-form__payment-form');

// Get method parent height
methodParent.forEach(par => {
  par.style.height = par.scrollHeight + "px";
});

payMethods.forEach(function (aMethod, index) {
  aMethod.onclick = function () {

    function showOrHiddenElement(selectElement, displayType1, displayType2) {
      const Element = document.querySelectorAll(selectElement);
      Element.forEach(function (title) {
        title.style.display = displayType1;
      });
      Element[index].style.display = displayType2;
    };

    //Hidden other title and show client choise method title 
    showOrHiddenElement('.payment-rent-form__all-title', 'none', 'flex');

    //Hidden other form and show client choise method form 
    showOrHiddenElement('.methodForm', 'none', 'flex');

    //Hidden radio button and show other method radio
    showOrHiddenElement('.payment-rent-form__platform', 'flex', 'none');

    // Close method
    methodParent.forEach((par, i) => {
      if (i === index) {
        par.style.height = par.scrollHeight + "px";
        par.style.removeProperty('padding');
      } else {
        par.style.height = "71px";
        par.style.padding = '0';
      };
    });


    // Save Method
    switch (index) {
      case 0:
        savePayMethod = 'Credit Card';
        break;

      case 1:
        savePayMethod = 'PayPal';
        break;

      case 2:
        savePayMethod = 'Bitcoin';
        break;
    };

  };
});
// Choose pay method

// Get data from session storage
if (sessionStorage.getItem('productName') !== null) {
  const productName = sessionStorage.getItem('productName');
  const productPrice = sessionStorage.getItem('priceForRent');
  const productImg = sessionStorage.getItem('productImgForRent');

  const paymentProductName = document.getElementById('about-car__name');
  paymentProductName.textContent = productName;

  allProductsPriceOnPage.textContent = productPrice;

  const paymentProductImg = document.getElementById('about-car__img');
  paymentProductImg.src = productImg;
};