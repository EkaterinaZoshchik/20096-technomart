'use strict';

(window.addSumToHeaderCart = function () {
  var headerCartElement = document.querySelector('.page-header__user-link--cart');
  var localStorageCartData = JSON.parse(localStorage.getItem("cart"));

  if (localStorageCartData) {
    var totalSumCart = JSON.parse(localStorage.getItem("totalSumCart"));
    headerCartElement.textContent = 'Корзина: ' + totalSumCart + ' р.';
  } else {
    localStorage.removeItem("totalSumCart");
    headerCartElement.textContent = 'Корзина: 0 р.'
  }
})();
