'use strict';

(function () {
  var productButtonBuy = document.querySelectorAll('.btn--buy');

  for (var i = 0; i < productButtonBuy.length; i++) {
    productButtonBuy[i].addEventListener('click', function (event) {
      var data = JSON.parse(event.currentTarget.getAttribute("data-id"));
      var items = [];

      if (localStorage.hasOwnProperty("cart")) {
        items = JSON.parse(localStorage.getItem("cart"));
      }

      var foundItem = items.find(item => item.productId === data.id);

      if (foundItem) {
        foundItem.quantity +=1;
      } else {
        items.push({productId: data.id, quantity: 1});
      }

      localStorage.setItem("cart", JSON.stringify(items));

      //после добавления товара в корзину меняем значение итоговой суммы корзины в хэдере
      var totalSumCart = JSON.parse(localStorage.getItem("totalSumCart"));
      totalSumCart += data.price / 100;
      localStorage.setItem("totalSumCart", totalSumCart);
      window.addSumToHeaderCart();
    });
  }
})();
