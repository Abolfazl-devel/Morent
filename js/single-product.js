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

// Show all comments
const showMoreCommentsButton = document.getElementById('comments__button');
showMoreCommentsButton.onclick = function () {

  const commentsNumber = document.getElementById('comments__title--number');
  const butArrow = document.getElementById('comments__button--img');


  const butTxt = document.getElementById('comments__button--txt');

  if (butTxt.textContent.trim().toLowerCase() == 'show all') {
    function createComment(html) {
      const commentsParent = document.getElementById('comments');
      const commentParent = document.createElement('div');
      commentParent.classList.add('comments__person');
      commentParent.innerHTML = html;
      commentsParent.insertBefore(commentParent, showMoreCommentsButton.parentElement);
    };

    for (let i = 0; i < Number(commentsNumber.textContent.trim()) / 2 - 1; i++) {
      createComment(`<div class="comments__user-score">

  <div class="comments__user">

    <div class="comments__user--pic">

      <img src="img/user.svg">

    </div>

    <div class="comments__user--name-from">

      <h5> Alex Stanton </h5>

      <p> CEO at Bukalapak </p>

    </div>

  </div>

  <div class="comments__score">

    <div class="comments__score--date">

      <p> 7 January 2024 </p>

    </div>

    <div class="comments__score--star">

      <img src="img/star.png">

      <img src="img/star.png">

      <img src="img/star.png">

      <img src="img/star.png">

      <img src="img/star1.png">

    </div>

  </div>

</div>

<div class="comments__text">

  <p> We are very happy with the service from the MORENT App.MORENT has a low price and aslo a large

    variety

    of cars with good and comfortable facilities. In addition, the service provided by the officers is

    aslo

    very friendly and very polite </p>

</div>`);
      createComment(`<div class="comments__user-score">

  <div class="comments__user">

    <div class="comments__user--pic">

      <img src="img/user3.svg">

    </div>

    <div class="comments__user--name-from">

      <h5> Skylar Dias </h5>

      <p> CEO at Amazon </p>

    </div>

  </div>

  <div class="comments__score">

    <div class="comments__score--date">

      <p> 7 January 2024 </p>

    </div>

    <div class="comments__score--star">

      <img src="img/star.png">

      <img src="img/star.png">

      <img src="img/star.png">

      <img src="img/star.png">

      <img src="img/star1.png">

    </div>

  </div>

</div>

<div class="comments__text">

  <p> We are greatly helped by services of the MORENT Application.Morent has low prices and also a wide

    variety of cars with good and comfortable facilities.In addition, the service provided by the officers

    isaslo very friendly and very polite</p>

</div>`);

    };

    butTxt.textContent = 'show less';

    butArrow.style.transform = 'rotate(180deg)';
    const comments = document.querySelectorAll('.comments__person');

    comments[comments.length - 1].remove();

  } else {
    const comments = document.querySelectorAll('.comments__person');
    for (let i = Number(commentsNumber.textContent.trim()) - 1; i > 1; i--) {
      comments[i].remove();
    };
    butTxt.textContent = 'show all';

    butArrow.removeAttribute('style');
  };
};
// Show all comments