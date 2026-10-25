'use strike';
//Sider bar

//Activing items in sidebar

//Desktop siderbar
const desktopSiderbarItems = document.querySelectorAll('.menu__item');
const desktopSiderbarItemsText = document.querySelectorAll('.menu__item span');
const desktopSiderbarItemsImages = document.querySelectorAll('.menu__item img:nth-child(2)');

//Mobile siderbar
const mobileSidebar = document.getElementById('mobile-sidebar');
const mobileSidebarItems = document.querySelectorAll('.mobile-menu__item');
const mobileSidebarItemsText = document.querySelectorAll('.mobile-menu__item span');
const mobileSidebarItemsImages = document.querySelectorAll('.mobile-menu__item img:nth-child(2)');
const mobileSidebarOpenButton = document.getElementById('mobile-sidebar-open');
const mobileSidebarCloseButton = document.getElementById('mobile-sidebar-close');


//Opening and closing mobile sidebar
mobileSidebarOpenButton.onclick = function () {
  if (mobileSidebar.style.left == '-300px') {
    mobileSidebar.style.left = 0;
  } else {
    mobileSidebar.style.left = '-300px';
  };
};

mobileSidebarCloseButton.onclick = function () {
  mobileSidebar.style.left = '-300px';
};


function activingSidebarItems(items1, items2, image1, image2, text1, text2) {

  function inactivingSidebarItems(wItems, text, image) {
    wItems.forEach(function (items, i) {
      items.removeAttribute('style');
      text[i].removeAttribute('style');
      image[i].removeAttribute('style');

    });
  };

  function changingColorAndPic(wItems, text, image, index) {
    wItems.style.backgroundColor = 'var(--tj-theme-primery-1)';
    text[index].style.color = 'var(--tj-white)';
    image[index].style.opacity = '1';
  };

  items1.forEach(function (item, x) {
    item.onclick = function () {
      inactivingSidebarItems(items1, text1, image1);
      inactivingSidebarItems(items2, text2, image2);

      changingColorAndPic(item, text1, image1, x);
      changingColorAndPic(items2[x], text2, image2, x);

    };
  });
};
activingSidebarItems(desktopSiderbarItems, mobileSidebarItems, desktopSiderbarItemsImages, mobileSidebarItemsImages, desktopSiderbarItemsText, mobileSidebarItemsText);
activingSidebarItems(mobileSidebarItems, desktopSiderbarItems, mobileSidebarItemsImages, desktopSiderbarItemsImages, mobileSidebarItemsText, desktopSiderbarItemsText);
//Activing items in sidebar

// Dark mode
const darkModeButton = document.querySelectorAll('.dark');
const htmlBody = document.getElementsByTagName('body');
darkModeButton.forEach(function (but) {
  but.onclick = function () {
    if (htmlBody[0].classList.contains('dark-mode')) {
      htmlBody[0].classList.remove('dark-mode');
      darkModeButton[0].classList.remove('dark-active');
      darkModeButton[1].classList.remove('dark-active');
    } else {
      htmlBody[0].classList.add('dark-mode');
      darkModeButton[0].classList.add('dark-active');
      darkModeButton[1].classList.add('dark-active');
    };
  };
});
// Dark mode
