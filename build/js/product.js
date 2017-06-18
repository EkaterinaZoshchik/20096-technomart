'use strict';

(function () {
  var breadcrumbsLinkGroup = document.querySelector('.breadcrumbs__link--group');
  var productName = document.querySelector('.page__title--product');
  var productPicture = document.querySelector('.product__picture');
  var productDataTable = document.querySelector('.product__data-table tbody');
  var productCapacity = document.querySelector('.product__data-value--capacity');
  var productWeight = document.querySelector('.product__data-value--weight');
  var productBrand = document.querySelector('.product__data-value--brand');
  var productPowerSupply = document.querySelector('.product__data-value--power-supply');
  var productId = document.querySelector('.product__data-value--id');
  var productOldPrice = document.querySelector('.product__old-price');
  var productPrice = document.querySelector('.product__price');
  var productButtonBuy = document.querySelector('.btn--buy');
  var urlParams = window.getJsonFromUrl();
  var productDataTemplate = document.getElementById('product-data-template');
  var productDescription = document.querySelector('.about-perforators__desc');
  var typesPowerSupply = {
          'battery': 'аккумуляторное',
          'mains': 'сетевое'
        };

  var PRODUCT_DATA_URL = CATALOG_ITEMS_SERVICE_URL + '/' + urlParams['_id'];

  window.load(PRODUCT_DATA_URL, null, function (productData) {
    breadcrumbsLinkGroup.textContent = productData.group;
    productName.textContent = productData.name;
    productPicture.setAttribute('src', IMAGES_HOST + productData.imgSrc);
    productPicture.setAttribute('alt', productData.name);
    productCapacity.textContent = productData.capacity;
    productWeight.textContent = productData.weight / 1000;
    productBrand.textContent = productData.brand;
    productPowerSupply.textContent = typesPowerSupply[productData.powerSupply];
    productId.textContent = productData['_id'];
    if (isNaN(productData.oldPrice)) {
      productOldPrice.textContent = '';
    } else {
      productOldPrice.textContent = productData.oldPrice / 100 + ' р.';
    }
    productPrice.textContent = productData.price / 100 + ' р.';
    productButtonBuy.setAttribute('data-id', JSON.stringify({id: productData['_id'], price: productData.price}));

    productData.items.forEach(item => {
        var productDataItem = productDataTemplate.content.querySelector('tr').cloneNode(true);
        var productDataName = productDataItem.querySelector('.product__data-name');
        productDataName.textContent = item.name + ':';
        var productDataValue = productDataItem.querySelector('.product__data-value');
        productDataValue.textContent = item.value;
        productDataTable.appendChild(productDataItem);
    });

    productDescription.innerHTML = productData.description;

  });
})();
