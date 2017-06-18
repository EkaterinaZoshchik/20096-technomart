'use strict';

window.showCatalogItems = (function () {
  var items = document.querySelectorAll('.catalog-item');
  var itemName = document.querySelectorAll('.catalog-item__desc');
  var itemOldPrice = document.querySelectorAll('.catalog-item__old-price');
  var itemPrice = document.querySelectorAll('.catalog-item__price');
  var itemPicture = document.querySelectorAll('.catalog-item__picture');
  var itemButtonBuy = document.querySelectorAll('.btn--buy');
  var pagination = document.querySelector('.pagination');
  var paginationItemTemplate = document.getElementById('pagination-item-template');

  return function (catalogItems, pageNumbers, selectedPageNumber) {
    for(var i = 0; i < items.length; i++){
      items[i].style.display = "none";
    }
    for (var i = 0; i < catalogItems.length; i++) {
      var catalogItem = catalogItems[i];

      itemName[i].textContent = catalogItem.name;
      itemName[i].href += catalogItems[i]['_id'];
      if (catalogItem.oldPrice > 0) {
        itemOldPrice[i].textContent = catalogItem.oldPrice / 100 + '  р.';
      } else {
        itemOldPrice[i].textContent = '';
      }
      itemPrice[i].textContent = catalogItem.price / 100 + '  р.';
      itemPrice[i].href += catalogItems[i]['_id'];
      itemPicture[i].setAttribute('src', IMAGES_HOST + catalogItem.imgSrc);
      itemPicture[i].setAttribute('alt', catalogItem.name);
      if (catalogItem.mark) {
        items[i].classList.add('catalog-item--new');
      } else {
        items[i].classList.remove('catalog-item--new');
      }
      itemButtonBuy[i].setAttribute('data-id', JSON.stringify({id: catalogItems[i]['_id'], price: catalogItem.price}));

      items[i].style.display = "inline-block";
    }

    //пагинация
    pagination.innerHTML = '';
    for (var i = 0; i < pageNumbers; i++) {
      var paginationItem = paginationItemTemplate.content.querySelector('.pagination__item').cloneNode(true);
      var paginationLink = paginationItem.querySelector('.pagination__link');
      paginationLink.textContent = i + 1;
      if (selectedPageNumber === i) {
        paginationLink.classList.add('pagination__link--selected')
      }
      paginationLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.setHashParam('page', parseInt(event.currentTarget.textContent)-1);
      });
      pagination.appendChild(paginationItem);
    }
  };
})();
