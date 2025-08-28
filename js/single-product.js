'use strict';

// Products img
const productImagesParent = document.querySelectorAll('.preview__product-details--hover');
productImagesParent.forEach(function (image, index) {
  image.onclick = function () {

    function deleteStyle(div) {
      div.forEach(function (parent) {
        parent.style.removeProperty('border');
        parent.style.removeProperty('transform');
      });
    };

    const mainImg = document.getElementById('preview__baner');

    const firstParentOfProductImages = document.querySelectorAll('.preview__product-details>div');

    const productImages = document.querySelectorAll('.preview__product-details div img');

    const imagesParent = document.querySelectorAll('.preview__product-details div > div:first-child');


    deleteStyle(firstParentOfProductImages);
    firstParentOfProductImages[index].style.border = `2px solid #3563EA`;

    deleteStyle(imagesParent);
    imagesParent[index].style.transform = 'scale(85%)';


    if (index == 0) {
      mainImg.innerHTML = `

                <div class="preview__baner--text">

                  <h6> Sports car with the best design and acceleration </h6>

                  <p> Safety and comfort while driving a futuristic and elegant sports car </p>

                </div>

                <div class="preview__baner--img">

                  <img src="img/car2.png">

                </div>

              `;

      mainImg.style.backgroundColor = '#3563EA';
      mainImg.style.backgroundImage = 'url(./img/Arrow-right.png)';

    } else {
      mainImg.innerHTML = `                <div class="preview__baner--img">

                  <img src="${productImages[index].src}" style="width:100%; height:100%; padding:0;">

                </div>`;

      mainImg.removeAttribute('style');
    };
  };
});
// Products img