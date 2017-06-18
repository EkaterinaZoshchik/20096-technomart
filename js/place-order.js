'use strict';

(function () {
  var form = document.querySelector('.form');
  var lastName = document.getElementById('place-order__last-name');
  var firstName = document.getElementById('place-order__first-name');
  var middleName = document.getElementById('place-order__middle-name');
  var email = document.getElementById('place-order__email');
  var tel = document.getElementById('place-order__tel');
  var address = document.getElementById('place-order__address');
  var popupPlaceOrder = document.querySelector('.modal--place-order');
  var modalOverlay = document.querySelector(".modal-overlay");
  var localStorageUserData = JSON.parse(localStorage.getItem('userData'));

  if(localStorageUserData){
      lastName.value = localStorageUserData.lastName;
      firstName.value = localStorageUserData.firstName;
      middleName.value = localStorageUserData.middleName;

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var orderItems = JSON.parse(localStorage.getItem('cart'));
        if(!Array.isArray(orderItems) || orderItems.length===0){
            alert('Добавьте товары в корзину');
            return;
        }
        var orderParams = {
          orderItems: orderItems,
          lastName: lastName.value,
          firstName: firstName.value,
          middleName: middleName.value,
          tel: tel.value,
          address: address.value
        }

        if (firstName.value && lastName.value && middleName.value && tel.value && address.value) {
          window.postLoad(ORDERS_SERVICE_URL, orderParams, function () {
            localStorage.removeItem('cart');
            popupPlaceOrder.classList.add('show');
            modalOverlay.classList.add("modal-overlay--show");
          });
        }
      });
  } else {
      popupLogin.classList.add('show');
      modalOverlay.classList.add('modal-overlay--show');
      loginSubmitCallback = function () {
        window.location.reload();
      }
  }

  
})();
