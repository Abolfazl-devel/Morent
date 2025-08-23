'use strict';

import { workingKey } from "./selection.js";

const formFields = document.querySelectorAll('.rent-form__chose');
const selection = document.querySelectorAll('.rent-form__chose-menu');

function closeSelection() {
  selection.forEach(function (aSelection) {
    aSelection.removeAttribute('style');
  });
  function removeBorder(selectOptions) {
    const whichItems = document.querySelectorAll(selectOptions);
    whichItems.forEach(function (item) {
      item.removeAttribute('style');
    });
  };
  removeBorder('#pick-up-city-selction li');
  removeBorder('#drop-off-city-selction li');
};

formFields.forEach(function (field, index) {
  field.onclick = function (event) {
    event.stopPropagation();
    if (!selection[index].getAttribute('style')) {
      closeSelection();
      selection[index].style.display = 'block';
    } else {
      closeSelection();
    };
  };
});

window.addEventListener('click', function () {
  closeSelection();
});

function selectItem(selectOptions, selectSelectedItem) {
  const options = document.querySelectorAll(selectOptions);
  options.forEach(function (option) {
    option.onclick = function (event) {
      event.stopPropagation();
      const selectedItem = document.getElementById(selectSelectedItem);
      selectedItem.textContent = option.textContent;
      option.parentElement.parentElement.removeAttribute('style');
    };
  });
};
selectItem('#pick-up-city-selction li', 'pick-up-city');
selectItem('#pick-up-date-selction li', 'pick-up-date');
selectItem('#pick-up-time-selction li', 'pick-up-time');

selectItem('#drop-off-city-selction li', 'drop-off-city');
selectItem('#drop-off-date-selction li', 'drop-off-date');
selectItem('#drop-off-time-selction li', 'drop-off-time');

window.addEventListener('keydown', function (press) {
  const key = press.key.toLowerCase();
  function chooseOptions(selectSelction, selectOptions, selectSelectedItem) {
    let selectBox = document.querySelectorAll(selectSelction);
    if (selectSelectedItem == 'drop-off-city') {
      selectBox = selectBox[3];
    } else {
      selectBox = selectBox[0];
    };
    if (selectBox.getAttribute('style')) {
      const cityItem = document.querySelectorAll(selectOptions);
      const selectedItem = document.getElementById(selectSelectedItem);
      workingKey(cityItem, press.key, key, press, '2px solid rgb(53, 99, 234)', selectedItem, selectBox);
    };
  };
  chooseOptions('.rent-form__chose-menu', '#pick-up-city-selction li', 'pick-up-city');
  chooseOptions('.rent-form__chose-menu', '#drop-off-city-selction li', 'drop-off-city');
});

const chageFormPosition = document.getElementById('rent-form__send-form');
chageFormPosition.onclick = function () {
  const formTitle = document.querySelectorAll('.rent-form__title h5');
  const saveTitle1 = formTitle[0].textContent;
  const saveTitle2 = formTitle[1].textContent;
  formTitle[0].textContent = saveTitle2;
  formTitle[1].textContent = saveTitle1;
  if (this.style.transform == 'rotate(180deg)') {
    this.style.transform = 'rotate(0deg)';
  } else {
    this.style.transform = 'rotate(180deg)';
  };
};
