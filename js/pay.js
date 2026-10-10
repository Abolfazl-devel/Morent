'use strict';
//Global vars
const allProductsPriceOnPage = document.getElementById('about-car__total-sums');
//Global vars


// Import selection check varable
import { checkSelection } from "./pick-drop-form.js";
// Import selection check varable


// Get backup of first HTML without changing
const container = document.getElementById('continer');
const htmlBackup = container.cloneNode(true);

// Product price
const payForm = document.getElementById('payment-rent-forms');

const visaCardExpration = document.getElementById('payment-rent-form__part--expration-date');

let savePayMethod = 'Credit Card';

let controlingErrorAnimation = null;
let controlingErrorTimeout = null;
let controlingErrorMainTimeout = null;

payForm.onsubmit = async function (event) {
  event.preventDefault();
  const payLoading = document.getElementById('loading');

  //Showing error when network diconnected
  const errorBox = document.getElementById('dis-error');
  function resetingErrorBox() {
    errorBox.style.display = 'none';
    errorBox.classList.remove('top-to-bottom-animation');
    errorBox.style.top = '-175px';
    errorBox.style.display = 'block';
  };

  resetingErrorBox();

  function showingError() {
    if (controlingErrorAnimation !== null) {
      cancelAnimationFrame(controlingErrorAnimation);
      controlingErrorAnimation = null;
    };

    if (controlingErrorTimeout !== null) {
      clearTimeout(controlingErrorTimeout);
      controlingErrorTimeout = null;
    };

    if (controlingErrorMainTimeout !== null) {
      clearTimeout(controlingErrorMainTimeout);
      controlingErrorMainTimeout = null;
    };

    controlingErrorMainTimeout = setTimeout(() => {
      const errorTimer = document.getElementById('dis-error__timer');
      const svgWidth = 300;



      resetingErrorBox();


      errorTimer.style.strokeDasharray = svgWidth;
      errorTimer.style.strokeDashoffset = 0;

      payLoading.style.display = 'none';

      requestAnimationFrame(() => {
        errorBox.style.display = 'block';
        requestAnimationFrame(() => {
          errorBox.style.top = '30px';
          controlingErrorTimeout = setTimeout(() => {
            errorBox.classList.add('top-to-bottom-animation');
            controlingErrorTimeout = null;
          }, 100);

        });
      });



      const closeError = document.getElementById('dis-error__close');
      closeError.onclick = () => {

        if (controlingErrorAnimation !== null) {
          cancelAnimationFrame(controlingErrorAnimation);
          controlingErrorAnimation = null;
        };

        if (controlingErrorTimeout !== null) {
          clearTimeout(controlingErrorTimeout);
          controlingErrorTimeout = null;
        };

        resetingErrorBox();
      };


      const errorDuration = 5000;
      const showError = performance.now();

      function errorAnimation(time) {
        const elapsed = time - showError;
        const progress = Math.min(elapsed / errorDuration, 1);
        errorTimer.style.strokeDashoffset = svgWidth * progress;

        if (progress < 1) {
          controlingErrorAnimation = requestAnimationFrame(errorAnimation);
        } else {
          controlingErrorAnimation = null;
          resetingErrorBox();
        };
      };

      controlingErrorAnimation = requestAnimationFrame(errorAnimation);

      controlingErrorMainTimeout = null;
    }, 1000);
  };

  payLoading.style.display = 'flex';
  if (navigator.onLine) {
    const invaildError = document.querySelectorAll('.payment-rent-form__part--error');

    for (let i = 0; i <= invaildError.length - 1; i++) {
      invaildError[i].style.display = 'none';
    };

    for (let i = 0; i < checkSelection.length; i++) {

      if (checkSelection[i] == false) {
        invaildError[i + 4].style.display = 'block';
      };
    };


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

    try {
      const addressFetch = await fetch(`https://us1.locationiq.com/v1/search.php?key=${accessToken}&q=${encodeURIComponent(streetAddress.value)}&format=json`);

      if (!addressFetch.ok) {
        throw new Error("API Error");
      };

      const addressResponse = await addressFetch.json();


      if (addressResponse && addressResponse.length > 0) {
        const displayName = addressResponse[0].display_name || '';
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
      };

      const cityFetch = await fetch(`https://us1.locationiq.com/v1/search.php?key=${accessToken}&q=${encodeURIComponent(selectedCity.value)}&format=json&limit=1`);

      if (!cityFetch.ok) {
        throw new Error("API Error");
      };

      const cityResponse = await cityFetch.json();


      if (Array.isArray(cityResponse) && cityResponse.length > 0) {
        const results = cityResponse[0];
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
    } catch (error) {
      showingError();
    }

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
        const expiryDate = new Date(year, month, day, 23, 59, 59, 999);
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
      for (let i = 0; i <= divs.length - 1; i++) {
        if (divs[i].hasAttribute('style') && divs[i].style.display !== 'none') {
          checkItem = false;
          break;
        };
      };

      const html = document.getElementsByTagName('html');
      html[0].style.overflow = 'hidden';

      if (checkItem) {
        const allProductsPrice = document.getElementById('bill__product-price');
        allProductsPrice.textContent = allProductsPriceOnPage.textContent;

        const billingLoadingImg = document.querySelector('#loading > img');
        billingLoadingImg.src = 'img/check.gif';

        const paymentStatus = document.getElementById('bill-parent');
        setTimeout(() => {
          payLoading.style.display = 'none';
          paymentStatus.style.display = 'block';
        }, 3300);


        function beautifyingDate(p, type) {
          if (p < 10) {

            switch (type) {
              case "day":
                day = "0" + day;
                break;

              case "month":
                month = "0" + month;
                break;

              case "hour":
                hour = "0" + hour;
                break;

              case "minutes":
                minutes = "0" + minutes;
                break;

              case "secound":
                secound = "0" + secound;
                break;
            };

          };
        };

        const billDate = document.getElementById('bill__info--date');
        const allDate = new Date();

        let day = allDate.getDate();
        beautifyingDate(day, "day");

        let month = allDate.getMonth() + 1;
        beautifyingDate(month, "month");


        const date = [day, month, allDate.getFullYear()].join('-');

        let hour = allDate.getHours();
        beautifyingDate(hour, "hour");

        let minutes = allDate.getMinutes();
        beautifyingDate(minutes, "minutes");

        let secound = allDate.getSeconds();
        beautifyingDate(secound, "secound");

        const time = [hour, minutes, secound].join(':');
        billDate.textContent = date + ',' + time;

        const paymentMethodName = document.getElementById('bill__info--payment-methode');
        paymentMethodName.textContent = savePayMethod;

        var total = document.getElementById('bill__total--total');
        total.textContent = allProductsPriceOnPage.textContent;
        payForm.reset();
      } else {
        payLoading.style.display = 'none';
        html[0].removeAttribute('style');
      };
    };

    let submitForm;
    submitForm = checkDivNoneDisplay(invaildError);
  } else {
    showingError();
  };

};

//Close bill
const closeBill = document.getElementById('bill__close');
closeBill.onclick = function () {
  location.reload();
  window.scrollTo(0, 0);
}

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

// Fake dicounting with JS
const discountButton = document.getElementById('discountButton');
const discountInput = document.getElementById('discountIn');
const discountCodeResult = document.getElementById('discountRes');
discountButton.onclick = function () {

  if (discountInput.value.trim().toUpperCase() == "MORENT") {
    allProductsPriceOnPage.textContent = allProductsPriceOnPage.textContent.replace('$', '');
    allProductsPriceOnPage.textContent = allProductsPriceOnPage.textContent.replace('.', '');
    allProductsPriceOnPage.textContent = allProductsPriceOnPage.textContent.slice(0, -3);
    allProductsPriceOnPage.textContent = Number(allProductsPriceOnPage.textContent) / 2;
    allProductsPriceOnPage.textContent = `$${allProductsPriceOnPage.textContent}.00`;
    discountCodeResult.textContent = 'The discounting code applied';
    discountCodeResult.style.opacity = '1';
  } else {
    discountCodeResult.textContent = 'The code expired or does not exsist';
    discountCodeResult.style.opacity = '1';
  }
};