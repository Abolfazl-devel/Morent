'use strict';
import { changeCheckVarable } from "./pick-drop-form.js";

var isSelect = '';

function changeBorder(item, index, borderType) {
  isSelect = item[index];
  item[index].style.transition = 'none';
  item[index].style.border = borderType;
  setTimeout(() => {
    item[index].style.transition = 'all ease 0.3s';
  }, 100);
  item[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

function arrowKeys(option, key, but, borderType) {
  var optionArray = Array.from(option);
  var activeItem = optionArray.findIndex(item =>
    item.style.border === borderType
  );
  if (key == 'ArrowDown') {
    but.preventDefault();
    if (activeItem !== -1) {
      option[activeItem].style.removeProperty('border');
      var nextSelect = (activeItem + 1) % option.length;
      saveLastSelection = nextSelect;
      changeBorder(option, nextSelect, borderType);
    } else {
      changeBorder(option, 0, borderType);
    };
  } else if (key == 'ArrowUp') {
    but.preventDefault();
    if (activeItem !== -1) {
      option[activeItem].style.removeProperty('border');
      var nextSelect = (activeItem - 1 + option.length) % option.length;
      changeBorder(option, nextSelect, borderType);
      saveLastSelection = nextSelect;
    } else {
      changeBorder(option, option.length - 1, borderType);
    };
  };
};

function workingKey(whichItems, key, lowerKey, but, borderType, selectedItem, selectBox, isPick) {
  var checkAlphabets = /^[a-z]$/i;
  if (checkAlphabets.test(key)) {
    selectItem(whichItems, lowerKey, borderType);
  };
  arrowKeys(whichItems, key, but, borderType);

  if (key == 'Enter' && isSelect !== '') {
    if (isPick) {
      changeCheckVarable(0, true);
    } else {
      changeCheckVarable(3, true);
    };
    selectedItem.textContent = isSelect.textContent;
    selectBox.removeAttribute('style');
    whichItems.forEach(function (item) {
      item.removeAttribute('style');
    });
  };
};

var saveLastSelection = -1;

function selectItem(option, key, borderType) {
  Array.from(option).forEach(function (item) {
    item.style.removeProperty('border');
  });
  var matchedItem = Array.from(option).filter(item =>
    item.textContent.trim().toLowerCase().startsWith(key)
  );

  if (matchedItem.length == 0) {
    return;
  };

  var nextSelect;
  if (saveLastSelection >= 0 && saveLastSelection < matchedItem.length) {
    nextSelect = (saveLastSelection + 1) % matchedItem.length;
  } else {
    nextSelect = 0;
  }

  saveLastSelection = nextSelect;
  changeBorder(matchedItem, nextSelect, borderType);
};

export { workingKey };