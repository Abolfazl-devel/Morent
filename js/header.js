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
  wishlist.style.display = 'none';
  notificattion.style.transform = 'scale(0)';
  allTxtParent.style.transform = 'scale(0)';
  setting.style.display = 'none';
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
  sessionStorage.clear();
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
    postMessage({ type: 'SEND_DATA', data: 'setfilter' }, 'http://localhost');
  };
});

const capacityFilter = document.querySelectorAll('.search__filters > div:nth-child(2) > div > span');
capacityFilter.forEach(function (type) {
  type.onclick = function () {
    searchFilter(type, 'carCapacity', '.notover-products-box__product--info div:nth-child(3) span');
    postMessage({ type: 'SEND_DATA', data: 'setfilter' }, 'http://localhost');
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
      postMessage({ type: 'SEND_DATA', data: 'setfilter' }, 'http://localhost');
    } else if (searchFilterBox[1].style.display == 'block') {
      sendInputs('mobile-search__filters--min', 'mobile-search__filters--max');
      postMessage({ type: 'SEND_DATA', data: 'setfilter' }, 'http://localhost');
    };
  };
});

window.addEventListener('resize', function () {
  let deviceSize = window.innerWidth;
  searchFilterBox.forEach(function (box) {
    if (box.style.display == 'block') {
      function responsiveMode(displayType1, displayType2) {
        searchFilterBox[1].style.display = displayType1;
        searchFilterBox[0].style.display = displayType2;
        return;
      };
      if (deviceSize > 973) {
        responsiveMode('none', 'block');
      } else {
        responsiveMode('block', 'none');
      };
    };
  });
});
// Search filter

// Wishlist
const wishlistButton = document.getElementById('icon-menu__wishlist');
const wishlist = document.getElementById('header__icon-menu--wishlist');
wishlistButton.onclick = function (event) {
  event.stopPropagation();
  if (wishlist.style.display == 'none') {
    closeHeaderPops(searchFilterBox[0]);
    closeHeaderPops(searchFilterBox[1]);
    wishlist.style.display = 'block';
    backdrop.style.display = 'block';
  }
  else {
    closeHeaderPops(searchFilterBox[0]);
    closeHeaderPops(searchFilterBox[1]);
  };
};

wishlist.onclick = function (event) {
  event.stopPropagation();
};

function checkLocalstorageNotEmpty() {
  let checkDivNoneDisplay = (divs) => {
    let checkItem = true;
    for (let i in divs) {
      if (divs[i].style.display !== 'none') {
        checkItem = false;
        break;
      };
    };
    if (checkItem) {
      document.querySelector('.header__icon-menu--wishlist > div:nth-child(2)').style.display = 'none';
      document.querySelector('.header__icon-menu--wishlist > div:nth-child(3)').style.display = 'none';
      document.querySelector('.header__icon-menu--wishlist > button').style.display = 'none';
      document.getElementById('wishlistEmpty').style.display = 'flex';
    };
  };
  const wishlistItems = document.querySelectorAll('.header__icon-menu--wishlist > div > div');
  let showWishlistNumber = document.getElementById('icon-menu--wishlist__write-num');
  showWishlistNumber.textContent = 0;
  let numberShowWishlistNumber = Number(showWishlistNumber.textContent);
  wishlistItems.forEach(function (item) {
    if (item.style.display !== 'none') {
      numberShowWishlistNumber += 1;
      showWishlistNumber.textContent = numberShowWishlistNumber + ' ' + 'items in wishlist';
    };

  });
  if (showWishlistNumber.textContent == 0) {
    showWishlistNumber.style.display = 'none';
  };


  let wishlistItem = Array.from(document.querySelectorAll('.header__icon-menu--wishlist > div > div'));;
  wishlistItem = checkDivNoneDisplay(wishlistItem);
};

window.addEventListener('load', function () {

  if (localStorage.getItem('wishlist') !== null) {
    var getWishlist = localStorage.getItem('wishlist');
    wishlist.innerHTML = getWishlist;
  };


  checkLocalstorageNotEmpty();

  const deleteWishlistItemBut = document.querySelectorAll('.header__icon-menu--wishlist>div>div>img:first-child');
  deleteWishlistItemBut.forEach(function (but) {
    but.onclick = function () {
      but.parentElement.style.transform = 'translateX(-397px)';
      setTimeout(() => {
        but.parentElement.style.display = 'none';
        localStorage.setItem('wishlist', wishlist.innerHTML);
        postMessage('wishListChanged', 'http://localhost');
        checkLocalstorageNotEmpty();
      }, 400);
    };
  });
});

const closeWishlist = document.getElementById('icon-menu--wishlist__close');
closeWishlist.onclick = function () {
  closeHeaderPops(searchFilterBox[0]);
  closeHeaderPops(searchFilterBox[1]);
};
// Wishlist

// Notfications
const notificattionBut = document.getElementById('icon-menu__notifs--but');
const notificattion = document.getElementById('icon-menu__notifs');
notificattionBut.onclick = function (event) {
  event.stopPropagation();
  if (notificattion.style.transform == 'scale(0)') {
    closeHeaderPops(searchFilterBox[0]);
    closeHeaderPops(searchFilterBox[1]);
    notificattion.style.transform = 'scale(1)';
    backdrop.style.display = 'block';
  } else {
    closeHeaderPops(searchFilterBox[0]);
    closeHeaderPops(searchFilterBox[1]);
  };
};

notificattion.onclick = function (event) {
  event.stopPropagation();
};

const closeNotfication = document.getElementById('icon-menu__notifs--close');
closeNotfication.onclick = function () {
  closeHeaderPops(searchFilterBox[0]);
  closeHeaderPops(searchFilterBox[1]);
};

const notficationTitle = document.getElementById('icon-menu__notifs--title');
const summary = document.getElementById('icon-menu__notifs--txt');
notficationTitle.onclick = function () {
  summary.style.display = 'block';
};

const closeP = document.getElementById('p__close');
const allTxtParent = document.getElementById('p-Parent');
closeP.onclick = function () {
  allTxtParent.style.transform = 'scale(0)';
};

const readMoreNotfication = document.getElementById('notifs--txt__read-more');
readMoreNotfication.onclick = function () {
  closeHeaderPops(searchFilterBox[0]);
  closeHeaderPops(searchFilterBox[1]);
  allTxtParent.style.transform = 'scale(1)';
  backdrop.style.display = 'block';
  summary.style.display = 'none';
};
// Notfications

// Setting
const settingButton = document.getElementById('icon-menu__setting-button');
const setting = document.getElementById('icon-menu__setting')
settingButton.onclick = function (event) {
  event.stopPropagation();
  if (setting.style.display == 'none') {
    closeHeaderPops(searchFilterBox[0]);
    closeHeaderPops(searchFilterBox[1]);
    setting.style.display = 'block';
    backdrop.style.display = 'block';
  } else {
    closeHeaderPops(searchFilterBox[0]);
    closeHeaderPops(searchFilterBox[1]);
  };
};

setting.onclick = function (event) {
  event.stopPropagation();
};

const closeSetting = document.querySelectorAll('.close-setting');
closeSetting.forEach(function (close) {
  close.onclick = function (event) {
    event.stopPropagation();
    event.preventDefault();
    closeHeaderPops(searchFilterBox[0]);
    closeHeaderPops(searchFilterBox[1]);
  };
});

setting.onclick = function () {
  closeHeaderPops(searchFilterBox[0]);
  closeHeaderPops(searchFilterBox[1]);
};

const selectCrditeCard = document.querySelectorAll('.icon-menu__payment-info div button');
selectCrditeCard.forEach(function (but, index) {
  but.onclick = function (event) {
    event.stopPropagation();
    event.preventDefault();
    const bankAccountForm = document.getElementById('bankAccount');
    const creditCardForm = document.getElementById('cardInfo');
    const images = document.querySelectorAll('.icon-menu__payment-info div button img');
    if (index == 1) {
      bankAccountForm.style.display = 'block';
      creditCardForm.style.display = 'none';
    } else {
      bankAccountForm.style.display = 'none';
      creditCardForm.style.display = 'block';
    };
    selectCrditeCard.forEach(function (disabledBut, index2) {
      disabledBut.disabled = false;
      disabledBut.removeAttribute('style');
      images[index2].removeAttribute('style');
    });
    but.disabled = true;
    but.style.background = '#3563EA';
    but.style.color = '#fff';
    but.style.border = 'none';
    images[index].style.filter = 'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(353deg) brightness(106%) contrast(101%)';
  };
});
// Setting