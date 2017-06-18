'use strict';

var localStorageCartData = JSON.parse(localStorage.getItem("cart"));

if (localStorageCartData) {
  var cart = document.querySelector('.cart__item-wrapper');
  var cartDataTemplate = document.getElementById('cart-data-template');
  var cartProducts = {};
  var localStorageIds = [];

  localStorageCartData.forEach(function (item) {
    localStorageIds.push(item.productId);
  })

  var params = {'_id[$in]': localStorageIds, $limit: 50};

  window.load (CATALOG_ITEMS_SERVICE_URL, params, function (cartProducts) {
    var cartProductsData = cartProducts.data;
    var cartProductTotalSum = document.querySelector('.cart__total-sum');
    var totalPricesArray = [];

    var calculateTotalSum = function () {
      var totalSum = totalPricesArray.reduce((sum, currentItem) => sum + currentItem, 0);
      cartProductTotalSum.textContent = totalSum + ' р.';
      localStorage.setItem("totalSumCart", totalSum);
    };

    var onCartProductQuantityChange = function(cartItemIndex, id, price, cartProductTotalPrice) {
      return function(event) {
        var cartProductQuantitySelect = event.currentTarget;
        var cartProductQuantity = cartProductQuantitySelect.options[cartProductQuantitySelect.selectedIndex].value;
        cartProducts = JSON.parse(localStorage.getItem("cart"));
        var foundProduct = cartProducts.find(item => item.productId === id);
        foundProduct.quantity = parseInt(cartProductQuantity);
        localStorage.setItem("cart", JSON.stringify(cartProducts));
        cartProductTotalPrice.textContent = cartProductQuantity * price / 100;
        totalPricesArray[cartItemIndex] = cartProductQuantity * price / 100;

        calculateTotalSum();
        window.addSumToHeaderCart();
      }
    };

    for (var i = 0; i < cartProductsData.length; i++) {
      var cartItem = cartDataTemplate.content.querySelector('.cart__item').cloneNode(true);
      var cartProductPicture = cartItem.querySelector('.cart__product-picture');
      var cartProductName = cartItem.querySelector('.cart__product-name');
      var cartProductId = cartItem.querySelector('.cart__product-id');
      var cartProductQuantitySelect = cartItem.querySelector('.cart__quantity-select');
      cartProductQuantitySelect.selectedIndex = localStorageCartData[i].quantity - 1;
      var cartProductQuantity = cartProductQuantitySelect.options[cartProductQuantitySelect.selectedIndex].value;
      var cartProductPrice = cartItem.querySelector('.cart__price');
      var cartProductTotalPrice = cartItem.querySelector('.cart__total-price');

      cartProductPicture.setAttribute('src', IMAGES_HOST + cartProductsData[i].imgSrc);
      cartProductPicture.setAttribute('alt', cartProductsData[i].name);
      cartProductName.textContent = cartProductsData[i].name;
      cartProductName.href = 'product.html?_id=' + cartProductsData[i]._id;
      cartProductId.textContent = cartProductsData[i]._id;
      cartProductPrice.textContent = cartProductsData[i].price / 100;
      cartProductTotalPrice.textContent = cartProductQuantity * cartProductsData[i].price / 100;
      totalPricesArray.push(cartProductQuantity * cartProductsData[i].price / 100);

      cart.appendChild(cartItem);
      cartProductQuantitySelect.addEventListener('change',
        onCartProductQuantityChange(i, cartProductsData[i]._id, cartProductsData[i].price, cartProductTotalPrice));
    }

    calculateTotalSum();
    window.addSumToHeaderCart();
  });
} else if (document.querySelector('.cart')) {
  document.querySelector('.page__title--cart').textContent = 'Ваша корзина, к сожалению, пуста';
  document.querySelector('.cart__header-product').remove();
  document.querySelector('.cart__header-quantity').remove();
  document.querySelector('.cart__header-price').remove();
  document.querySelector('.cart__header-sum').remove();
  document.querySelector('.cart__header-delete').remove();
  document.querySelector('.cart__total-sum-label').remove();
  document.querySelector('.cart__btn').remove();
}
